/**
 *
 * @description 商品参照页，参照当前租户的商品
 * @author wangbok
 * @date 2016-04-14
 * 
 */

define(["jquery","baseview","text!js/widgets/refer/refergoods.tpl.html","common"],function(
	$,
	BaseView,
	template,
	Common
	){
		var eventInit= false;
		var init = function(refer){
  		//商品
		var viewmodel = {
			productClassDataTable: new $.DataTable({
	            meta: {
	                'id': {},
	                'name': {},
	                'code': {},
	                'parentId':{}	                
	            },
	            pageSize: 10
			}),
			productQueryDataTable: new $.DataTable({
				params: {
	                "cls": "com.yonyou.cpu.web.portal.controller.product.ProductQueryEntity"
	            },
	            meta: {
	                'productClassId': {},
	                'innercode': {}
	            },
	            pageSize: 10
			}),
			productDataTable: new $.DataTable({
				params: {
	                "cls": "com.yonyou.yuncai.cpu.domain.product.dto.Product"
	            },
	            meta: {
	                'id': {},
	                'name': {},
	                'code': {},
	                'brands':{},
	                'productTag':{},
	                'subject':{},
	                'price':{},
	                'outerDate':{type:'date'}
	            },
	            pageSize: 10
			}),

			/*页面切换*/
			pageChange: function (pageIndex) {
            	viewmodel.productDataTable.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("productDataTable").addParameter("status", "0").fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.ProductController",
		            method: 'loadDataByStatus',
                    success: function (data) {
                    	
                    }
                });
			},
			sizeChange:function(pageSize){
				viewmodel.productDataTable.pageSize(pageSize);
				app.serverEvent().addDataTable("productDataTable").addParameter("status", "0").fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.ProductController",
		            method: 'loadDataByStatus',
                    success: function (data) {
                    	
                    }
                });
			},
			treeOnClick:function(event, treeId, treeNode){
				if(treeNode.id!=0 && treeNode.id !=null){
					viewmodel.productQueryDataTable.removeAllRows();
					var row = viewmodel.productQueryDataTable.createEmptyRow();
					viewmodel.productQueryDataTable.setRowSelect(0);
					row.setValue("productClassId",treeNode.id);	

					app.serverEvent().addDataTable("productDataTable").addDataTable("productQueryDataTable").addParameter("status", "2").fire({
			            url: window.ctx.portal+"/evt/dispatch",
			            ctrl: "portal.ProductController",
			            method: 'loadDataByStatus',
			            success: function (data) {				            	
			            }
			        });
				}
			}
		}	
		$("#ref_goods").undelegate().delegate("#persongrid_grid tr","click",function(){
			refer.submit();
		});
		//加载grid数据
		refer.registerSubmitFunc(function(){
			var row = viewmodel.productDataTable.getCurrentRow();
			return {
				id:row.getValue("id"),name:row.getValue("name"),code:row.getValue("code"),
				outerDate:row.getValue("outerDate"),
				price:row.getValue("price")
			};
		})
		
		var app = $.createApp();
		app.init(viewmodel, $('#ref_goods')[0]);
		app.serverEvent()
			.addDataTable('productClassDataTable')
			.fire({
				url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.ProductClassController",
		            method: 'loadData',
		            success: function (data) {
		            	
		            }
			});	
	}
    return {
        template: template,
        init: init
    }
})
