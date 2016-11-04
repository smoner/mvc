require(["jquery","common","knockout","pages/purchaserportal","director","bs","slimscroll","pace"],function($,Common,ko,purchaserportal){
   if(window.userCtx){
		Common.store.set("user",window.userCtx);
   }
   var router = Common.router();
   new purchaserportal();   
   window.Common = Common;
}); 