define(["ajax","lodash","utils","js/global.js"],
    function(ajax,_,utils) {


        function changeModel(model){
            var list=_.map(model,function(val){
                return {
                    id:val.pu_bill.pu_billid,//发货单号
                    content:val.pu_bill.pu_account,//发货单内容
                    money:val.pu_bill.pu_mny,//无税金额
                    tax:val.pu_bill.pu_tax,//税
                    total:val.pu_bill.pu_taxmny,//价格
                }
            });
            if(model.length){
                return {
                    order:model[0].owner_id,//订单号
                    children:list,
                    model:model   
                }
            }else{
                return{
                    order:"no_id"
                }
            }
        }

         /**
         * 
         *comboTicket :: gettickket.data.children 
         *增加 总额,数字大写,内容
         *
         */
        function addExData(data){
           return _.map(data,function(order){
                var details=order.details,mny=0,tax=0,taxmny=0;

                // for(var i=0;i<details.length;i++){
                //     var val=details
                // }
                _.each(details,function(val){
                    mny+=val.mny;
                    tax+=val.tax;
                    taxmny+=val.taxmny;
                    val.ct=_.map(val.deliveries,_.property('ware.title'))
                 
                });

                order.mny=mny;
                order.taxmny=taxmny;
                order.tax=tax;
                order.mnyCh=utils.changeMoneyToChinese(mny);
                order.taxmnyCh=utils.changeMoneyToChinese(taxmny);
                order.taxCh=utils.changeMoneyToChinese(tax);

                return order;
            })

            
        }
        function toArray(data){
            return [data];
        }
        /**
         * 保存与获取数据一致性...
         */
        return {
             "getByOrder":_.flow(ajax.restget.bind(window,$apiRootUrl + "invoiceapply/add/:ids/true?token=" + $token ),ajax.then([addExData])),
             "getByCombo":_.flow(ajax.restget.bind(window,$apiRootUrl + "invoiceapply/add/:ids/false?token=" + $token ),ajax.then([addExData])),
             "getAddress":ajax.restget.bind(window,$apiRootUrl + "supplierAddress/getSupplierAddress/:id"),
             "save":ajax._post.bind(window,$apiRootUrl + "invoiceapply/save"),
             "query":ajax.options.bind(window,$apiRootUrl + "invoiceapply/query?token=" + $token+'&pageNo=:pageNo&pageSize=:pageSize'),
             "update":ajax._post.bind(window,$apiRootUrl + "invoiceapply/update?token=" + $token),
             "publish":ajax._post.bind(window,$apiRootUrl + "invoiceapply/publish"),
             "delete":ajax.restget.bind(window,$apiRootUrl + "invoiceapply/delete/:id"),
             //收票
             "getPuinvoice":ajax._post.bind(window,$apiRootUrl + "puinvoice/query?token=" + $token),
             "getPuinvoiceById":_.flow(ajax._restget.bind(window,$apiRootUrl + "invoiceapply/edit/:id?token=" + $token),ajax.then([toArray,addExData])),
             "getPuinvoiceById2":_.flow(ajax._restget.bind(window,$apiRootUrl + "puinvoice/edit/:id?token=" + $token)),

        };
  });

