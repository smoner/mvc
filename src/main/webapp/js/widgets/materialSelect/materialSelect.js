/**
 *
 * @description 企业信息查询页面
 * @author songhlc
 * @date 2016-01-18
 * 
 */

define([
	"jquery",
	"baseview",
	"text!js/widgets/materialSelect/materialSelect.tpl.html",
	"common",
	"knockout",
	"nestable"],function(
	$,
	BaseView,
	template,
	Common,
	ko,
	Nestable
	){
	var self;
	var view = BaseView.extend({
		setTemplate:function(){
			self = this;
			$("#mclsModal").remove();
			$("body").append(template);
		},
		fireEvents:function(){
			this.enterpriseId = Common.userContext().enterpriseId;
			this.loadMaterialClassDataTable(this.enterpriseId);	        
		},
		loadMaterialDataTable:function(enterpriseId,materialclasId){
			self.app.serverEvent().addDataTable("materialDataTable").addParameter("enterpriseid",enterpriseId).addParameter("classId",materialclasId).fire({
	            url: window.ctx.portal+"/evt/dispatch",
	           	ctrl:"portal.MaterialController",
	            method:"findAll",
	            success: function (data) {
	            }
	        });
		},
		/*查询物料分类*/
		loadMaterialClassDataTable:function(enterpriseId){
			/*查询树形结构*/
			self.app.serverEvent().addDataTable("materialClassDataTable").addParameter("enterpriseId",enterpriseId).fire({
	            url: window.ctx.portal+"/evt/dispatch",
	           	ctrl:"portal.MaterialClassController",
	            method:"findAllAsTree",
	            success: function (data) {
	            	$("#nestablemcls").nestable({
		                 group: 1
		            }).on("clicked",function(context,el){
		            	var mclsid = $(el).attr("data-id");
		            	self.loadMaterialDataTable(this.enterpriseId,mclsid)
		            });	
	            }
	        });
		},
		viewmodel:{
			el:"#mclsModal",
			materialClassDataTable: new $.DataTable({
	            params: {
	                "cls": "com.yonyou.cpu.domain.dto.MaterialClass"
	            },
	            meta:{
					'id':{},
					'children':[],
					'code':{},
					'className':{},
					'parentid':{}
				}
			}),
			materialDataTable: new $.DataTable({
				params: {
	                "cls": "com.yonyou.cpu.domain.dto.Material"
	            },
	            meta:{
					'id':{},					
					'code':{},
					'name':{}
				}
			})
		},
		events:{			
		},
		bindEvents:function(){			
			$('#mclsModal').modal('hide')		
		}
		
	});
	return view;
})