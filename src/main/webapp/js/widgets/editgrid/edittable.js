/**
 *
 * @description 企业信息查询页面
 * @author songhlc
 * @date 2016-01-18
 * 
 */

define(["jquery",'knockout',"baseview","text!example/multilinedatatable/mldatatable.tpl.html","common","jqautocomplete","datepicker"],function(
	$,
	ko,
	BaseView,
	template,
	Common,
	Jqautocomplete
	){
	var self;
	var DIALOG_WIDTH="750px";
	var view = BaseView.extend({	
		bindEvents:function(){	
			if(this.viewmodels){
				for(var i=this.viewmodels.length-1;i>=0;i--){
					var _item = this.viewmodels[i];
					var that = this;
					$(_item.delegateElement).undelegate();
					$(_item.delegateElement).delegate(".operate","click",function(e){
						var rowIndex = $(this).parents("tr").index();
						that.bindDeleteRow(rowIndex,_item.dataTable,_item.deleteRowCallback);
					}).delegate("tr","click",function(){
						if (!_item.isNotAutoAddline) {
							that.bindCreateEmptyRow($(this).index(),_item.dataTable);
						}
					});
					for(var j=_item.columns.length-1;j>=0;j--){
						var _curColumn = _item.columns[j];
						switch(_curColumn.type){
							case "type_organize":
								(function(_callback){
									$(_item.delegateElement).delegate(_curColumn.delegateCls,"click",function(e){
										that.bindReferOrganize($(this).parents("tr").index(),_item.dataTable,_callback);
									});
								})(_curColumn.callback);
								break;
							case "type_person":
								(function(_callback){
									
									$(_item.delegateElement).delegate(_curColumn.delegateCls,"click",function(e){
									
										that.bindReferPerson($(this).parents("tr").index(),_item.dataTable,_callback);
									});
								})(_curColumn.callback);
								break;
							case "type_date":
								$(_item.delegateElement).delegate(_curColumn.delegateCls,"mouseover",function(e){
									that.bindDateSelect($(this));
								});
								break;
							case "ref_supplier":
								(function(_callback){
									$(_item.delegateElement).delegate(_curColumn.delegateCls,"click",function(e){
										that.bindReferSupplier($(this).parents("tr").index(),_item.dataTable,_callback);
									});
								})(_curColumn.callback);
								break;
							case "ref_goods":
								(function(_callback){
									$(_item.delegateElement).delegate(_curColumn.delegateCls,"click",function(e){
										that.bindReferGoods($(this).parents("tr").index(),_item.dataTable,_callback);
									});
								})(_curColumn.callback);
								break;
							case "ref_goodsku":
								(function(_callback){
									$(_item.delegateElement).delegate(_curColumn.delegateCls,"click",function(e){
										that.bindGoodSku($(this).parents("tr").index(),_item.dataTable,_callback);
									});
								})(_curColumn.callback);
								break;
							case "ref_materialbycls":
								(function(_callback,_curColumn){
									$(_item.delegateElement).delegate(_curColumn.delegateCls,"click",function(e){
										var _index = $(this).parents("tr").index();
										that.bindReferMaterailByCls(_index,_item.dataTable,_callback,_curColumn.params);
									});
								})(_curColumn.callback,_curColumn);
								break;
						}
					}
				}

			}			
		},
		/*绑定删除行事件*/
		bindDeleteRow:function(rowIndex,dataTable,callback){
			if(dataTable.rows().length>1){
				var row = dataTable.getRow(rowIndex)
				if (row.status == 'new') {
					dataTable.removeRow(rowIndex);
					dataTable.setRowSelect(rowIndex>0?rowIndex-1:0);
				} else {
					if(callback)
						callback(row);
				}
			}
		},
		bindCreateEmptyRow:function(rowIndex,dataTable){
			dataTable.setRowSelect(rowIndex);				
			if(rowIndex+1==dataTable.rows().length){
				dataTable.createEmptyRow();				
			}
		},
		/*部门选择*/
		bindReferOrganize:function(index,dataTable,callback){
			dataTable.setRowSelect(index);
			$("#ref_organization").remove();			
			$.refer({
				title:'组织部门选择',
				isPOPMode: true,
				contentId: 'ref_organization',
				width: '600px',
				pageUrl: 'js/widgets/refer/referorganization',
				onOk: function(data) {
					/*var row = self.viewmodel.datatable.getCurrentRow();
					row.setValue("pid",data.id);
					row.setValue("name",data.name);*/
					if(callback)
						callback(data);
				}
			})	
		},
		/*供应商选择*/
		bindReferSupplier:function(index,dataTable,callback){
			
			dataTable.setRowSelect(index);
			$("#ref_supplier").remove();
			$.refer({
				params:{enterpriseId:Common.userContext().enterpriseId},
				title:'供应商选择',
				isPOPMode: true,
				contentId: 'ref_supplier',
				width: '600px',
				pageUrl: 'js/widgets/refer/supplyselect',
				onOk: function(data) {
					/*var row = self.viewmodel.datatable.getCurrentRow();
					 row.setValue("pid",data.id);
					 row.setValue("name",data.name);*/
					if(callback)
						callback(data);
				}
			})
		},
		/*人员选择*/
		bindReferPerson:function(index,dataTable,callback){
			dataTable.setRowSelect(index);				
			$("#ref_person").remove();		
			$.refer({
				title:'人员选择',
				isPOPMode: true,
				contentId: 'ref_person',
				width: '750px',
				pageUrl: 'js/widgets/refer/referperson',
				onOk: function(data) {
					if(callback){
						callback(data);
					}
				}
			})	
		},
		/*商品选择*/
		bindReferGoods:function(index,dataTable,callback){
			dataTable.setRowSelect(index);	
			$("#ref_goods").remove();		
			$.refer({
				title:'商品选择',
				isPOPMode: true,
				contentId: 'ref_goods',
				width: '750px',
				pageUrl: 'js/widgets/refer/refergoods',
				onOk: function(data) {
					if(callback){
						callback(data);
					}
				}
			})
		},
		/*物料选择by class*/
		bindReferMaterailByCls:function(index,dataTable,callback,params){
			dataTable.setRowSelect(index);
			var enterpriseId = params.datatable.getCurrentRow().getValue(params.key);	
			if(!enterpriseId){
				Common.toastr().error("请选择采购商");return;
			}		
			$.refer({
				title:'物料选择',
				isPOPMode: true,
				contentId: 'ref_materialbycls',
				width: '750px',
				pageUrl: 'js/widgets/refer/refermaterialbyclass',
				onOk: function(data) {
					if(callback){
						callback(data);
					}
				},
				params:{enterpriseId:enterpriseId}
			})
		},
		/*选择商品sku*/
		bindGoodSku:function(index,dataTable,callback,params){
			$.refer({
				params:{'enterpriseId':Common.userContext().enterpriseId +""},
				title:'商品选择',
				isPOPMode: true,
				contentId: 'ref_goodssku',
				width: '800px',
				pageUrl: 'js/widgets/refer/refergoodsku',
				onOk: function(data) {
					if(callback){
						callback(data);
					}
				}
			})	
		},
		bindDateSelect:function(element){
			if(!element.attr("date-binded")){
				console.log("log 2");
				element.attr("date-binded",true);
				element.datepicker({	              
	                autoclose: true,
	                language:"zh"
	            });
			}
			
		},
		removeEmptyRow:function(dataTable,columns){
			var _rows = dataTable.rows();
			var removedRids = [];
			for(var i=0;i<_rows.length;i++){
				var _curRow = _rows[i];
				for(var j=0;j<columns.length;j++){
					var _column = columns[j];
					if(_curRow.getValue(_column)){
						break;
					}
					/*如果如果全部循环完都没有退出则表示是空行*/
					if(j==columns.length-1){
						removedRids.push(_curRow.rowId);
					}
				}
			}
			for(var i=0;i<removedRids.length;i++){
				dataTable.removeRowByRowId(removedRids[i]);
			}
		},
		defaultOption:{
			viewmodels:[
				{
					isNotAutoAddline:false,
					delegateElement:"",/*like #id*/
					dataTable:"",
					delegateCls:[],
					type:[],
					callback:function(){}
				}
			]
		}
	});
	return view;
})