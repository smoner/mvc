require(["jquery","common","knockout","bs"],function($,Common,ko){
	var cururl = window.location.href.split('#/')[1];
	Common.router(); 
	window.router.initPage(cururl);
}); 