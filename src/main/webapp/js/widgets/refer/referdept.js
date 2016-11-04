/**
 *
 * @description 租户参照页
 * @author wangbok
 * @date 2016-04-14
 * 
 */

define(["jquery","baseview","text!js/widgets/refer/referdept.tpl.html","common"],function(
	$,
	BaseView,
	template,
	Common
	){
		var init = function(refer){
  		//企业实体
		var viewmodel = {
				deptorganizationinfo: new $.DataTable({
	            params: {
	                "cls": "com.yonyou.yuncai.cpu.domain.dto.organization.OrganizationPOJO"
	            },
	            meta: {
	        		'id':{},					
					'orgName':{},
					'parentId':{},
					'orgCode':{},
					'erpCode':{}
	            },
	            pageSize: 10
			}),

			/*页面切换*/
			pageChange: function (pageIndex) {
            	viewmodel.deptorganizationinfo.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("deptorganizationinfo").addParameter('pageIndex', pageIndex).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.OrganizationController",
		            method: 'findDept',
                    success: function (data) {
                    	
                    }
                })
			},
			sizeChange:function(pageSize){
				viewmodel.deptorganizationinfo.pageSize(pageSize);
				app.serverEvent().addDataTable("deptorganizationinfo").fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.OrganizationController",
		            method: 'findDept',
                    success: function (data) {
                    	
                    }
                })
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return viewmodel.deptorganizationinfo.getSelectedDatas();
		})
		$("#ref_organization").undelegate().delegate("table tr","dblclick",function(){
			refer.submit();
		});
		var app = $.createApp();
		app.init(viewmodel, $('#ref_organization')[0]);
		app.serverEvent()
		.addDataTable('deptorganizationinfo')
		.fire({
			url: window.ctx.portal+"/evt/dispatch",
	            ctrl: "portal.OrganizationController",
	            method: 'findDept',
	            success: function (data) {
	            	
	            }
		})	
	}
    return {
        template: template,
        init: init
    }
})
