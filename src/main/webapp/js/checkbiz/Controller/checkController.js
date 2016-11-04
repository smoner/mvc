define(["ajax","lodash","utils","js/global.js"],
    function(ajax,_,utils) {
        /**
         * 增加总额,增加大小,修正时间
         */
        function addExeData(data){

          _.each(data.results,function(val){
              //获取总额
              val.supplier.total=_.reduce(_.map(val.bills,_.property('pu_bill.pu_taxmny')),_.add);

             
              _.map(val.bills,function(v){
                 //修改时间格式
                v.checkdate=new Date(v.checkdate).getFomatDateTime('yyyy-mm-dd hh:MM:ss')
                //增加选中标记
                v.checked=false;
              })


          })

          return data;
        }
     
        return {
            //查询开票订单
            "check_queryForInv" :_.flow(ajax.options.bind(window,$apiRootUrl + 'check/queryForInv?token=' + $token +'&pageNo=:pageNo&pageSize=:pageSize'),ajax.then([addExeData])), 
            

        };
  });

