/*
<file-up params="callBK:..."></daterange-picker>
*/
define(['knockout','jquery',  "common","text!js/widgets/kocomponent/fileupload/fileuploadImg.tpl.html","ajaxfileuploadamd"],function(ko,$,Common,template,interface_file){
	var newImgDatas ;
	var initImgDatas;
	var dataId; 
	var crossUrl = window.fileuploadurl;
	ko.components.register('fileupload-img', {
	    viewModel: function(params) {
	      initImgDatas = ko.observableArray([]);
	      dataId  = ko.observable('');
	      var self = this;
	      var fileInput = $('#uploadimg');
	      var crossUrl = window.fileuploadurl;
	      var f = new interface_file(); // 插件入口
	      //获取页面ID
	      var initID;     
	      if(params.id){
		  		initID = params.id;
		  	}
	      // 图片数据
	      this.newDatas = initImgDatas; // 新上传的 数据
	      
	      this.picStatus = ko.observable(false); //设为首图状态
	      newImgDatas = this.newDatas;
	      this.status = ko.observable();
	      if($('body').data('picStatus')){
	      	 self.picStatus(true)
	      };
	      
	      //数据储存
	      this.setDatas = function(data){
		  	self.newDatas.push(data);
		  }.bind(this)
		  
		 //查询图片
		  this.queryData = function(){
		  	var par ={
		  		cross_url:crossUrl,  
		  		filepath:initID(),
		  		groupname:''
		  	}
		  	f.filesystem_query(par,function(_data){
		  		if(_data.status == 1){
		  			for(var i =0 ; i <_data.data.length;i++){
		  				self.setDatas(_data.data[i])
		  			}		  			
		  		}		  		
		  	})
		  }.bind(this);
		
	      //直接上传新的图片
	       this.uploadpic = function (par){
	       	 
		  	if(params.init){
		  		par = params.init;
		  	}else{
		  	    par ={
					groupname : 'single',//【必填】
					filepath:initID()?initID() :"product"+new Date().getTime(),
					fileid : 'uploadimg',//【必填】input上传控件的id
					permission : 'read', //【 选填】私有private   read是可读 公有
					modular:'product',
					sysid :'商品',//【 选填】
					cross_url : crossUrl,  
					isreplace : false,
					url:true,  //是否返回附件的连接地址
				}
		  	};
			 var maxSize = 1024*1024*10 // 最大10M
			 var fileval= fileInput.val();
			 var filename = fileval.substring(fileval.lastIndexOf('.')+1).toLowerCase();
			 var fileSize = 0;
			   if (window.File && window.FileList) {
					   var files= fileInput[0].files, fs=files.length, s=0;
					   var fileName =''
						if(fs >10 ){
							Common.toastr().error("上传的文件数量超过10个了！请重新选择！","");
						    return
						}else{
						    for(var i=0;i<fs;i++){
						    	fileName = files[i].name.substring(files[i].name.lastIndexOf('.')+1).toLowerCase();						    	
						    	 if(filename !='jpg' && filename!='jpeg'&&filename !='png' && filename !='bmp' &&filename !='webp'){
						    	 	Common.toastr().error('对不起，你选择的 '+'"' +files[i].name +'"'+'图片格式错误\n图片格式应为 *jpg， *jpeg，* webp， *png，*bmp ',"");
								 	
								 	fileval='';
								 	return ;
								 }
						        if(files[i].size >maxSize){
						        	Common.toastr().error('"'+files[i].name + "这个文件大于10M！请重新选择！","");
						          
						            return 
						        }
						    }
						}
				}
			    else{
			    	Common.toastr().error('浏览器版本太低，请升级浏览器！');
				}
		  		 var f = new interface_file();				 
				  f.filesystem_ossupload(par,function(data){
				 	if(data.data&& data.data!=''){
				 		var mydata = data.data;					 	
					 	 var _id= mydata[0]['id'];
					 	 f.filesystem_geturl({ids:_id,cross_url:crossUrl},function(_data){					 	 	
					 		mydata[0]['url'] = _data.data[_id]
					 		self.setDatas(mydata[0]); 
					 	 })
			 		
					 	}else{
					 		Common.toastr().error('上传失败，请重新上传！');
					 		fileInput.val('');
					 }
				 	
				 });
		}.bind(this); 
	     //查看图片
		 this.downImg = function(data,event){
		 	var event= event || window.event;
		 	var target = event.target || event.srcElement;
		 	var imgurl = $(target).attr('src');
		 	if(imgurl || imgurl != ''){
		 		window.open(imgurl,"下载","");
		 	}else{
		 		Common.toastr().error('图片路径出错，无法查看！');
		 	}
		 }.bind(this); 
	     //删除操作
     	 this.delImgdata = function(data,event){
      	   var par = {
      	   	 cross_url:crossUrl,  
      	   	 id:data.id
      	   }
      	   f.filesystem_delete(par,function(bkdata){
      	   		if(bkdata.status == 1){
      	   			var index = self.newDatas.indexOf(data);
				  	if(index>-1){
				  		self.newDatas.splice(index, 1);
				  		fileInput.val('')
				  	}
      	   		}else{
      	   			Common.toastr().error('删除失败!');
      	   		}
      	   	 	
      	   })
      	   
      	}.bind(this);
	  
		//设为首图
		this.callbackFirstpic = function(){
	 		if(params.callbackFirstpic){
				params.callbackFirstpic();
			}
		 }.bind(this); 
		this.firstPic = function(data){
	    	  params.callbackFirstpic(data) 
		}.bind(this);
    },
	    template:template
	});
	
	  var FileupImg ={
	  	//查询方法
	  	querydata : function(paraid,tenant_id){
	  	    var tenantUrl = window.ctx.portal+'/enterprise/findById?id='+tenant_id;	
	  	    var par;
	  	//查询租户Id
		  	if(tenant_id){
	  			$.ajax({
			 		type : "GET",
			 		url : tenantUrl,
			 		dataType : "text",
			 		success : function(tiddata) {
			 			par ={
					  		cross_url:crossUrl,  
					  		filepath:paraid,
					  		groupname:'',
					  		tenant:tiddata,
					  	};
					   	queryImgData(par)
			 		},
			 		error:function(XMLHttpRequest, textStatus, errorThrown){
						
					}
			 	});
		  	}else{
		  		par ={
			  		cross_url:crossUrl,  
			  		filepath:paraid,
			  		groupname:'',
			  		tenant:'',
			  	};
			  	queryImgData(par)
		  	}
		 var queryImgData = function(par){
//			 dataId(paraid)
			 var f = new interface_file(); // 插件入口
			  	f.filesystem_query(par,function(_data){
			  		if(_data.status == 1){
			  			for(var i =0 ; i <_data.data.length;i++){
			  				initImgDatas.push(_data.data[i])
			  			}		  			
			  		}		  		
			  	})
			 };
		 },
		// 更新方法：
	  	updata:function(para){
	  		if(newImgDatas()!=''&&newImgDatas().length>0){	  			
	  			var path = crossUrl;
			  	  if(para.cross_url != undefined){
						path = para.cross_url;
				  };
				 var imgDatas = newImgDatas();
				 for(var i=0;i<imgDatas.length; i++){
					    var par = {
				    		cross_url: path,  
				    		id : imgDatas[i].id,
							filepath :para.filepath , 
							groupname :'single'  
				    	};
			    	 var f = new interface_file(); // 插件入口
				    f.filesystem_update(par,function(data){
			    		if(data.status ==1){
			    			console.log("save success!");
			    		}
			    	});
				 }		  	 	
	  		}
	  		
	  	}, 
	  }
	  return FileupImg
});