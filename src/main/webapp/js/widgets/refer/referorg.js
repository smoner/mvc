/**
 *
 * @description 租户参照页
 * @author wangbok
 * @date 2016-04-14
 * 
 */

define(["jquery","baseview","text!js/widgets/refer/referorg.tpl.html","common"],function(
	$,
	BaseView,
	template,
	Common
	){
		var init = function(refer){
			var enterpriseid;
			if(refer.options.enterpriseid){
				enterpriseid=refer.options.enterpriseid;
			}
			
  		//企业实体
		var viewmodel = {
				orgorganizationinfo: new $.DataTable({
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
            	viewmodel.orgorganizationinfo.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("orgorganizationinfo").addParameter('pageIndex', pageIndex).addParameter("enterpriseid", enterpriseid).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.OrganizationController",
		            method: 'findOrg',
                    success: function (data) {
                    	
                    }
                })
			},
			sizeChange:function(pageSize){
				viewmodel.orgorganizationinfo.pageSize(pageSize);
				app.serverEvent().addDataTable("orgorganizationinfo").addParameter("enterpriseid", enterpriseid).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.OrganizationController",
		            method: 'findOrg',
                    success: function (data) {
                    	
                    }
                })
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return viewmodel.orgorganizationinfo.getSelectedDatas();
		})
		$("#ref_organization").undelegate().delegate("table tr","dblclick",function(){
			refer.submit();
		});
		var app = $.createApp();
		app.init(viewmodel, $('#ref_organization')[0]);
		app.serverEvent()
		.addDataTable('orgorganizationinfo')
		.addParameter("enterpriseid", enterpriseid)
		.fire({
			url: window.ctx.portal+"/evt/dispatch",
	            ctrl: "portal.OrganizationController",
	            method: 'findOrg',
	            success: function (data) {
	            	
	            }
		})	
	}
    return {
        template: template,
        init: init
    }
})
