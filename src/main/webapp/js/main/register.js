require(["jquery","knockout","bs","icheck"],function($,ko){
    /*init i-checks*/
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });  
    var path = "pages/account/register";
    var module =path;
	requirejs.undef(module);

	require([module], function(module) {
		if(module == undefined ){			
			 return ;
		}
		
		ko.cleanNode($('body'));
		var viewmodel = new module.viewmodel();
		ko.applyBindings(viewmodel,$('body')[0]);
	})
}); 