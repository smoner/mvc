require(["jquery","common","knockout","director","bs","slimscroll","pace"],function($,Common,ko){
   if(window.userCtx){
	Common.store.set("user",window.userCtx);
   }
}); 
