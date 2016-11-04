require([
	"jquery","common","knockout","bs",
	'pubportal/main/topnav/topnav',
	'pubportal/main/mainnav/mainnav',
	'pubportal/main/banner/banner',
	'pubportal/main/footer/footer'],function($,Common,ko,bs,Topnav,Mainnav,Banner,Footer){
	new Topnav({el:$("#topnav")});
	new Mainnav({el:$("#mainnav"),activeindex:2});
	new Banner({el:$("#banner")});
	new Footer({el:$("#footer")});
	var cururl = window.location.href.split('#/')[1];
	Common.router(); 
	window.router.initPage(cururl);
}); 