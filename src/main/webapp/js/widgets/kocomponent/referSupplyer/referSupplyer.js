
/*
 * 用法说明
 * 1.html:
<refer-supplyer params="callbackDatas:callbackDatas"></refer-supplyer>
2:js  引入路径， referSupplyer;

callbackDatas：为自己定义的接受返回数据，如：
callbackDatas：function(data){
	data // 即为返回数据
	格式：[{"id":"200","name":"sxl_suplly_test005","supplyId":""}]
}

点击对账时调用：referSupplyer.localStorage_referSuppyer(callbackDatas)

*/

define(['knockout','jquery',  "common","text!js/widgets/kocomponent/referSupplyer/referSupplyer.tpl.html"],function(ko,$,Common,template){
	 var supplierrefer;
	 var referSupperUrl = window.ctx.portal+"/search/supplyDoc/searchByKeyWord?keyword=";
	 var self;
	//储存浏览记录
	var localStore_dataAttr = []; 
	var refsupply_totalNum =0;
 	var refsupply_currNum = 10;
	
	ko.components.register('refer-supplyer', {
 	/*供应商参照*/ 		
	    viewModel: function(params) {	
	    	
	    	self = this;
//	    	this.refSelected= ko.observable();
//	    	if(params.reftarget && params.reftarget == 'referSupplyer'){
//	    		debugger
//	    		 this.refSelected('referSupplyer')
//	    	}else if(params.reftarget && params.reftarget == 'referOrger'){
//	    		 this.refSelected('referOrger')
//	    	}
	    	//供应商数据：
	    	this.refsupplyVal= ko.observable();	//输入框值监控
	    	this.checkSuppyData = ko.observableArray();
	    	//已选供应商列表
	    	this.supplierrefers = ko.observableArray();
	    	this.selectedTotal =  ko.observable();
	    	this.showRefsupplymore = ko.observable(false);
	    	this.showRefInput = ko.observable(true);
	    	this.showRefList =  ko.observable(false);
	    	this.callbackDatas=function(){
				if(params.callbackDatas){
					params.callbackDatas();
				}
		 	 }.bind(this); //对初始数据的返回数据
	    	this.parentFocus =function(){
				this.showRefInput(true);
				return true;
			}.bind(this)
	    	this.refsupplyfocus = function(){
				this.showRefList(true);
			}.bind(this);
			//checkbox
			this.checkedRefn = function(index,data,ev){
				var ev = window.event || ev
				var select=true;
				var supplierRefattr =  this.supplierrefers()
                var chkbox = $('input.referSupply_checkbox').eq(index)[0];            
                if (chkbox.checked) {   
                	    if(supplierRefattr.length>0){
                	    	for(var i = 0; i<supplierRefattr.length; i++ ){
                	    		if(supplierRefattr[i].id == data.id){
                	    			 this.supplierrefers.remove(supplierRefattr[i]);   
                	    		}
                	    	}
                	    }         	               		
	                	this.selectedTotal(this.supplierrefers().length)
	                	if(this.supplierrefers().length == 0){
							$('.referSupply_list').removeClass('hideStatus');
							 this.showRefInput(true);
						}
                		
	                } else {               	
	                		 this.supplierrefers.push(data);
			                 this.selectedTotal(this.supplierrefers().length);
			                   if(this.supplierrefers().length == 0){
									$('.referSupply_list').removeClass('hideStatus');
									 this.showRefInput(true);
							    };
							
	                }
                params.callbackDatas(self.supplierrefers()) 
                return true;
			}.bind(this);
			//控制已选列表显示
			this.controlCss = function(){
				var supplyList = $('.referSupply_list')
				  if(supplyList.hasClass('hideStatus'))	{
				  	 $('.referSupply_list').removeClass('hideStatus')
				  	 this.showRefInput(true);
				  }else{
				  	 $('.referSupply_list').addClass('hideStatus')
				  	 this.showRefInput(false);
				  }
				  var e=event || window.event;
			        if (e && e.stopPropagation){
			            e.stopPropagation();    
			        }
			        else{
			            e.cancelBubble=true;
			     }
				return true;
			}.bind(this);
			//控制删除
			this.delRefsupplyList = function(data,event){
				var referId = data.id;
				this.supplierrefers.remove(function(iteam){
					return iteam.id  == referId;
				});
				$('input#'+referId).removeAttr('checked');
				this.selectedTotal(this.supplierrefers().length);
				if(this.supplierrefers().length == 0){
					$('.referSupply_list').removeClass('hideStatus');
					 this.showRefInput(true);
				}
				var e=event || window.event;
		        if (e && e.stopPropagation){
		            e.stopPropagation();    
		        }
		        else{
		            e.cancelBubble=true;
		        }
		        params.callbackDatas(self.supplierrefers()) 
			}.bind(this)
			//键盘输入搜索
	    	this.refsupplykeyup = function(o,e){
				if(e.keyCode==13){
					return true;
				}
				var keyword= $('#referSupplyer_serch').val();				 
				    keyword = $.trim(keyword)
				 if(keyword){				 	
				 	keyword = encodeURI(keyword);
				 	refsupply_currNum = 10;
				 	setTimeout(this.getrefSupplyData(keyword,10),300);
				 }else{
				 	this.checkSuppyData(localStore_dataAttr);
				 	var supplierRefersdata = this.supplierrefers()
							for(var key in localStore_dataAttr){
								for(k=0; k< supplierRefersdata.length; k++){
									if(supplierRefersdata[k].id == localStore_dataAttr[key].id){
										$('input#'+supplierRefersdata[k].id).attr('checked','checked');	
									}
							}
					}
				 }
				
			}.bind(this);
			
	    	//搜索服务
	    	this.getrefSupplyData = function(val,pagesize){
	    		self = this;
	    		this.checkSuppyData('');
	    		
				$.ajax({
					type: 'GET',
					dataType: 'json',
//					contentType: 'application/json',
					url:referSupperUrl+val+"&page=0&pagesize="+pagesize+"&id="+Common.userContext().enterpriseId,
					success: function (data) {
						if(data.success == true && data.result.total>0){
							self.checkSuppyData(data.result.data);
							refsupply_totalNum = data.result.total;
							if(refsupply_totalNum > 10){
								self.showRefsupplymore(true) 
							};					
							var supplierRefersdata = self.supplierrefers()
							for(var key in data.result.data){
								for(k=0; k< supplierRefersdata.length; k++){
									if(supplierRefersdata[k].id == data.result.data[key].id){
										$('input#'+supplierRefersdata[k].id).attr('checked','checked');	
									}
								}
							}										
						};
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						
					}
				});
	    	}.bind(this);
	    	
	    	
	    	/*供应商参照*/
	    	this.SupplyDataTable =  new $.DataTable({
	            params: {
	                "cls": "com.yonyou.yuncai.cpu.domain.dto.supplydocument.SupplyDocPOJO"
	            },
	            meta: {
	                'id': {},
	                'supplyId': {},
	                'name': {},
	                'code': {}                   
	            }
	       });
	    	this.showSupAction = function(){
	    		   self = this;
	                if (supplierrefer) {
	                    supplierrefer.destroy();
	                }  
	                var refersData =self.supplierrefers();
	                if(refersData.length > 0){
	                	self.SupplyDataTable.removeAllRows();
	                	for(var i =0; i<refersData.length; i++){
	                		var r = self.SupplyDataTable.createEmptyRow();
							r.setValue('id',refersData[i].id.toString());
							r.setValue('supplyId',refersData[i].supplyId.toString());
							r.setValue('name',refersData[i].name.toString());
							self.SupplyDataTable.setRowSelect(r)
	                	}
	                } 
	            	supplierrefer = $.refer({
	            		params:{'enterpriseId':Common.userContext().enterpriseId,'selectSupplyDatas':this.SupplyDataTable.getAllRows(),'supplyDataTable':this.SupplyDataTable},
						title:'请选择邀请的供应商',
						isPOPMode: true,
						contentId: 'supplyModalhead',
						width: '800px',
						pageUrl: 'js/widgets/refer/supplymulselect',
						onOk: function(data) {						
							 var supperArry = [];
							 var suppername = '';
							 self.supplierrefers('')
							 for(var i =0; i<data.length; i++){
							 	var obj = {};
							 	obj.id = data[i].data.id.value;
							 	obj.name = data[i].data.name.value;
							 	obj.supplyId = data[i].data.supplyId.value?data[i].data.supplyId.value :'' ;
							 	supperArry.push(obj);						 	
							 	suppername += data[i].data.name.value+',';
							 }
				
							self.supplierrefers(supperArry);	
							self.selectedTotal(self.supplierrefers().length);
							if(self.supplierrefers().length == 0){
								$('.referSupply_list').removeClass('hideStatus');
								 self.showRefInput(true);
							}
							params.callbackDatas(self.supplierrefers()) 
					  }
					})	
	    	}.bind(this);
	    	this.loadRefsupplymore =function(){
				var keyword= $('#referSupplyer_serch').val();
				if(refsupply_totalNum>refsupply_currNum){
		     		refsupply_currNum += 10;
		     		this.getrefSupplyData(keyword,refsupply_currNum)
		     		this.showRefsupplymore(true) 
		     	}else{
		     		this.showRefsupplymore(false) 
		     	}
				
			}.bind(this);
			
			
			
	    	//初始化数据
	    	this.init = function(){
	    		self= this;
	    		if(window.localStorage.getItem('localStore_refersupplyer')){
		    		var localStore_data;
					localStore_data = JSON.parse(window.localStorage.getItem('localStore_refersupplyer'));
					localStore_dataAttr = localStore_data;
					this.checkSuppyData(localStore_dataAttr)
				};
				$(document).mouseup(function(e){
			 	 var _con = $('#refsupplyer_model');   // 设置目标区域
				  if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1			  	
		  				self.showRefInput(false);
			  			self.showRefList(false);
			  			$('.referSupply_list').addClass('hideStatus');
			  			if(self.supplierrefers().length == 0){
							$('.referSupply_list').removeClass('hideStatus');
							 self.showRefInput(true);
						}
					  }
			 		}); 
	    	}.bind(this);
	    	this.init()
		},
		template:template
	});
	
	//储存浏览记录FN
	var referSupplyer = {
		localStorage_referSuppyer:function(storgData){
			if(storgData){
				$(storgData).each(function(index,val){
					localStore_dataAttr.push(val)
				})
				localStore_dataAttr = localStore_dataAttr.unique()
				if(localStore_dataAttr.length > 5){
					localStore_dataAttr = localStore_dataAttr.slice(-5)
				}	
				window.localStorage.setItem('localStore_refersupplyer',JSON.stringify(localStore_dataAttr))
				
			}
		}
	}
	return referSupplyer;
});