/*
<file-up params="callBK:..."></daterange-picker>
*/
define(['knockout','jquery','common',"text!js/widgets/kocomponent/fileUp/fileUpload.tpl.html", "ajaxfileupload","ajaxfileuploadamd"],function(ko,$,Common,template,ajaxfileupload,interface_file){
	ko.components.register('file-upload', {	  
	    viewModel: function(params) {
	      var self = this;
	      var fileInput = $('#upload');
	      var crossUrl = window.fileuploadurl;
	      // 图片数据
	      this.newDatas = ko.observableArray([]); // 新上传的 数据
	      this.oldDatas = ko.observableArray([]); // 初始数据操作
	      this.initDatas= ko.observableArray([]); //初始数据
	      this.picStatus = ko.observable(false); //设为首图状态
	      this.status = ko.observable();
	      if($('body').data('picStatus')){
	      	self.picStatus(true)
	      };
	       if(params.datas){
	      	 self.initDatas=params.datas;
	      	}
	      this.backDatas=ko.computed(function(){
	      	var arr =this.initDatas().concat(this.newDatas());	      	
		   	return arr;
			 },this)
		 this.ableBtn = ko.observable(false);
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
		 this.callbackFirstpic = function(){
	 		if(params.callbackFirstpic){
				params.callbackFirstpic();
			}
		 }.bind(this); 
		 //查看图片
		 this.downImg = function(data,event){
		 	var event= event || window.event;
		 	var target = event.target || event.srcElement;
		 	var imgurl = $(target).attr('src');
		 	if(imgurl || imgurl != ''){
		 		window.open(imgurl,"下载","");
		 	}else{
		 		Common.toastr().error("图片路径出错，无法查看！","");
		 		
		 	}
		 }.bind(this);
		  //删除已经上传数据：
		  this.delOldImg = function(data,event){
		  		var ev = ev||event;
		  		var target = ev.target || ev.srcElement;
		  		var index = self.initDatas.indexOf(data);
			  	if(index>-1){
			  		data['status'] =1;
					$(target).parents('li').hide()			  		
			  		params.callbackDatas(self.backDatas());
			  		fileInput.val('')
			  	}
		  }.bind(this);
		  //删除新上传数据
		  this.delNewImg = function( data,event){
		  	var index = self.newDatas.indexOf(data);
		  	if(index>-1){
		  		self.newDatas.splice(index, 1);
		  		params.callbackDatas(self.backDatas());
		  		fileInput.val('')
		  	}
		  }.bind(this);
		  //load
		  this.uploadpic = function (par){
		  	if(params.init){
		  		par = params.init;
		  	}else{
		  	    par ={
					groupname : 'single',//【必填】
					filepath:"product"+new Date().getTime(),
					fileid : 'upload',//【必填】input上传控件的id
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
					 		Common.toastr().error('上传失败，请重新上传！');
					 		fileInput.val('');
					 }
				 	
				 });
			}.bind(this); 
			//设为首图
			this.firstPic = function(data){
		    	  params.callbackFirstpic(data) 
			}.bind(this);
	    },
	    template:template
	});
});