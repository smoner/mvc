/*
<file-up params="callBK:..."></daterange-picker>
*/
define(['knockout','common','jquery',"text!js/widgets/kocomponent/fileUp/attachfileup.tpl.html", "ajaxfileupload","ajaxfileuploadamd"],function(ko,Common,$,template,ajaxfileupload,interface_file){
	ko.components.register('tags-fileup', {	  
	    viewModel: function(params) {
	      var self = this;
	      var fileInput = $('#tagsfile');
	      var crossUrl = window.fileuploadurl;
	      // 图片数据
	      this.newDatas = ko.observableArray([]); // 新上传的 数据
	      this.oldDatas = ko.observableArray([]); // 初始数据操作
	      this.initDatas= ko.observableArray([]); //初始数据  
	      this.status = ko.observable();
	      this.readStatus = ko.observable(true);
	      if(params.datas){
	      	 self.initDatas=params.datas;
	      	}
	      if(params.readnly && params.readnly == true){
	      	 self.readStatus(false)
	      }
	      this.backDatas=ko.computed(function(){
	      	var arr =this.initDatas().concat(this.newDatas());	      	
		   	return arr;
			 },this)
		  //获取数据
		  this.setDatas = function(data){
		  	self.newDatas.push(data);
		  }.bind(this)
		  //callBack
		  this.callbackDatas=function(){
				if(params.callbackDatas){
					params.callbackDatas();
				}
		  }.bind(this); //对初始数据的返回数据
		
		  //删除已经上传数据：
		  this.delOldtags = function(data,event){
		  		var ev = ev||event;
		  		var target = ev.target || ev.srcElement;
		  		var index = self.initDatas.indexOf(data);
			  	if(index>-1){
			  		data['status'] =1;
					$(target).parents('.tagdiv').hide()			  		
			  		params.callbackDatas(self.backDatas());
			  		fileInput.val('')
			  	}
		  }.bind(this);
		  //删除新上传数据
		  this.delNewtags = function( data,event){
		  	var index = self.newDatas.indexOf(data);
		  	if(index>-1){
		  		self.newDatas.splice(index, 1);
		  		params.callbackDatas(self.backDatas());
		  		fileInput.val('')
		  	}
		  }.bind(this);
		  //load
		  this.uploadpic = function (row,event){
		  	var par = '';
		  	if(params.init){
		  		par = params.init;
		  	}else{
		  	    par ={
					groupname : 'single',//【必填】
					filepath:"product"+new Date().getTime(),
					fileid : 'tagsfile',//【必填】input上传控件的id
					permission : 'private', //【 选填】私有private   read是可读 公有
					modular:'product',
					sysid :'商品',//【 选填】
					cross_url : crossUrl,  
					isreplace : false,
					url:true,  //是否返回附件的连接地址
				}
		  	};
			 var event = event || window.event
			 var target = event.target || event.srcElement;
			 var maxSize = 1024*1024*20 // 最大20M
			 var fileval= $(target).val();
			 var filename = fileval.substring(fileval.lastIndexOf('.')+1).toLowerCase();
			  if (window.File && window.FileList) {
					   var files= target.files, fs=files.length, s=0;
					   var fileName =''
						if(fs >10 ){
		
						    Common.toastr().error("上传的文件数量超过10个了！请重新选择！","");
						    return
						}else{
						    for(var i=0;i<fs;i++){
						        if(files[i].size >maxSize){
						        	  Common.toastr().error('"'+files[i].name + "这个文件大于20M！请重新选择！","");
						            return 
						        }
						    }
						}
				}
			    else{
			    	  Common.toastr().error('浏览器版本太低，请升级浏览器！',"");
				} 
		  	 var f = new interface_file();
				 f.filesystem_ossupload(par,function(data){
				 	if(data.data&& data.data!=''){
				 		var mydata = data.data;
					 	var length = data.data.length;
					 	//for(var i =0; i<length; i++){
					 	 mydata[0]['status'] = 2;
					 	 var _id= mydata[0]['id'];
					 	 f.filesystem_geturl({ids:_id,cross_url:crossUrl},function(_data){
					 	 	mydata[0]['fileid'] = _id ;
					 	 	mydata[0]['id'] = null; 
					 		mydata[0]['url'] = _data.data[_id]
					 		self.setDatas(mydata[0]); 
					 		params.callbackDatas(self.backDatas());
				 			
					 	 })
			 		
					 	}else{
					 	  Common.toastr().error('上传失败，请重新上传！',"");
					 }
				 });
	
			}.bind(this); 
	    // 下载
	     this.downtags = function (data,event){
	     	String.prototype.startWith=function(s){
			  if(s==null||s==""||this.length==0||s.length>this.length)
			   return false;
			  if(this.substr(0,s.length)==s)
			     return true;
			  else
			     return false;
			  return true;
			 };
	     	var _id= data.fileid;
	     	 var f = new interface_file();
		     f.filesystem_geturl({ids:_id,cross_url:crossUrl},function(_data){

		 		if(_data.status == 1){
		 			var url =  _data.data[_id];
		 			if(url){
		 				if(url.startWith("http")){
		     			window.open(url,"下载","");
			     		}else{
			     			window.open("//"+url,"下载","");
			     		}
			 		}else{
			 			  Common.toastr().error('文件下载出错！',"");
			 		}
		 			}
		 			
		 		
		 		
	 			
		 	 })


		}.bind(this); 
	    
	    },
	    template:template
	});
});