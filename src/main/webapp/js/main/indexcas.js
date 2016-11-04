require(["jquery","common","knockout","pages/portalcas","director","bs","slimscroll","pace"],function($,Common,ko,portalcas){
   if(window.userCtx){
		Common.store.set("user",window.userCtx);
   }
   var router = Common.router();
   new portalcas();   
   window.Common = Common;
}); 