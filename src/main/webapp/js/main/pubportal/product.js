require(["jquery","common","knockout","pubproduct","director","bs","slimscroll","pace",],function($,Common,ko,pubproduct){
   if(window.userCtx){
		Common.store.set("user",window.userCtx);
   }
   new pubproduct();
  
}); 