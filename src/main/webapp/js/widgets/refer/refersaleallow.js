/**
 *
 * @description 租户参照页
 * @author wangbok
 * @date 2016-04-14
 * 
 */

define(["jquery","knockout","baseview","text!js/widgets/refer/refersaleallow.tpl.html","common"],function(
	$,ko,
	BaseView,
	template,
	Common
	){
		var init = function(refer){
		var customerId = (refer.params&&refer.params.customerId)?refer.params.customerId:"";
  		//企业实体
		var viewmodel = {
			goodsName:ko.observable(''),
			deliveryOrderDataTable: new $.DataTable({
	            params: {
	                "cls": "com.yonyou.yuncai.cpu.baseservice.domain.allowsale.SupplyCategory"
	            },
	            meta: {
	                'id': {},
	                'customerName': {},
	                'customerId': {},
	                'productId':{},
	                'productName':{},
	                'skuid':{},
	                'price':{},
	                'taxprice':{},
	                'taxrate':{},
	                'validtime':{type:"date"},
	                'stock':{},
	                'supplyablity':{},
	                'materialId':{},
	                'materialName':{},
		            'imgurl':{}
	            },
	            pageSize: 10
			}),
			deliveryOrderDetailDataTable: new $.DataTable({
	            params: {
	                "cls": "com.yonyou.yuncai.cpu.baseservice.domain.allowsale.SupplyCategory"
	            },
	            meta: {
	                'id': {},
	                'customerName': {},
	                'customerId': {},
	                'productId':{},
	                'productName':{},
	                'skuid':{},
	                'price':{},
	                'taxprice':{},
	                'taxrate':{},
	                'validtime':{type:"date"},
	                'stock':{},
	                'supplyablity':{},
	                'materialId':{},
	                'materialName':{},
		            'imgurl':{}
	            },
	            pageSize: 10
			}),

			/*页面切换*/
			pageChange: function (pageIndex) {
            	viewmodel.deliveryOrderDetailDataTable.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("deliveryOrderDetailDataTable").addDataTable("deliveryOrderDataTable").addParameter('pageIndex', pageIndex).addParameter("customerId",customerId).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.SupplyCategoryController",
		            method: 'query4Ref',
                    success: function (data) {
                    	
                    }
                })
			},
			sizeChange:function(pageSize){
				viewmodel.deliveryOrderDetailDataTable.pageSize(pageSize);
				app.serverEvent().addDataTable("deliveryOrderDetailDataTable").addDataTable("deliveryOrderDataTable").addParameter('pageIndex', pageIndex).addParameter("customerId",customerId).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.SupplyCategoryController",
		            method: 'query4Ref',
                    success: function (data) {
                    	
                    }
                })
			},
			queryByname:function(){
				app.serverEvent()
				.addDataTable('deliveryOrderDetailDataTable').addDataTable("deliveryOrderDataTable")  				
				.addParameter("keyword",viewmodel.goodsName())
				.fire({
					url: window.ctx.portal+"/evt/dispatch",
			        ctrl: "portal.SupplyCategoryController",
	          	    method: 'query4Ref',
					success: function(data) {
					}
				})
			},
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			var row = viewmodel.deliveryOrderDetailDataTable.getSelectedDatas()
			return row;
		})
		$("#ref_saleallow").undelegate().delegate("table tr","click",function(){
			refer.submit();
		});
		var app = $.createApp();
		app.init(viewmodel, $('#ref_saleallow')[0]);
		app.serverEvent()
		.addDataTable('deliveryOrderDetailDataTable').addDataTable("deliveryOrderDataTable").addParameter("customerId",customerId)
		.fire({
			url: window.ctx.portal+"/evt/dispatch",
	            ctrl: "portal.SupplyCategoryController",
	            method: 'query4Ref',
	            success: function (data) {
	            	
	            }
		})	
	}
    return {
        template: template,
        init: init
    }
})
