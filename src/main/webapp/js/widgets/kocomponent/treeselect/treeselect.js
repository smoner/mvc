/*
How 2 use
see http://www.treejs.cn/v3/main.php to get setting event
<treeselect params="setting:setting"></treeselect>

define startDate and endDate with observable and queryAction for searchCB(searchcallback)

*/
define(['knockout','jquery',"ztree"],function(ko,$){
	ko.components.register('treeselect', {
	    viewModel: function(params) {
	        $.fn.zTree.init($("#ztree"),params.setting);
	    },
	    template:
	        '<div id="ztree" class="ztree"></div>'
	});
});