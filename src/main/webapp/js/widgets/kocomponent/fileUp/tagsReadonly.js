/*
<file-up params="callBK:..."></daterange-picker>
*/
define(['knockout','jquery','common',"text!js/widgets/kocomponent/fileUp/attachReadonly.tpl.html", "ajaxfileupload","ajaxfileuploadamd"],function(ko,$,Common,template,ajaxfileupload,interface_file){
	ko.components.register('tags-readonly', {	  
	    viewModel: function(params) {
	      var self = this;
	      var fileInput = $('#tagsfile');
	      var crossUrl = window.fileuploadurl;
	      // 图片数据
	      this.initDatas= ko.observableArray([]); //初始数据  
	      if(params.datas){
	      	 self.initDatas=params.datas;
	      }
		  //下载	 
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
		     	debugger
		 		if(_data.status == 1){
		 			var url =  _data.data[_id];
		 			if(url.startWith("http")){
	     			window.open(url,"下载","");
		     		}else{
		     			window.open("//"+url,"下载","");
		     		}
		 		}else{
		 			  Common.toastr().error('文件下载出错！',"");
		 		}
		 	 })
		}.bind(this); 
	    
	    },
	    template:template
	});
});