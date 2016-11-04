/**
 *
 * @description 租户参照页
 * @author wangbok
 * @date 2016-04-14
 * 
 */

define(["jquery","baseview","text!js/widgets/refer/refermulorg.tpl.html","common"],function(
	$,
	BaseView,
	template,
	Common
	){
	 
		var init = function(refer){
	 
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
	            pageSize: 20
			}),

			/*页面切换*/
			pageChange: function (pageIndex) {
				viewmodel.megeCurrentPageData2Alldata();
            	viewmodel.orgorganizationinfo.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("orgorganizationinfo")
				.addParameter('pageIndex', pageIndex)
				.addParameter("selectorgids",viewmodel.getCurrentSelectedOrgData(refer.params.selectorgDatas))
				.fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.OrganizationController",
		            method: 'findOrg',
                    success: function (data) {
                    	
                    }
                })
			},
			sizeChange:function(pageSize){
				viewmodel.megeCurrentPageData2Alldata();
				viewmodel.orgorganizationinfo.pageSize(pageSize);
				app.serverEvent().addDataTable("orgorganizationinfo")
				.addParameter("selectorgids",viewmodel.getCurrentSelectedOrgData(refer.params.selectorgDatas))
				.fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.OrganizationController",
		            method: 'findOrg',
                    success: function (data) {
                    	
                    }
                })
			},

			getCurrentSelectedOrgData:function(rows){
				var ids = [];
				for(var i=0;i<rows.length;i++){
					var id;
					if (rows[i].data.id.value) {
						id = rows[i].data.id.value+"";
					} else {
						id = rows[i].data.id+"";
					}
					if (ids.indexOf(id) == -1) {
						ids.push(id);
					}
				}
				return ids;
			},
			megeCurrentPageData2Alldata:function(){
				var oldDatas = refer.params.orgDataTable.getAllRows();
				var oldIds =  viewmodel.getCurrentSelectedOrgData(oldDatas);
				var allpagerows = viewmodel.orgorganizationinfo.getAllRows();
				var selectedrows = viewmodel.orgorganizationinfo.getSelectedDatas();
				var selectids = [];
				var addids = [];
				var deleteids = [];
				// 找出新增行
				for (var i= 0,length=selectedrows.length;i<length;i++) {
					var selectedValue = selectedrows[i].data.id.value+"";
					selectids.push(selectedValue);
					if (oldIds.indexOf(selectedValue) == -1 && addids.indexOf(selectedValue) == -1) {
						addids.push(selectedValue);
						var r = refer.params.orgDataTable.createEmptyRow();
						r.setValue('id',selectedrows[i].data.id.value);
					    r.setValue('orgName',selectedrows[i].data.orgName.value);
						refer.params.orgDataTable.setRowSelect(r)
					}
				}
				// 找出删除行
				for (var i= 0,length=allpagerows.length;i<length;i++) {
					var tid = allpagerows[i].data.id.value +"";
					if (selectids.indexOf(tid)==-1&&oldIds.indexOf(tid)>-1) {
						deleteids.push(tid);
					}
				}
				var allrows = refer.params.orgDataTable.getAllRows();
				for (var i= 0,length=allrows.length;i<length;) {
					var tid = allrows[i].data.id.value +"";
					if (deleteids.indexOf(tid) > -1) {
						refer.params.orgDataTable.removeRow(allrows[i]);
						length--;
					} else {
						i++;
					}
				}
				return refer.params.orgDataTable.getAllRows();
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return viewmodel.megeCurrentPageData2Alldata();
		})
		$("#ref_organization").undelegate().delegate("table tr","dblclick",function(){
			refer.submit();
		});
		var app = $.createApp();
		app.init(viewmodel, $('#ref_organization')[0]);
		app.serverEvent()
		.addDataTable('orgorganizationinfo')
		.addParameter("selectorgids",viewmodel.getCurrentSelectedOrgData(refer.params.selectorgDatas))
				
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
