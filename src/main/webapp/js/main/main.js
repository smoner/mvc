var ishttps = (window.location.href.indexOf("https://")==0)?true:false;
var originurl = window.ctx.portal;
var fileorginurl = window.fileuploadurl;
if(ishttps){      
  window.ctx.portal = "https://"+originurl.split("://")[1];
  if(fileorginurl&&fileorginurl.indexOf('http')>=0){
  	 window.fileuploadurl = "https://"+fileorginurl.split("://")[1];
  }
 
}
else {     
  window.ctx.portal = "http://"+originurl.split("://")[1];
  if(fileorginurl&&fileorginurl.indexOf('http')>=0){
  	window.fileuploadurl = "http://"+fileorginurl.split("://")[1];
  }
}
/*window.ctx = {};
window.ctx.cdn = "http://10.10.2.32:9091/cdn/";
window.ctx.privilege = "http://localhost:8081/cpu";
window.ctx.cdn = "http://localhost:81/cdn";*/

require.config({
	baseUrl: "./",
	paths: {
		text: window.ctx.cdn+"/js/requirejs/text",
		css: window.ctx.cdn+"/js/requirejs/css",
		jquery: window.ctx.cdn+"/js/jquery-2.1.1",
		knockout: window.ctx.cdn+"/js/knockout/knockout-3.4.0.min",		
		director:window.ctx.cdn+"/js/director/director",
		bs:window.ctx.cdn+"/js/bootstrap.min",
		underscore:window.ctx.cdn+"/js/underscore/underscore.min",
		core:window.ctx.cdn+"/js/core/core",
		baseview:window.ctx.cdn+"/js/core/baseview",
		common:window.ctx.portal+"/js/core/common",
		icheck:window.ctx.cdn+"/widgets/icheck/icheck",
		toastr:window.ctx.cdn+"/js/plugins/toastr/toastr.min",
		metismenu:window.ctx.cdn+"/js/plugins/metisMenu/jquery.metisMenu",	
		uui:window.ctx.cdn+"/js/uui1.0.0/js/u.min",
		biz:window.ctx.cdn+"/js/uui1.0.0/js/u.biz",
		publicportal:window.ctx.portal+"/pages/publicportal",
		pubrequirement:window.ctx.portal+"/pubportal/pubrequirement",
		pubproduct:window.ctx.portal+"/pubportal/pubproduct",
		/*widgets*/
		headnav:window.ctx.cdn+"/widgets/headnav/headnav",
		sidenav:window.ctx.cdn+"/widgets/sidenav/sidenav",
		slimscroll:window.ctx.cdn+"/js/plugins/slimscroll/jquery.slimscroll.min",
		pace:window.ctx.cdn+"/widgets/pace",
		store:window.ctx.cdn+"/js/plugins/store/store.min",				
		table:window.ctx.cdn+"/widgets/datatable/table/table",
		datatables:window.ctx.cdn+"/js/plugins/dataTables/jquery.dataTables",
		datatable_bs:window.ctx.cdn+"/js/plugins/dataTables/dataTables.bootstrap",
		datatable_res:window.ctx.cdn+"/js/plugins/dataTables/dataTables.responsive",
		datatable_tools:window.ctx.cdn+"/js/plugins/dataTables/dataTables.tableTools.min",
		datepicker:window.ctx.cdn+"/js/plugins/datepicker/bootstrap-datepicker",
		swal:window.ctx.cdn+"/widgets/swal/swal",
		nestable:window.ctx.cdn+"/js/plugins/nestable/jquery.nestable",
		echarts:window.ctx.cdn+"/js/plugins/echart/3.1.7/echarts.min",
		footable:window.ctx.cdn+"/js/plugins/footable/footable.all.min",
		jqautocomplete:window.ctx.cdn+"/js/plugins/autocomplete/jquery.autocomplete",
		tweenmax:window.ctx.cdn+"/js/plugins/tweenmax/tweenmax",
		bstreetable:window.ctx.cdn+"/js/plugins/bstreetable/bootstrap-treetable",
		codemirror:window.ctx.cdn+"/widgets/codemirror/codemirror",
		summernote:window.ctx.cdn+"/widgets/summernote/summernote",
		bstreeselect:window.ctx.cdn+"/js/plugins/bstreeselect/bootstrap-treeselect",
		ajaxfileupload:window.ctx.cdn+"/js/plugins/ajaxfileupload/ajaxfileupload",
		validate:window.ctx.cdn+"/js/plugins/validate/jquery.validate.min",
		jqlazyload:window.ctx.cdn+"/js/plugins/lazyload/jquery.lazyload.min",
		dropzone:"js/widgets/dropimgzone/dropzone",
		PopUp:"js/widgets/dropimgzone/Popup",
		Tags:"js/widgets/dropimgzone/tags",
		ajaxfileupload:"js/widgets/ajaxfileupload/ajaxfileupload",
		jqueryfileupload:"js/widgets/ajaxfileupload/jquery.fileupload",
		jqueryuiwidget:"js/widgets/ajaxfileupload/jquery.ui.widget",
		jqzoom:window.ctx.cdn+"/widgets/jqzoom/jqzoom",
		parsley:window.ctx.cdn+"/widgets/parsley/parsley",
		areaselect:window.ctx.cdn+"/js/plugins/jquery.areaselect/jquery-areaselect.min",
		uuid:"js/widgets/ajaxfileupload/uuid",
		breadcrumb:"js/widgets/breadcrumb/breadcrumb",
		ossupload:"js/widgets/ajaxfileupload/ossupload",
		interfile:"js/widgets/ajaxfileupload/interface.file",
		interfileimpl:"js/widgets/ajaxfileupload/interface.file.impl",
		ajaxfileuploadamd:"js/widgets/ajaxfileupload/ajaxfileuploadamd",
		sockjs:"js/vendor/eventbus/sockjs-min.0.3.4",
		eventbus:"js/vendor/eventbus/vertx-eventbus",
		layui:"js/vendor/layui/layui",
		webim:"js/widgets/webim/webim",
		ztree:"//cdn.bootcss.com/zTree.v3/3.5.24/js/jquery.ztree.all.min",
		alertDialog:"js/widgets/alertDialog/src/dialog",
	},
	shim: {
		alertDialog:{
			deps: ["jquery"]
		},
		icheck:{
			deps: ["jquery"]
		},
		bs:{
			deps:["jquery"]
		},
		toastr:{
			deps:["jquery"]
		},
		metismenu:{
			deps:["jquery"]
		},
		slimscroll:{
			deps:["jquery"]
		},
		datatable:{
			deps:["jquery"]
		},
		datepicker:{
			deps:["jquery"]
		},
		nestable:{
			deps:["jquery"]
		},
		footable:{
			deps:["jquery"]
		},
		jqautocomplete:{
			deps:["jquery"]
		},
		codemirror:{
			deps:["jquery"]
		},
		summernote:{
			deps:["jquery"]
		},
		bstreeselect:{
			deps:["jquery"]
		},
		ajaxfileupload:{
			deps:["jquery"]
		},
		validate:{
			deps:["jquery"]
		},
		jqlazyload:{
			deps:["jquery"]
		},
		jqzoom:{
			deps:["jquery"]
		},
		areaselect:{
			deps:["jquery"]
		},
		jqueryfileupload:{
			deps:["jquery"]
		},
		jqueryuiwidget:{
			deps:["jquery"]
		},
		ztree:{
			deps:["jquery"]
		}
	},
	urlArgs:function(id,url){		
		if(url.indexOf(window.ctx.cdn)==-1){
			var args='v='+(new Date()).getTime();//'v=1.0' 上线前要改成对应的版本;
			return (url.indexOf('?')===-1?'?':'&')+'v=1.0.16';
		}
		else{
			return (url.indexOf('?')===-1?'?':'&')+'v=1.0.16';
		}		
	}
});
