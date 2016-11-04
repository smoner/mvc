define(['text!js/widgets/refer/referperson.tpl.html','common'], function (template,Common) {
  var init = function(refer){
  		/*默认选中的树节点数据*/
  		window.currentClickNode= null;
  		var self = this;
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
			}),/*部门对应的用户列表*/
			personDataTable: new $.DataTable({
	            params: {
	                "cls": "com.yonyou.yuncai.cpu.domain.dto.person.PersonPOJO"
	            },
	            meta: {
	                'id': {},
	                'personname':{},	               
	                'personcode': {},
	                'persondesc':{},
	                'organizationid':{},
	                'userid':{},
					'usercode':{},
					'username':{},
				},
	            pageSize: 10
			}),
			treeOnClick:function(event, treeId, treeNode){
				if(treeNode.pId!=0 && treeNode.pId !=null){					
					app.serverEvent().addDataTable("personDataTable").addParameter("orgid", treeNode.id).fire({
			            url: window.ctx.portal+"/evt/dispatch",
			            ctrl: "privilege.PersonController",
			            method: 'queryByPage',
			            success: function (data) {	
			            }
			        });
				}
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			var row = viewModel.personDataTable.getCurrentRow();
			var orgrow = viewModel.organizationDataTableForTree.getCurrentRow();
			return {id:row.getValue("id"),personname:row.getValue("personname"),persondesc:row.getValue("persondesc"),userid:row.getValue("userid"),usercode:row.getValue("usercode"),username:row.getValue("username"),orgName:orgrow.getValue("orgName"),orgCode:orgrow.getValue("orgCode"),orgid:orgrow.getValue("id")};
		})
		$("#ref_person").undelegate().delegate("table tr","click",function(){
			refer.submit();
		});
		var app = $.createApp();
		app.init(viewModel, $('#ref_person')[0]);
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
				//				
				//组织树默认展开一级
            	var _tree = app.getComp("ztree_organization_refer").tree;
            	var id = app.dataTables.organizationDataTableForTree.rows()[0].getValue("id");
            	var node = _tree.getNodeByParam("id",id,null);
            	_tree.expandNode(node);
			}
		});		
	}
    return {
        template: template,
        init: init
    }
})






















