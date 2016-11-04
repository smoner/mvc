require(["jquery","common","knockout","publicportal","director","bs","slimscroll","pace",],function($,Common,ko,publicportal){
   if(window.userCtx){
   		//console.log("set user");
		Common.store.set("user",window.userCtx);
   }
   else{
   		//console.log("remove user");
   		Common.store.remove("user");
   }
   //$("#wechatlogin").on("click",function(){
   		$.get("/gwmanage/login/wechat/code",{"appcode":"cpu"},function(result){
	      if(result.status===1){
	          var obj = new WxLogin({
	              id:"container", 
	              appid: result.data.appid, 
	              scope: "snsapi_login", 
	              redirect_uri: result.data.url,
	              state: "",
	              style: "",
	              href: ""
	          });
	      }else{
	          $("#error").html(result.msg);
	      }
	  	})
   //})
   $("#btn-login").hover(function(){
   		$("#wechatlogindialog").show('slow');
   })
   $("#closelogin").on("click",function(){
   		$("#wechatlogindialog").hide();
   });
   $("body").on("click",function(){
   		$("#wechatlogindialog").hide();
   })
   new publicportal();
}); 