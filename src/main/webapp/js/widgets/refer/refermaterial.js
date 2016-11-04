define(['text!js/widgets/refer/refermaterial.tpl.html','common'], function (template,Common) {
  var init = function(refer){
  		/*默认选中的树节点数据*/
  		var currentClickNode= null;
  		/*物料分类模型*/
		var viewModel = {
			materialClassDataTable :new $.DataTable({
				meta:{
					'states':{},					
					'data':{}
				}
			}),
			materialClassDataTableForTree:new $.DataTable({
				meta:{
					'id':{},					
					'className':{},
					'parentid':{}
				}
			}),
			treeOnClick:function(event, treeId, treeNode){
				currentClickNode = treeNode;
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return currentClickNode;
		})
		
		var app = $.createApp();
		app.init(viewModel, $('#ref_materialclass')[0]);
		app.serverEvent().addDataTable('materialClassDataTable').addParameter("enterpriseId",refer.params.enterpriseId).fire({
			url: window.ctx.portal+"/evt/dispatch",
	        ctrl:"portal.MaterialClassController",
	        method:"findAllAsTree",
			success: function(data) {
				viewModel.materialClassDataTableForTree.removeAllRows();
				viewModel.materialClassDataTableForTree.setData(
					{
            		   pageIndex: 1,
            		   pageSize: 10,
            		   rows: JSON.parse(data).content
            		}
				);
				
			}
		})
	}
    return {
        template: template,
        init: init
    }
})

