require(["jquery","knockout","pages/account/logon","bs"],function($,ko,logon){    
    var viewmodel = new logon.viewModel();
    ko.applyBindings(viewmodel,$('body')[0]);
}); 