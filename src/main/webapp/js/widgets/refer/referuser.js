/**
用户参照
*/
define(['text!js/widgets/refer/referuser.tpl.html','common'], function (template,Common) {
  var init = function(refer){
  		/*默认选中的树节点数据*/
  		window.currentClickNode= null;
  		/*组织部门*/
		var viewModel = {
			userDataTable: new $.DataTable({
	            params: {
	                "cls": "com.yonyou.cpu.domain.entity.account.MgrUser"
	            },
	            meta: {
	                'id': {},
	                'loginName':{},
	                'roles':{},
	                'name': {},
	                'code': {},
	                'ecCode':{},
	                'ncUname':{},
	                'userType':{},
	                'ucuserId':{},
	                'userMobile':{},
	                'email':{}

	            },
	            pageSize: 10
			}),
			pageChange:function(pageIndex){
				viewModel.userDataTable.pageIndex(pageIndex);
				app.serverEvent().addDataTable('userDataTable').fire({
					url: window.ctx.portal+"/evt/dispatch",
			        ctrl:"privilege.UserController",
		            method: 'findByPage',
					success: function(data) {
					}
				})
			}
		}	
		$("#ref_user").undelegate().delegate("table tr","click",function(){
			refer.submit();
		});
		//加载grid数据
		refer.registerSubmitFunc(function(){
			return viewModel.userDataTable.getCurrentRow();
		})
		
		var app = $.createApp();
		app.init(viewModel, $('#ref_user')[0]);
		app.serverEvent().addDataTable('userDataTable').fire({
			url: window.ctx.portal+"/evt/dispatch",
	        ctrl:"privilege.UserController",
            method: 'findByPage',
			success: function(data) {
			}
		})
	}
    return {
        template: template,
        init: init
    }
})

