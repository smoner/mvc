/**
 *
 * @description 商品参照页，参照当前租户的商品
 * @author wangbok
 * @date 2016-04-14
 * 
 */

define(["jquery","baseview","text!js/widgets/refer/refergoodsku.tpl.html","common","knockout"],function(
	$,
	BaseView,
	template,
	Common,ko
	){
		var eventInit= false;
		var goodsku = {id:"",skuValue:"",productId:""};
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
	                'innercode': {},
	                'keyWord':{}
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
	                'outerDate':{type:'date'},
	                'sku':{},
	                'imgUrl':{}
	            },
	            pageSize: 10
			}),
			goodsName:ko.observable(''),
			/*页面切换*/
			pageChange: function (pageIndex) {
            	viewmodel.productDataTable.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("productDataTable").addDataTable("productQueryDataTable").addParameter("status", "0").addParameter("pageIndex",pageIndex).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.ProductController",
		            method: 'loadProductSKUTree',
                    success: function (data) {
                    	
                    },
					error:function(){
						viewmodel.productDataTable.removeAllRows();
					}
                });
			},
			sizeChange:function(pageSize){
				viewmodel.productDataTable.pageSize(pageSize);
				app.serverEvent().addDataTable("productDataTable").addDataTable("productQueryDataTable").addParameter("status", "0").fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.ProductController",
		            method: 'loadProductSKUTree',
                    success: function (data) {
                    	
                    },
					error:function(){
						viewmodel.productDataTable.removeAllRows();
					}
                });
			},
			
			//根据商品名字查询
			queryPageByGoods: function(){
				viewmodel.productDataTable.setCurrentPage(0);
				/*var cr = viewmodel.productQueryDataTable.getCurrentRow();
				if(cr == null){
					cr = viewmodel.productQueryDataTable.createEmptyRow();
					viewmodel.productQueryDataTable.setRowSelect(0);
				}*/
				var newrow = viewmodel.productQueryDataTable.createEmptyRow();
				newrow.setValue('keyWord',viewmodel.goodsName());
				viewmodel.productQueryDataTable.setRowSelect(newrow);
				app.serverEvent()
				.addDataTable('productDataTable').addDataTable("productQueryDataTable")
				.fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.ProductController",
		            method: 'loadProductSKUTree',
		            success: function (data) {
		            	
		            }
				})	
			},
			
			treeOnClick:function(event, treeId, treeNode){
				
				viewmodel.productDataTable.setCurrentPage(0);
				if(treeNode.id!=0 && treeNode.id !=null){
					viewmodel.goodsName('')
					viewmodel.productQueryDataTable.removeAllRows();
					var row = viewmodel.productQueryDataTable.createEmptyRow();
					viewmodel.productQueryDataTable.setRowSelect(0);
					row.setValue("productClassId",treeNode.id);	

					app.serverEvent().addDataTable("productDataTable").addDataTable("productQueryDataTable").addParameter("status", "2").fire({
			            url: window.ctx.portal+"/evt/dispatch",
			            ctrl: "portal.ProductController",
			            method: 'loadProductSKUTree',
			            success: function (data) {				            	
			            },
						error:function(){
							viewmodel.productDataTable.removeAllRows();
						}
			        });
				}
			},
			skuselect:function(item,product){
				goodsku= {id:item.id,skuCode:item.skuCode,skuValue:item.skuValue,productId:item.productId,price:item.price,taxrate:item.taxrate,taxPrice:item.taxPrice,outerDate:product.ref("outerDate")(),productName:product.ref("name")(),imgUrl:product.ref("imgUrl")()};
				refer.submit();
			},
			noskuselect:function(item){
				
				if(!(item.data.sku.value[0].skuValue)){
					var sku = item.data.sku.value[0];
					goodsku= {id:sku.id,skuValue:"",skuCode:sku.skuCode,productId:sku.productId,price:sku.price,taxrate:sku.taxrate,taxPrice:sku.taxPrice,outerDate:item.ref("outerDate")(),productName:item.ref("name")(),imgUrl:item.ref("imgUrl")()};
					refer.submit();
				}
				/*
				goodsku= {id:item.id,skuValue:item.skuValue,productId:item.productId,price:item.price,taxPrice:item.taxPrice,outerDate:product.ref("outerDate")(),productName:product.ref("name")(),imgUrl:product.ref("imgUrl")()};
				refer.submit();*/
			}
		}	
		$("#ref_goods").undelegate().delegate("#persongrid_grid tr","click",function(){
			
			refer.submit();
		});
		//加载grid数据
		refer.registerSubmitFunc(function(){
			//var row = viewmodel.productDataTable.getCurrentRow();
			return goodsku;
		})
		
		var app = $.createApp();
		app.init(viewmodel, $('#ref_goodssku')[0]);
		app.serverEvent()
			.addDataTable('productClassDataTable')
			.fire({
				url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.ProductClassController",
		            method: 'loadData',
		            success: function (data) {
		            	
		            },
		            error:function(){
		            	viewmodel.productDataTable.removeAllRows();
		            }
			});	
	}
    return {
        template: template,
        init: init
    }
})
