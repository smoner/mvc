/**
 *
 * @description 租户参照页
 * @author wangbok
 * @date 2016-04-14
 * 
 */

define(["jquery","baseview","text!js/widgets/refer/referenterprise.tpl.html","common",'knockout'],function(
	$,
	BaseView,
	template,
	Common,ko
	){
		var init = function(refer){
		var app = $.createApp();
  		//企业实体
		var viewmodel = {
			enterpriseDataTable: new $.DataTable({
	            params: {
	                "cls": "com.yonyou.cpu.domain.entity.enterprise.EnterprisePOJO"
	            },
	            meta: {
	                'id': {},
	                'name': {},
	                'code': {},
	                'registMoney':{},
	                'area':{},
	                'bizVerify':{},
	                'buyerSecurity':{}
	            },
	            pageSize: 10
			}),
			name:ko.observable(''),

			/*页面切换*/
			pageChange: function (pageIndex) {
            	viewmodel.enterpriseDataTable.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("enterpriseDataTable").addParameter('pageIndex', pageIndex).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.EnterpriseController",
		            method: 'findAll',
                    success: function (data) {
                    	
                    }
                })
			},
			sizeChange:function(pageSize){
				viewmodel.enterpriseDataTable.pageSize(pageSize);
				app.serverEvent().addDataTable("enterpriseDataTable").fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.EnterpriseController",
		            method: 'findAll',
                    success: function (data) {
                    	
                    }
                })
			},
			queryPage: function(){
				viewmodel.enterpriseDataTable.setCurrentPage(0);
				app.serverEvent()
				.addDataTable('enterpriseDataTable').addParameter("name",viewmodel.name())
				.fire({
					url: window.ctx.portal+"/evt/dispatch",
			            ctrl: "portal.EnterpriseController",
			            method: 'findAll',
			            success: function (data) {
			            	
			            }
				})	
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return viewmodel.enterpriseDataTable.getSelectedDatas();
		})
		$("#ref_enterprise").undelegate().delegate("table tr","click",function(){
			refer.submit();
		});
		
		app.init(viewmodel, $('#ref_enterprise')[0]);
		viewmodel.queryPage()
	}
    return {
        template: template,
        init: init
    }
})
