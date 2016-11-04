define(["ajax","lodash","utils","js/global.js"],
    function(ajax,_,utils) {

        /**
         * 
         *comboTicket :: gettickket.data 
         * 区分订单
         */
        function ByOrder(model){
                var data=model.data;
                
                return _.map(data,function(tick){
                    var allprice=0,alltax=0;
                    var rsChildren= _.map(tick.children,function(val){
                        allprice+=val.price;
                        alltax+=val.tax;
                        var rs= addExData(val)
                        rs.id=tick.id;
                        return rs;
                    });
                    tick.price=allprice,tick.tax=alltax,tick.num=tick.children.length;
                    var rs=addExData(tick);
                    rs.children=rsChildren;
                    return rs;
                });
        }

        /**
         * 合并订单
         * ByCombo :: ByOrder
         */
        function ByCombo(data){
                var num=0,tax=0,price=0,rsChildren=[],id=data[0].id;
                _.each(data,function(val){
                    num+=val.num;
                    tax+=val.tax;
                    price+=val.price;
                    rsChildren.push(val.children);
                });
                var rs={
                      id:id,
                        num:num,
                        price:price, 
                        tax:tax,
                      children:_.concat.apply(window,rsChildren)
                }  
                
                return [addExData(rs)]
        }
         /**
         * 
         *comboTicket :: gettickket.data.children 
         *增加 总额,数字大写
         */
        function addExData(data){
            var rs=_.clone(data)
            rs.total=rs.price+rs.tax;
            rs.priceCh=utils.changeMoneyToChinese(rs.price);
            rs.taxCh=utils.changeMoneyToChinese(rs.tax);
            rs.totalCh=utils.changeMoneyToChinese(rs.total);
            return rs;
        }
        /**
         * create:创建发票信息
         * save:保存信息,但不创建
         * get:获取发票信息
         */
        return {
            "create" : ajax.post.bind(window,"/api/createticket"),
             "save" : ajax.post.bind(window,"http://123.103.9.32:8080/yuncai-mall-srv-api/api/demand_ware_category"),
             "getByOrder":_.flow(ajax.get.bind(window,"/api/getticket"),ajax.then(ByOrder)),
             "getByCombo":_.flow(ajax.get.bind(window,"/api/getticket"),ajax.then([ByOrder,ByCombo])),
        };
  });

