define(["ajax","lodash","utils","js/global.js"],
    function(ajax,_,utils) {


        /**
         * ticketContent:发表内容选项
         */
        return {
            "ticketContent" :_.flow(ajax.get.bind(window,$apiRootUrl + "invoicecontent/queryAll")),
            "invoice_type" : _.flow(ajax.get.bind(window,$apiRootUrl+"invoiceinfo/getAllInvoiceType"))
        };
  });

