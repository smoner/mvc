define(["jquery","text!js/widgets/refer/purchaseselect.tpl.html","common"],
	function ($,
			template,
			Common) {
	var init = function(refer){
  		//供应商模型
		var viewModel = {
			purchaseDataTable: new $.DataTable({
		            params: {
		                "cls": "com.yonyou.cpu.domain.entity.enterprise.EnterprisePOJO"
		            },
		            meta: {
		                'id':{},
	            		'name':{},
	            		'code': {},
	                	'trade': {},
	                	'registMoney':{}
		            },
		            pageSize: 10
				}),

			/*页面切换*/
			pageChange: function (pageIndex) {
            	viewModel.purchaseDataTable.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("purchaseDataTable").addParameter('pageIndex', pageIndex).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.SupplyController",
		            method: 'findPurchaseBySupplyId',
                    success: function (data) {
                    	viewModel.purchaseDataTable.trigger($.DataTable.ON_LOAD,data);
                    }
                })
			},

			sizeChange:function(pageSize){
				viewModel.purchaseDataTable.pageSize(pageSize);
				app.serverEvent().addDataTable("purchaseDataTable").fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.SupplyController",
		            method: 'findPurchaseBySupplyId',
                    success: function (data) {
                    	viewModel.purchaseDataTable.trigger($.DataTable.ON_LOAD,data);
                    }
                })
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return viewModel.purchaseDataTable.getSelectedDatas();
		});
		$("#purchaseModal").undelegate().delegate("table tr","click",function(){
			refer.submit();
		});
		var app = $.createApp();
		app.init(viewModel, $('#purchaseModal')[0]);
		app.serverEvent()
		.addDataTable('purchaseDataTable')
		.fire({
			url: window.ctx.portal+"/evt/dispatch",
	        ctrl:"portal.SupplyController",
	        method:"findPurchaseBySupplyId",
			success: function(data) {
			}
		})
			
	}
    return {
        template: template,
        init: init
    }
})

