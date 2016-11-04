/**
JSDoc使用规范
1.注释以/ **开头，以* /结束
2.关键字以@开头
@param  @argument 指定参数名和说明来描述一个函数参数 
@returns         描述函数的返回值 
@author          指示代码的作者 
@deprecated    指示一个函数已经废弃，而且在将来的代码版本中将彻底删除。要避免使用这段代码 
@see               创建一个HTML链接，指向指定类的描述 
@version         指定发布版本 
@requires        创建一个HTML链接，指向这个类所需的指定类 
@throws @exception   描述函数可能抛出的异常的类型 
{@link}           创建一个HTML链接，指向指定的类。这与@see很类似，但{@link}能嵌在注释文本中 
@fileoverview   这是一个特殊的标记。如果在文件的第一个文档块中使用这个标记，则指定该文档块的余下部分将用来提供这个文件的概述 
@class            提供类的有关信息，用在构造函数的文档中 
@constructor   明确一个函数是某个类的构造函数 
@type            指定函数的返回类型 
@extends       指示一个类派生了另一个类。JSDoc通常自己就可以检测出这种信息，不过，在某些情况下则必须使用这个标记 
@private         指示一个类或函数是私有的。私有类和函数不会出现在HTML文档中，除非运行JSDoc时提供了--private命令行选项 
@final             指示一个值是常量值。要记住JavaScript无法真正保证一个值是常量 
@ignore         JSDoc忽略有这个标记的函数
*/

/**
 * 通用工具类
 * 
 * @author songhlc
 * @version v1.0.0
 * @return common
 */
define([
	"jquery","underscore","toastr","director","store","knockout","datepicker","swal","uui","breadcrumb","alertDialog"
	],function(
		$,
		_,
		toastr,
		director,
		store,
		ko,
		Datepicker,
		Swal,UUI,Breadcrumb,dialog
	){
	/**
	 * *************************************Common
	 * API***********************************
	 */
	var common =  {
		ajax:"",// 统一封装ajax请求
		router:"",// 路由组件，根据director来实现
		store:"",// localstorage组件
		toastr:"",// toastr组件，toast组件，浮动提示框(success/info/warning/error)//使用方式common.toastr().error("title","content");
		swal:"",// sweetalert组件，弹出提示同window alert confirm这些弹出框
		renderColumn:"",// 结合datable组件一些通用的前台render，如isactive 1：启用，0：停用
		Enum:"",// 通用的枚举类common.Enum.PORTALTYPE.PURCHASE
				// 表示采购商工作台页面，common.Enum.PORTALTYPE.SUPPLY表示供应商工作台页面，common.Enum.PORTALTYPE.ADMIN表示管理员页面
		toolTip:"",// 用于绑定页面上的toolTip，调用common.toolTip();即可
		userContext:"",// 返回用户上下文
		forbidRepeatCommit:"",// 阻止重复提交，暂时通过设置200ms的演示
		getRequest:"",// var request = common.getRequest();request["name"]
		dateSection:"",// 返回通用日期区间，可指定定位，默认当前日期基准，未来三天，本周，本月。返回字符串，YYYY_MM_DD
		serverEventAdaptor:"",// 公共fire逻辑封装，目前支持按钮可用性设值，默认选择器值js-btn-enable，支持自定义
		breadcrumb:"",//公共面包屑导航，Common.Breadcrumb("path");,如果参数为空会取当前hash值，如果传入参数为空，则根据当前路由获取
		alertDialog:"" //弹出对话框组件，弹出提示同window alert confirm这些弹出框
	};
	/** **********************************初始化预加载函数********************************** */
	(function(){
		//防止ie没有console.log报错
		if(window.console){

		}else{
			window.console = {};
			window.console.log = function(){

			}
			window.console.info = function(){

			}
			window.console.error = function(){

			}
		}

		// 默认context
		// window.ctx = "/cpu";
		/**
		 * **************** Minimalize menu when screen is less than
		 * 768px*******
		 */
		// 移动隐藏左侧导航栏
		function resizewindow(){
			if ($(this).width() < 769) {
		        $('body').addClass('body-small')
		    } else {
		        $('body').removeClass('body-small')
		    }
		}
		resizewindow();
		/**
		 * **************** Minimalize menu when screen is less than
		 * 768px*******
		 */
		$(window).unbind("resize").bind("resize", function () {
		    resizewindow();
		});

		/** ******************日期格式化支持************************* */
		Date.prototype.Format = function (fmt) { // author: meizz
		    var o = {
		        "M+": this.getMonth() + 1, // 月份
		        "d+": this.getDate(), // 日
		        "h+": this.getHours(), // 小时
		        "m+": this.getMinutes(), // 分
		        "s+": this.getSeconds(), // 秒
		        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		        "S": this.getMilliseconds() // 毫秒
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		}
		/** ********初始化datepicker********* */
		$.fn.datepicker.dates['zh'] = {
		    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		    daysShort: ["日", "一", "二", "三", "四", "五", "六"],
		    daysMin: ["日", "一", "二", "三", "四", "五", "六"],
		    months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
		    monthsShort:  ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		    today: "今日",
		    clear: "清除",
		    format: "yyyy-MM-dd",
		    titleFormat: "yyyy MM", /* Leverages same syntax as 'format' */
		    weekStart: 0
		};
		/* 重写datagrid默认的 $.showMessageDialog */
		 $.showMessageDialog = function(op){
			 if(op.msg){
				 // alert(op.msg);
				 initToastr().error(op.msg);
			 }
			 
		 }
	})();	
	/**
	 * *************************************Common API
	 * 初始化***********************************
	 */
	/**
	 * toastr组件，toast组件，浮动提示框
	 * 
	 * @see http://codeseven.github.io/toastr/demo.html
	 * @param options
	 * @argument "closeButton": true, "debug": false, "progressBar": true,
	 *           "preventDuplicates": false, "positionClass":
	 *           "toast-top-center", "onclick": null, "showDuration": "400",
	 *           "hideDuration": "1000", "timeOut": "3000", "extendedTimeOut":
	 *           "1000", "showEasing": "swing", "hideEasing": "linear",
	 *           "showMethod": "fadeIn", "hideMethod": "fadeOut"
	 * @return function toastr()
	 */
	common.toastr = initToastr;
	/**
	 * router组件，用于控制页面的路由，基于director实现
	 * 
	 * @see https://github.com/flatiron/director
	 * @api register to window.router.addRouter(path.function);
	 */
	common.router = initRouter;
	/**
	 * 本地loaclstorage存储
	 */
	common.store = store;

	/**
	 * 统一封装ajax请求
	 */
	common.ajax = initAjax;


	/**
	 * 统一封装sweatAlert
	 * 
	 * @use common.swal("title","subtitle","success/error")
	 */
	common.swal = Swal;

	
	/**
	 * 统一封装 grid column的自定义render
	 * 
	 * @use common.renderColumn.renderIsActive 1显示为启用 0显示为停用
	 *      common.renderColumn.renderOperate 渲染操作页面
	 * 
	 */
	common.renderColumn = initRenderColumn();

	
	/**
	 * 通用枚举类
	 * 
	 * @use common.Enum.PORTALTYPE.PURCHASE 表示采购商工作台页面，
	 *      common.Enum.PORTALTYPE.SUPPLY表示供应商工作台页面
	 *      common.Enum.PORTALTYPE.ADMIN表示管理员页面
	 */
	common.Enum = {};
	common.Enum.PORTALTYPE = {
			PURCHASE:"purchase",
			SUPPLY:"supply",
			ADMIN:"admin",
			PURCHASEADMIN:"purchaseadmin",
			SUPPLYADMIN:"supplyadmin",
			ALL:"all"
	}
	/**
	 * 销售订单状态枚举类
	 * @see com.yonyou.cpu.domain.saleorder.SaleOrderSplitEnum
	 * @use 
	 *	NORELEASEERPBILLCOUNT("1", "未发布到ERP"),
	    RELEASEERPBILLCOUNT("2", "待买方确认"),                  // 已发布到ERP
	    PURCONFIRMINGCOUNT("3", "买方变更中"),                   // 采购商确认中
	    FIRSTPURCONFIRMEDCOUNT("12", "待卖方确认"),              // 待卖方确认(首次确认生成订单)
	    PURCONFIRMEDCOUNT("4", "买方已变更"),                    // 待卖方确认
	    SUPPLYCONFIRMINGCOUNT("5","卖方变更中"),                 // 供应商确认中
	    SUPPLYCANCELCOUNT("13", "卖方取消变更"),                 // 卖方取消变更
	    SUPPLYCONFIRMEDCOUNT("6", "卖方已变更"),                 // 卖方已变更
	    SUPPLYACCEPTCOUNT("7", "卖方已接受"),                    // 卖方已接受
	    SUPPLYREFUSECOUNT("8", "卖方已拒绝"),                    // 卖方已拒绝
	    PURAPPROVINGCOUNT("9", "买方审批中"),                    // 买方审批中
	    PURAPPROVEDCOUNT("10", "买方已审批"),                    // 订单已确认
	    FIRSTPURAPPROVEDCOUNT("14", "买方已审批"),               // 买方直接审批 第一次生成销售订单
	    ORDERSIGNEDCOUNT("11", "已签收"),                        // 已签收
	    DELIVERYING("15","发货中"),                              // 发货状态
	    DELIVERYED("16","已发货"),                               // 发货状态
	    SUPPLYCONFIREMISTORE("17","销售订单表体执行情况跟踪"),   // 销售订单表体执行情况跟踪
	    OBSOLETECOUNT("18", "已废弃");  
	 */
	common.Enum.SALEORDER={
		NoPublish2ERP:"1",
		Publish2ERP:"2",
		PurComfirming:"3",
		PurConfirmed:"4",
		FirstPurComfirmed:"12",
		SupConfirming:"5",
		SupCancel:"13",
		SupConfirmed:"6",
		SupAccept:"7",
		SupRefuse:"8",
		PurApproving:"9",
		PurApproved:"10",
		FirstPurApproved:"14",
		Signed:"11",
		Delivering:"15",
		Delivered:"16",
		SupConfirmStore:"17",
		Obsolete:"18"		
	}
	/**
	 * 绑定toolTip方法
	 * 
	 * @use common.toolTip(this.el);
	 */
	common.toolTip =initTooltip;
	/**
	 * 从用户上下文里获取user信息
	 * 
	 * @user common.userContext();
	 */
	common.userContext = initUserContext;

	/**
	 * 获取当前url的参数
	 * 
	 * @user common.userContext();
	 */
	common.getRequest = initRequest;
	
	/**
	 * 获取日期区间函数，指定基准日期，以及区间量。返回字符串日期，格式YYYY-MM-DD
	 * 
	 * @use common.dateSection(-Date- d,-final String- section);
	 */
	common.dateSection=getDateSection;
	common.dateSection.getCalcuDay=getNewDay;// 日期，以及叠加天数，获得叠加后的时间
	common.dateSection.THREE_DAYS="three_d";
	common.dateSection.THUS_WEEK="thus_w";
	common.dateSection.THUS_MONTH="thus_m";

	common.serverEventAdaptor = serverEventAdaptor;		
	common.breadcrumb=Breadcrumb.BreadcrumbNavigator;//公共面包屑导航，Common.Breadcrumb("path");,如果参数为空会取当前hash值，如果传入参数为空，则根据当前路由获取
	common.alertDialog = dialog
	/** *************************************具体组件实现***************************************** */
	
	/* iweb后台交互adaptor */
    function serverEventAdaptor(serverEvent,btncls){
	    return new ServerEventAdaptor(serverEvent,btncls);
	}
	
	var ServerEventAdaptor = function(serverEvent,btncls){
		this.serverEvent = serverEvent;
		this.btncls = btncls||'.js-btn-enable';
	}
	
	ServerEventAdaptor.fn = ServerEventAdaptor.prototype;

	ServerEventAdaptor.fn.addDataTable = function(datatable){
		this.serverEvent.addDataTable(datatable);
		return this;
	}
	
	ServerEventAdaptor.fn.addDataTable = function(dataTableId, rule){
		this.serverEvent.addDataTable(dataTableId,rule);
		return this;
	}
	
	ServerEventAdaptor.fn.addParameter = function(key,value){
		this.serverEvent.addParameter(key,value);
		return this;
	}

	ServerEventAdaptor.fn.fire = function(p){
	    $(this.btncls).attr("disabled",true);
	    var self = this;
	    var orig_sc = p.success;
	    p.success = function(data,state,xhr){
	       $(self.btncls).removeAttr("disabled");
	       if(orig_sc!=undefined){
	    	   orig_sc(data,state,xhr);
	       }
	    }
	    var orig_er = p.error;
	    p.error = function(data,state,xhr){
	       $(self.btncls).removeAttr("disabled");
	       var msg = "";
	       debugger;
	       try{
	       	 msg = data["message"];
	       }catch(e){

	       }
	       try{
	       	 msg = data["_message"];
	       }catch(e){
	       	 
	       }

	       if ($.showMessageDialog)
				$.showMessageDialog({type:"info",title:"提示",msg: msg,backdrop:true});
		   else
				alert(data["message"])		   
	       if(orig_er!=undefined){
	           orig_er(data,state,xhr);
	       }       
	    } 
		this.serverEvent.fire(p);
	}
	//数组去重byid
	Array.prototype.unique = function(){
	 var res = [this[0]];
	 for(var i = 1; i < this.length; i++){
	  var repeat = false;
	  for(var j = 0; j < res.length; j++){
	   if(this[i].id == res[j].id){
	    repeat = true;
	    break;
	   }
	  }
	  if(!repeat){
	   res.push(this[i]);
	  }
	 }
	 return res;
}
	//数组去重byname
	Array.prototype.uniqueByname = function(){
	 var res = [this[0]];
	 for(var i = 1; i < this.length; i++){
	  var repeat = false;
	  for(var j = 0; j < res.length; j++){
	   if(this[i].name == res[j].name){
	    repeat = true;
	    break;
	   }
	  }
	  if(!repeat){
	   res.push(this[i]);
	  }
	 }
	 return res;
}	
	
	/* 获取日期区间 */
	function getDateSection(baseDate,section){
		if(baseDate==undefined||baseDate==null){
			baseDate=new Date();
		}
		var begind,endd;
		if(section=='three_d'){
    		endd=getNewDay(baseDate,0);
    		begind=getNewDay(baseDate,-3);
    	}
    	else if(section=='thus_w'){
    		var week=baseDate.getDay();
    		begind=getNewDay(baseDate,-week+1);
    		endd=getNewDay(baseDate,7-week);
    	}
    	else if(section=='thus_m'){
    		var begin=baseDate;
    		var next=new Date();
    		var month=begin.getMonth();
    		var year=begin.getFullYear();
    		begin.setDate(1);
    		next.setYear(year);
    		next.setMonth(month+1);
    		next.setDate(0);
    		begind=getNewDay(begin,0);
    		endd=getNewDay(next,0);
    	}
		
		return{
			begin:begind,
			end:endd
		}
	}
	
	function getNewDay(dateTemp, days){
//		var today=dateTemp.toLocaleDateString();
//		var dateTemp = today.split("-");  
//	    var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); // 转换为MM-DD-YYYY格式
	    var nDate = new Date(dateTemp).getTime(); //获取总毫秒数
	    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
	    var rDate = new Date(millSeconds);  
	    var year = rDate.getFullYear();  
	    var month = rDate.getMonth() + 1;  
	    if (month < 10) month = "0" + month;  
	    var date = rDate.getDate();  
	    if (date < 10) date = "0" + date;  
	    return (year + "-" + month + "-" + date); 
	}

	function initRequest(){
		var url = window.location.href.split("?");
		if(url.length>1){
			var theRequest = new Object();
			var strs = url[1].split('&');
			for(var i=0;i<strs.length;i++){
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
			}
			return theRequest;
		}
		else{ 
			return null;
		}
	}

	
	
	/* 用户上下文方法 */
	function initUserContext(){
		var user = store.get("user");
		if(user){
			return user.user;
		}
		else{
			return null;
		}
		
		
	}
	
	/* toolTip实现 */
	function initTooltip(element){
		if(element){
			$(element).find('[data-toggle="tooltip"]').tooltip();
		}
		else{
			$('body [data-toggle="tooltip"]').tooltip();
		}
	}
	
	/* toastr组件 */
	function initToastr(options){
		toastr.options = {
			  "closeButton": true,
			  "debug": false,
			  "progressBar": true,
			  "preventDuplicates": false,
			  "positionClass": "toast-top-center",
			  "onclick": null,
			  "showDuration": "400",
			  "hideDuration": "1000",
			  "timeOut": "3000",
			  "extendedTimeOut": "1000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
		}
		toastr.options = $.extend(toastr.options,options||{});
		return toastr;
	}
	/* 路由组件 */
	function initRouter(){
		// 初始化路由
		var routes = {
			"/login":{on:function(){initPage("/login");}},
			"/register":{on:function(){initPage("/register")}}
		};
		window.router = Router(routes);
		window.router.init();
		// 加载路由对应的页面
		function initPage(path,id){
			//console.log("route to "+path);
			var module = path.split("?")[0];
			// add by songhlc 如果没有二级菜单，则需要选中二级菜单
			var _menus = $("#side-menu").find("li");
			var _params = "";
			if(id&&id[0])
				_params = "/"+id[0];
			
			var _curmenus =_menus.find("a[href='#/"+path+_params+"']");
			// 如果当前路由存在相应的菜单则修改菜单激活状态
			if(_curmenus.length>0){
				
				_menus.removeClass("active");
				if(_curmenus.parent().parent().hasClass("nav-second-level")){
					_curmenus.parent().parent().parent().addClass("active");
				}
				_curmenus.parent().addClass("active");
				module = window.ctx[_curmenus.attr("data-target")]+"/"+module+".js";
			}
			
			requirejs.undef(module);
			$('#popup-content').html('');
			require([module], function(module) {
				if(module == undefined ){
					//console.log('会话可能过期，请重新登录!!');
					return ;
				}				
				var el_content = $('#wrapper-content');	
				ko.cleanNode($('#wrapper-content')[0]);
				var viewmodel = new module({el:el_content});
				// 页面切换动画效果
				el_content.removeClass("animated fadeInRight").addClass("animated fadeInRight");
				if(!viewmodel.iskobinded){
					// ko.applyBindings(viewmodel, $('#wrapper-content')[0]);
				}
				// 保证下次再访问时还有动画效果
				setTimeout(function(){
					el_content.removeClass("animated fadeInRight");
				},1000);
				
			})
		}
		// 添加路由的方法
		var addRouter = function(path, callback,ignorePageInit) {
			/* 路由以#/开头，后面才是实际的路径 */
			var truePath = path.substring(2,path.length);
			var func = function() {
				var params = arguments;
				var _realpath="";
				// 是否忽略页面初始化（纯路由事件响应下）
				if(!ignorePageInit){
					if(params.length>0){
						var _realpatharray = truePath.split('/:');
						_realpath = _realpatharray[0];					
						initPage(_realpath,params);
					}
					else{
						initPage(truePath,params);
					}
				}							
				if(callback){
					callback(params);
				}
				else{
					$("body").data("default-type",params[0]);
				}
			}
			var tmparray = truePath.split("/");		
			// 如果路由已经存在，默认pages路由只存在三级（根据项目实际的文件结构）
			if(tmparray[0] in router.routes && tmparray[1] in router.routes[tmparray[0]] && tmparray[2] in router.routes[tmparray[0]][tmparray[1]]){				
				return;
			}else{
				router.on(truePath, func);
			}
		}
		// 开放路由接口
		window.router.addRouter = addRouter;
		window.router.initPage = initPage;
		return window.router;
	}
	/**
	 * 初始化所有ajax请求
	 */
	function initAjax(options){
		// 统一交互格式
		options.contentType=options.contentType?options.contentType:"application/json";
		options.dataType=options.dataType?options.dataType:"json";
		options.url = window.ctx + options.url;
		options.beforeSend = function(){
			
		};
		options.error = function(XMLHttpRequest, textStatus, errorThrown){
			//console.log("ajax request error");
		}
		$.ajax(options);
	}
	/**
	 * 初始化datatable
	 */
	function initRenderColumn(){
		var renderCtx = {renderIsActive:"",renderResourceType:"",renderSex:""};
		/* 启用停用显示 */
		renderCtx.renderIsActive =  function(params){
			params.element.innerHTML = "停用";
			/* 默认1表示启用，0表示停用 */
			if(params.value!=0&&params.value!="0"){
				params.element.innerHTML = "启用";
			}						
		}
		renderCtx.renderIsPublished =  function(params){
			params.element.innerHTML = "未发布";
			/* 默认1表示已发布，0表示未发布 */
			if(params.value!=0&&params.value!="0"){
				params.element.innerHTML = "已发布";
			}						
		}
		/* 资源类型：1表示菜单，2表示页面，3表示按钮，4表示功能模块 */
		renderCtx.renderResourceType = function(params){
			var displayvalue = "";
			switch(params.value){
				case "1":displayvalue="菜单";break;
				case "2":displayvalue="页面";break;
				case "3":displayvalue="按钮";break;
				case "4":displayvalue="功能模块";break;
				defualt:displayvalue="未知";break;
			}
			params.element.innerHTML = displayvalue;
		}
		/* 性别：1男，0女 */
		renderCtx.renderSex = function(){
			params.element.innerHTML = "女";
			if(params.value){
				params.element.innerHTML = "男";
			}
		}
		/* 用来渲染多个操作按钮 */
		renderCtx.renderOperate = function(params,operateList){
			// define item
			// attr{{type:"link",href:"",style:"",title:"",iconCls:"fa-add"};}
			// a 链接 图标+tooltip
			// <a href="" class="btn-group" data-toggle="tooltip"
			// data-placement="right" data-original-title="删除">
			// <button class="btn btn-sm btn-danger m-t-xs"><i class="fa
			// fa-trash"></i></button></a>
			// </a>
			var _defaultoption = {type:"link",href:"#",style:"",placement:"right",title:"",iconCls:"fa-add",text:""};
			if(operateList){
				var operateHtml = $("<div></div>");
				/* 循环输出所有操作按钮 */
				for(var i=0;i<operateList.length;i++){
					// 合并默认配置
					var cur = $.extend(_defaultoption,operateList[i]);
					// 链接类型 初始化如链接类型的按钮组，如：<a href="" class="btn-group"
					// data-toggle="tooltip" data-placement="right"
					// data-original-title="删除"><button class="btn btn-sm
					// btn-danger m-t-xs"><i class="fa
					// fa-trash"></i></button></a></a>
					if(cur.type=="link"){						
						$("<a></a>").addClass("btn-group m-l-sm")
							.attr({"href":cur.href})
							.attr({"data-toggle":"tooltip","data-placement":cur.placement,"data-original-title":cur.title, "title":cur.title})
							.html($("<button></button>").addClass("btn"+cur.style)
									.html($("<i></i>").addClass("fa "+cur.iconCls)).append(cur.text)
							).appendTo(operateHtml);
					}
					else if(cur.type=="click"){
						$("<a></a>").addClass("btn-group m-l-sm").attr({"data-toggle":"tooltip","data-placement":cur.placement,"data-original-title":cur.title})
						.html($("<button></button>")						
						.addClass("btn"+cur.style).html($("<i></i>").addClass("fa "+cur.iconCls))
						.attr("data-bind",cur["data-bind"]))
						.appendTo(operateHtml);
					}
				}
				params.element.innerHTML = operateHtml.html();
			}
			else{
				//console.log("渲染操作数据不能为空")
				params.element.innerHTML = "";
			}
		}
		return renderCtx;
	}
	
	return common;

});
