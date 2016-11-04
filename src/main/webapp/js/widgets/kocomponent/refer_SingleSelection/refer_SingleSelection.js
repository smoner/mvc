
/*
用于查询供应商数据
 * 用法说明
 * 1.html:
<refer-singleselection params="refid:supplyer,callbkdata:bkSupplyerdata,callbkfn:searchPage"></refer-singleselection>
2:js  引入路径， referSingle;

callbkdata：为自己定义的接受返回数据，如：
callbackDatas：function(data){
	data // 即为返回数据
	data 有objoct和string俩中，需要判断；
}

回调存储浏览记录：referSingle.localStorage_referSuppyer(datas)

*/

define(['knockout','jquery',  "common","text!js/widgets/kocomponent/refer_SingleSelection/refer_SingleSelection.tpl.html"],function(ko,$,Common,template){
	var referSupperUrl =  window.ctx.portal+"/search/supplyDoc/searchByKeyWord?keyword=";	
	var  requestNum = 0;
	//储存浏览记录
	var localStore_dataAttr = []; 
	var ref_totalNum =0;
 	var ref_currNum = 10;
 	var self;
	ko.components.register('refer-singleselection', {
	    viewModel: function(params) {		    	
		    self = this;
	        this.searchVal = ko.observable(''); //输入值
	        
	        this.callbkdata =  ko.observable('') // 返回的数据
	        this.navselectItem =  ko.observable(''); // 选中数据
	        this.searchshow = ko.observable(false);
		    //searchList数据：
		    this.searchList = ko.observableArray();
		    this.delBtnshow = ko.observable(false);
		    this.showRefmore = ko.observable(false);
		    this.callbkfn=function(){
		    	 params.callbkdata(self.callbkdata() != ''? self.callbkdata() : $('#choosedRefer').val());		        
				if(params.callbkfn){
					params.callbkfn();
				}
		 	}.bind(this);
  
		    this.restInput = function(){
		    	self.searchVal('');	
		    	$('#choosedRefer').val('')
		    	self.callbkdata('')
		    	$('#choosedRefer').focus()		    	
		    	self.getrefSearchData('',10);
		    	self.callbkfn()
		    }.bind(this)
	    	//搜索框聚焦
	    	this.referFocus = function(){
	    		self.searchshow(true);
	    		requestNum = 0;
	    		var inputVal = $('#choosedRefer').val();	    		
	    		    inputVal = $.trim(inputVal)
	    		if(inputVal !=''){
	    			self.delBtnshow(true)
	    		}else{
	    			self.delBtnshow(false)
	    		}
	    	}.bind(this);
	    	
			this.refBlur = function(){
//				setTimeout(function(){
//					self.searchshow(false);	
//					self.delBtnshow(false)
//				},300)
			}.bind(this)
			this.refKeyup = function(o,e){	
				if(e.keyCode==13){
						self.refBlur();
						$('#choosedRefer').blur();	
						if(self.callbkdata().name != $('#choosedRefer').val()){
							self.callbkdata('')
						}
						setTimeout(function(){
							self.searchshow(false);	
							self.delBtnshow(false)
						},300)
						self.callbkfn();
						return true;
				}else if(e.keyCode==40){
					//下				
					var data=self.navselectItem();
					var goods=self.searchList();
					var sindex=-1;
					$.each(goods,function(index,val){
						if(val==data){
							sindex=index;
						}
					})
					if(sindex<goods.length-1){
						sindex++;
					}else{
						sindex=0;
					}
					self.navselectItem(goods[sindex]);
					var name=goods[sindex];
					self.searchVal(name.name.replace(/<[^>]*>/g,''));
					self.callbkdata(name)
	
				}else if(e.keyCode==38){
					//上
					var data=self.navselectItem();
					var goods=self.searchList();
					var sindex=1;
					$.each(goods,function(index,val){
						if(val==data){
							sindex=index;
						}
					})
					if(sindex>0){
						sindex--;
					}else{
						sindex=goods.length-1;
					}
					self.navselectItem(goods[sindex]);
					var name=goods[sindex];
					self.searchVal(name.name.replace(/<[^>]*>/g,''));
					self.callbkdata(name)
				}else{
					var keyword= $('#choosedRefer').val();		 
					    keyword = $.trim(keyword);			 	
					 if(keyword){	
					 	var code = encodeURI(keyword);
					 	self.getrefSearchData(code,10)
					 	self.delBtnshow(true)
					 }else{
						 self.getrefSearchData('',10)
					 	self.searchList(localStore_dataAttr);
					 	self.delBtnshow(false)
					 }
				}
				self.searchshow(true);
			}.bind(this);;
			
			this.clicklist = function(iteam){
				requestNum =1;
				self.searchVal(iteam.name);
				self.callbkdata(iteam);
				self.callbkfn();
				setTimeout(function(){
					self.searchshow(false);	
					self.delBtnshow(false)
				},300)
				
			}.bind(this);
			
			this.clickReferModel = function(){
				if(params.refid == 'supplyer'){
						$.refer({
						params:{enterpriseId:Common.userContext().enterpriseId},
						title:'供应商选择',
						isPOPMode: true,
						contentId: 'supplyModal',
						width: '600px',
						pageUrl: 'js/widgets/refer/supplyselect',
						onOk: function(data) {
							requestNum =1;
							if(data && data.length >0){
								var bkdata = {}
								bkdata.name = data[0].data.name.value;
								bkdata.supplyId = data[0].data.supplyId.value;
								bkdata.id = data[0].data.id.value;
								bkdata.purchaseId = data[0].data.purchaseId.value;
								self.callbkdata(bkdata)
								$("#choosedRefer").val(data[0].data.name.value);
								self.callbkfn()
							}
							
						}
					})	
				}
				
			}.bind(this);
			
			this.getrefSearchData = function(val,pagesize){	
		    		self.searchList('');
		    		//供应商档案查询
			    	if(params.refid == 'supplyer'){
						$.ajax({
							type: 'GET',
							dataType: 'json',
							url:referSupperUrl+val+"&page=0&pagesize="+pagesize+"&id="+Common.userContext().enterpriseId,
							success: function (data) {
								if(data.success == true && data.result.total>0 ){
									self.searchList(data.result.data);	
									ref_totalNum = data.result.total;
									if(ref_totalNum > 10){
										self.showRefmore(true) 
									};	
								}
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								
							}
						});
					}	
		    }.bind(this);
			//加载更多
			this.loadRefmore =function(){
				var keyword= $('#choosedRefer').val();
				if(ref_totalNum>ref_currNum){
		     		ref_currNum += 10;
		     		self.getrefSearchData(keyword,ref_currNum)
		     		self.showRefmore(true) 
		     	}else{
		     		self.showRefmore(false) 
		     	}
				
			}.bind(this);
	    	//初始化数据
	    	this.init = function(){   			    		
				//初始化浏览记录
				
				if(window.localStorage.getItem('localStore_referSingle_supplyer')){
		    		var localStore_data;
					localStore_data = JSON.parse(window.localStorage.getItem('localStore_referSingle_supplyer'));
					localStore_dataAttr = localStore_data;
					self.searchList(localStore_dataAttr)
				};
				$('body').click(function(e){
				 	 var _con = $('#single-refer');   // 设置目标区域
					  if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1	
					  	     requestNum +=1;
					  	     if(requestNum == 1){
						  	     	if(self.callbkdata().name != $('#choosedRefer').val()){
											self.callbkdata('')
									}
			  						self.callbkfn()
			  				}
			  				setTimeout(function(){
								self.searchshow(false);	
								self.delBtnshow(false)
							},300)
			  				
			  				return false;
					}
			 	}); 	    		
	    	};
	    	self.init()
		},
		template:template
	});
	//储存浏览记录FN
	var referSingle = {
		localStorage_referSuppyer:function(storgData){
			if(storgData){
				var storgobj = {};
				    storgobj['name'] = storgData				
				localStore_dataAttr.unshift(storgobj)
				localStore_dataAttr = localStore_dataAttr.uniqueByname()
				if(localStore_dataAttr.length > 5){
					localStore_dataAttr = localStore_dataAttr.slice(0,5)
				}	
				window.localStorage.setItem('localStore_referSingle_supplyer',JSON.stringify(localStore_dataAttr))				
			}
		}
	}
	return referSingle;
});