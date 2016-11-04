/**
 *
 * @description 商品参照页，参照当前租户的商品
 * @author wangbok
 * @date 2016-04-14
 * 
 */

define(["jquery","baseview","text!js/widgets/refer/refermaterialbyclass.tpl.html","common"],function(
	$,
	BaseView,
	template,
	Common
	){
		var eventInit= false;
		var init = function(refer){
		var enterpriseId = refer.params.enterpriseId;
  		//商品
		var viewmodel = {
			materialClassDataTable: new $.DataTable({
	            meta: {
	                'id': {},
	                'className': {},
	                'code': {},
	                'parentid':{}	                
	            },
	            pageSize: 10
			}),
			materialDataTable: new $.DataTable({
				params: {
	                "cls": "com.yonyou.cpu.domain.dto.Material"
	            },
	            meta: {
	                'id': {},
	                'name': {},
	                'code': {},
	                'measdoc':{},
	                'spec':{},
	                'brand':{}
	            },
	            pageSize: 10
			}),

			/*页面切换*/
			pageChange: function (pageIndex) {
            	viewmodel.materialDataTable.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("materialDataTable").addParameter("enterpriseId", enterpriseId).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.MaterialController",
		            method: 'findAll',
                    success: function (data) {
                    	
                    }
                });
			},
			sizeChange:function(pageSize){
				viewmodel.materialDataTable.pageSize(pageSize);
				app.serverEvent().addDataTable("materialDataTable").addParameter("enterpriseId", enterpriseId).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.MaterialController",
		            method: 'findAll',
                    success: function (data) {
                    	
                    }
                });
			},
			treeOnClick:function(event, treeId, treeNode){
				if(treeNode.id!=0 && treeNode.id !=null){					
					app.serverEvent().addDataTable("materialDataTable").addParameter("enterpriseId", enterpriseId).addParameter("classId",treeNode.id).fire({
			            url: window.ctx.portal+"/evt/dispatch",
			            ctrl: "portal.MaterialController",
			            method: 'findAll',
			            success: function (data) {				            	
			            }
			        });
				}
			}
		}	
		$("#ref_materialbycls").undelegate().delegate("table tr","click",function(){
			refer.submit();
		});
		//加载grid数据
		refer.registerSubmitFunc(function(){
			var row = viewmodel.materialDataTable.getCurrentRow();
			return {
				id:row.getValue("id"),
				name:row.getValue("name"),
				code:row.getValue("code")
			};
		})
		
		var app = $.createApp();
		
		app.init(viewmodel, $('#ref_materialbycls')[0]);
		app.serverEvent()
			.addDataTable('materialClassDataTable').addParameter("enterpriseId",enterpriseId)
			.fire({
				url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.MaterialClassController",
		            method: 'findAllAsTree',
		            success: function (data) {
		            	
		            }
			});	
	}
    return {
        template: template,
        init: init
    }
})
