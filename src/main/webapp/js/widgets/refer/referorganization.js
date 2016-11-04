define(['text!js/widgets/refer/referorganization.tpl.html','common'], function (template,Common) {
  var init = function(refer){
  		/*默认选中的树节点数据*/
  		window.currentClickNode= null;
  		/*组织部门*/
		var viewModel = {
			organizationDataTable :new $.DataTable({
				meta:{
					'states':{},					
					'data':{}
				}
			}),
			organizationDataTableForTree:new $.DataTable({
				meta:{
					'id':{},					
					'orgName':{},
					'parentId':{},
					'orgCode':{}
				}
			}),
			treeOnClick:function(event, treeId, treeNode){
				window.currentClickNode = treeNode;
				refer.submit();
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return window.currentClickNode;
		})
		
		var app = $.createApp();
		app.init(viewModel, $('#ref_organization')[0]);
		app.serverEvent().addDataTable('organizationDataTable').fire({
			url: window.ctx.portal+"/evt/dispatch",
	        ctrl:"portal.OrganizationController",
	        method:"findAllAsTree",
			success: function(data) {
				viewModel.organizationDataTableForTree.removeAllRows();
				viewModel.organizationDataTableForTree.setData(
					{
            		   pageIndex: 1,
            		   pageSize: 10,
            		   rows: JSON.parse(data).content
            		}
				);

				//组织树默认展开一级
            	var _tree = app.getComp("ztree_organization_refer").tree;
            	var id = app.dataTables.organizationDataTableForTree.rows()[0].getValue("id");
            	var node = _tree.getNodeByParam("id",id,null);
            	_tree.expandNode(node);
				
			}
		})
	}
    return {
        template: template,
        init: init
    }
})

