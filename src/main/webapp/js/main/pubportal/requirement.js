require(["jquery","common","knockout","pubrequirement","director","bs","slimscroll","pace",],function($,Common,ko,pubrequirement){
   if(window.userCtx){
		Common.store.set("user",window.userCtx);
   }
   new pubrequirement();
}); 