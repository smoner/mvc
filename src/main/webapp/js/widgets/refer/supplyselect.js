define(["jquery","knockout","text!js/widgets/refer/supplyselect.tpl.html","common"],
	function ($,ko,
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
		            pageSize: 10
				}),
			name:ko.observable(''),
			/*页面切换*/
			pageChange: function (pageIndex) {
            	viewModel.supplyDocDataTable.setCurrentPage(pageIndex);
				app.serverEvent().addDataTable("supplyDocDataTable")
				.addParameter("enterpriseId",refer.params.enterpriseId)
				.addParameter('pageIndex', pageIndex).fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.SupplyController",
		            method: 'findAll4Refer',
                    success: function (data) {
                    	viewModel.supplyDocDataTable.trigger($.DataTable.ON_LOAD,data);
                    }
                })
			},

			sizeChange:function(pageSize){
				viewModel.supplyDocDataTable.pageSize(pageSize);
				app.serverEvent().addDataTable("supplyDocDataTable")
				.addParameter("enterpriseId",refer.params.enterpriseId)
				.fire({
					url: window.ctx.portal+"/evt/dispatch",
		            ctrl: "portal.SupplyController",
		            method: 'findAll4Refer',
                    success: function (data) {
                    	viewModel.supplyDocDataTable.trigger($.DataTable.ON_LOAD,data);
                    }
                })
			},
			queryPage:function(){
				app.serverEvent()
				.addDataTable('supplyDocDataTable')
				.addParameter("enterpriseId",refer.params.enterpriseId)
				.addParameter("name",viewModel.name())
				.fire({
					url: window.ctx.portal+"/evt/dispatch",
			        ctrl:"portal.SupplyController",
			        method:"findAll4Refer",
					success: function(data) {
					}
				})
			}
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return viewModel.supplyDocDataTable.getSelectedDatas();
		})
		$("#supplyModal").undelegate().delegate("table tr","click",function(){
			refer.submit();
		});
		// 这里用jquery去绑定事件 因为用ko会有问题 我也不知道为什么 为了解bug先这么处理
		$("#supplyquery").off("click").on("click",function(e){
		  	viewModel.name($("#queryinput").val());
			viewModel.queryPage();
		});
		var app = $.createApp();
		app.init(viewModel, $('#supplyModal')[0]);
		viewModel.queryPage();
			
	}
    return {
        template: template,
        init: init
    }
})

