define(["jquery","text!js/widgets/refer/supplymulselect.tpl.html","common"],
	function ($,
			template,
			Common) {
	var init = function(refer){
  		//供应商模型
		var viewModel = {
			supplyDocDataTable: new $.DataTable({
		            params: {
		                "cls": "com.yonyou.yuncai.cpu.domain.dto.supplydocument.SupplyDocPOJO"
		            },
		            meta: {
		                'id':{},
	            		'name':{},
	            		'code': {},
	                	'trade': {},
	                	'registerFund':{},
	                	'supplyId':{},
	                	'purchaseId':{}
		            },
		            pageSize: 20
				}),

			/*页面切换*/
			pageChange: function (pageIndex) {
				viewModel.megeCurrentPageData2Alldata();
            	viewModel.supplyDocDataTable.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("supplyDocDataTable").addParameter('pageIndex', pageIndex)
				.addParameter("selectSupplyids",viewModel.getCurrentSelectedSupplyData(refer.params.selectSupplyDatas))
				.fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.SupplyController",
		            method: 'findAll4ReferMult',
                    success: function (data) {
                    	viewModel.supplyDocDataTable.trigger($.DataTable.ON_LOAD,data);
                    }
                })
			},
			getCurrentSelectedSupplyData:function(rows){
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
				var oldDatas = refer.params.supplyDataTable.getAllRows();
				var oldIds =  viewModel.getCurrentSelectedSupplyData(oldDatas);
				var allpagerows = viewModel.supplyDocDataTable.getAllRows();
				var selectedrows = viewModel.supplyDocDataTable.getSelectedDatas();
				var selectids = [];
				var addids = [];
				var deleteids = [];
				// 找出新增行
				for (var i= 0,length=selectedrows.length;i<length;i++) {
					var selectedValue = selectedrows[i].data.id.value+"";
					selectids.push(selectedValue);
					if (oldIds.indexOf(selectedValue) == -1 && addids.indexOf(selectedValue) == -1) {
						addids.push(selectedValue);
						var r = refer.params.supplyDataTable.createEmptyRow();
						r.setValue('id',selectedrows[i].data.id.value);
						r.setValue('supplyId',selectedrows[i].data.supplyId.value);
						r.setValue('name',selectedrows[i].data.name.value);
						refer.params.supplyDataTable.setRowSelect(r)
					}
				}
				// 找出删除行
				for (var i= 0,length=allpagerows.length;i<length;i++) {
					var tid = allpagerows[i].data.id.value +"";
					if (selectids.indexOf(tid)==-1&&oldIds.indexOf(tid)>-1) {
						deleteids.push(tid);
					}
				}
				var allrows = refer.params.supplyDataTable.getAllRows();
				for (var i= 0,length=allrows.length;i<length;) {
					var tid = allrows[i].data.id.value +"";
					if (deleteids.indexOf(tid) > -1) {
						refer.params.supplyDataTable.removeRow(allrows[i]);
						length--;
					} else {
						i++;
					}
				}
				return refer.params.supplyDataTable.getAllRows();
			},
			sizeChange:function(pageSize){
				viewModel.megeCurrentPageData2Alldata();
				viewModel.supplyDocDataTable.pageSize(pageSize);
				app.serverEvent().addDataTable("supplyDocDataTable")
				.addParameter("selectSupplyids",viewModel.getCurrentSelectedSupplyData(refer.params.selectSupplyDatas))
				.fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.SupplyController",
		            method: 'findAll4ReferMult',
                    success: function (data) {
                    	viewModel.supplyDocDataTable.trigger($.DataTable.ON_LOAD,data);
                    }
                })
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return viewModel.megeCurrentPageData2Alldata();
		})
//		$("#supplyModal").undelegate().delegate("table tr","click",function(){
//			//refer.submit();
//		});
		var app = $.createApp();
		app.init(viewModel, $('#supplyModal')[0]);
		app.serverEvent()
		.addDataTable('supplyDocDataTable')
		.addParameter("enterpriseId",refer.params.enterpriseId)
		.addParameter("selectSupplyids",viewModel.getCurrentSelectedSupplyData(refer.params.selectSupplyDatas))
		.fire({
			url: window.ctx.portal+"/evt/dispatch",
	        ctrl:"portal.SupplyController",
	        method:"findAll4ReferMult",
			success: function(data) {
			}
		})
			
	}
    return {
        template: template,
        init: init
    }
})

