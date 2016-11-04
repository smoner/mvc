/*
<file-up params="callBK:..."></daterange-picker>
*/
define(['knockout','jquery',"text!js/widgets/kocomponent/fileUp/fileup.tpl.html", "ajaxfileupload","interfile","interfileimpl","ossupload"],function(ko,$,template,ajaxfileupload,interfile,interfileimpl,ossupload){
	ko.components.register('file-up', {	  
	    viewModel: function(params) {
	      var self = this;
	      // 图片数据
		  this.datas = params.datas;
		  //获取数据
		  this.setDatas = function(data){
		  	self.datas.push(data);
		  }.bind(this)
		  //callBack
		  this.callback=function(){
				if(params.callback){
					params.callback();
				}
			}.bind(this);
		  this.modular = ko.observable('product');
		  this.sysid=  ko.observable('商品');
		    //删除
		  this.delImg = function( data,event){
		  	var index = self.datas.indexOf(data);
		  	if(index>-1){
		  		self.datas.splice(index, 1);
		  		params.callback(self.datas());
		  	}
		  }.bind(this);
		  //load
		  this.uploadpic = function (){	
		  	 var fileInput = $('#upload');
			 var par ={
						groupname : 'single',//【必填】
						filepath:"product"+new Date().getTime(),
						fileid : 'file',//【必填】input上传控件的id
						permission : 'read', //【 选填】私有private   read是可读 公有
						modular:self.modular(),
						sysid :self.sysid(),//【 选填】
						cross_url : window.fileuploadurl+"/file/",  
						isreplace : false,
						url:true,  //是否返回附件的连接地址
				}
			 if(fileInput.val()){
		  		 var f = new interface_file();
//		  		 var data = {
//				            "filename":"hivho9mt/91cc94ef-1bb6-4d5e-8156-1b0a24826ce8_1.jpg",
//				            "filepath":"product1470294810705",
//				            "id":"lJ4ryzxxenjmI5ad1dA",
//				            "filesize":"33931",
//				            "groupname":"single",
//				            "url":"http://oss-yc-dev.img-cn-beijing.aliyuncs.com/publictenant/38ba0d89-bdd9-4300-a1ee-2034b01e45a7_test071401.jpg@80w"
//				      }
// 					self.setDatas(data) 
// 					params.callback(self.datas());
				 f.filesystem_ossupload(par,function(data){
					 self.setDatas(data) 
					params.callback(self.datas);
				 });
	  		 }			
			}.bind(this); 

	    },
	    template:template
	});
});