var ishttps = (window.location.href.indexOf("https://")==0)?true:false;
var originurl = window.ctx.portal;
if(ishttps){      
  window.ctx.portal = "https://"+originurl.split("://")[1];
}
else {     
  window.ctx.portal = "http://"+originurl.split("://")[1];
}

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
		uui:window.ctx.cdn+"/js/uui1.0.0/js/u.min",
		biz:window.ctx.cdn+"/js/uui1.0.0/js/u.biz.min",
		publicportal:window.ctx.portal+"/pubportal/pubportal",
		pubrequirement:window.ctx.portal+"/pubportal/pubrequirement",
		pubproduct:window.ctx.portal+"/pubportal/pubproduct",
		/*widgets*/
		slimscroll:window.ctx.cdn+"/js/plugins/slimscroll/jquery.slimscroll.min",
		pace:window.ctx.cdn+"/widgets/pace",
		store:window.ctx.cdn+"/js/plugins/store/store.min",	
		datepicker:window.ctx.cdn+"/js/plugins/datepicker/bootstrap-datepicker.min",
		swal:window.ctx.cdn+"/widgets/swal/swal",
		footable:window.ctx.cdn+"/js/plugins/footable/footable.all.min",
		jqautocomplete:window.ctx.cdn+"/js/plugins/autocomplete/jquery.autocomplete",
		tweenmax:window.ctx.cdn+"/js/plugins/tweenmax/tweenmax",
		bstreetable:window.ctx.cdn+"/js/plugins/bstreetable/bootstrap-treetable",
		codemirror:window.ctx.cdn+"/widgets/codemirror/codemirror",
		summernote:window.ctx.cdn+"/widgets/summernote/summernote",
		bstreeselect:window.ctx.cdn+"/js/plugins/bstreeselect/bootstrap-treeselect",
		validate:window.ctx.cdn+"/js/plugins/validate/jquery.validate.min",
		jqlazyload:window.ctx.cdn+"/js/plugins/lazyload/jquery.lazyload.min",
		breadcrumb:"js/widgets/breadcrumb/breadcrumb",
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
		validate:{
			deps:["jquery"]
		},
		jqlazyload:{
			deps:["jquery"]
		}
	},
	urlArgs:function(id,url){		
		if(url.indexOf(window.ctx.cdn)==-1){
			var args='v='+(new Date()).getTime();//'v=1.0' 上线前要改成对应的版本;
			return (url.indexOf('?')===-1?'?':'&')+'v=1.0.9';
		}
		else{
			return (url.indexOf('?')===-1?'?':'&')+'v=1.0.9';
		}		
	}
});
