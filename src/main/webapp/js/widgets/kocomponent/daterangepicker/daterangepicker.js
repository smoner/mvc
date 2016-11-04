/*
How 2 use

<daterange-picker params="startDate:startDate,endDate:endDate,showText:'到期时间',searchCB:queryAction"></daterange-picker>

define startDate and endDate with observable and queryAction for searchCB(searchcallback)

*/
define(['knockout','jquery',"datepicker"],function(ko,$){
	ko.components.register('daterange-picker', {
	    viewModel: function(params) {
	        // Data: value is either null, 'like', or 'dislike'
	        this.startDate = ko.observable("");
	        this.endDate = ko.observable("");
	        //this.actualShowText = ko.observable(params.showText||"请选择时间");
	        this.errortext= ko.observable("");
	        this.dractive=ko.observable(false);
	        this.status=ko.observable(0);
	        this.drselect=function(){
	            this.dractive(true);
	        }
	        //全部 0，本周 1 ，本月 2，本季度 3
	        this.nolimit=function(){
	        	this.startDate("");
	        	this.endDate("");
	            this.status(0);            
	            this.dractive(false);	
	            this.searchCB();           
	        }.bind(this);
	        //本周
	        this.thisweek=function(){	        	
	            this.status(1);
	            this.dractive(false);
	            this.searchCB();
	        }.bind(this);
	        //本月
	        this.thismonth=function(){	        	
	            this.status(2);
	            this.dractive(false);
	            this.searchCB();
	        }.bind(this);
	        //本季度
	        this.thisquarter=function(){	        	
	            this.status(3);
	            this.dractive(false);
	            this.searchCB();
	        }.bind(this);
	        this.ok= function () {
	            if(this.startDate()==""&&this.endDate()==""){
	                this.errortext("请选择时间!");
	            }
	            else if(this.startDate()>this.endDate()){
	                this.errortext("开始时间不能晚于截止时间")
	            }
	            else{
	                this.errortext("");	                           
	                this.dractive(false);
	            }
	        }.bind(this);	
	        //点击日期
	        this.pickerclick = function(){
	        	this.status(4);	        	
	        	this.dractive(true);
	        }.bind(this);
	        this.actualShowText = ko.pureComputed(function() {
	        	var start,end="";	        	
	        	var resultText="";
	        	switch(this.status()){
	        		case 0:
	        			params.startDate("");
	           			params.endDate("");
	           			resultText=params.showText||"全部";
	           			break;
	           		case 1:
	           			resultText="本周";
	           			start = dateutils.getWeekStartDate();
	           			end = dateutils.getWeekEndDate();	            		
	            		break;
	           		case 2:
	           			resultText="本月";
	            		start=dateutils.getMonthStartDate();
	            		end=dateutils.getMonthEndDate();
	            		break;
	            	case 3:
	            		resultText="本季度";
			            start=dateutils.getQuarterStartDate();
			            end=dateutils.getQuarterEndDate();
			            break;
			        case 4:
			        	start=this.startDate();
	                	end=this.endDate();
	                	resultText="从 "+(start||"")+" 到 "+(end||"");
			        default:;
	        	}
	        	//回写实际值	        	
        		this.startDate(start);
        		this.endDate(end);
	        	return resultText;
		    }, this);
			this.searchCB=function(){
				params.startDate(this.startDate());
        		params.endDate(this.endDate());
				if(params.searchCB){
					params.searchCB();
				}
			}.bind(this);
			//绑定日期控件
	        $('.dr-picker .input-group.date').datepicker({autoclose: true,language:"zh"});
	        //绑定鼠标点击事件，点击空白处时收起弹出框
	        $("body").on("click",function(event){
	        	var element = $(event.target);

	        	if(!(element.parents(".dr-picker").length>0||element.parents(".datepicker-days").length>0||element.hasClass("day"))){
	        		this.dractive(false);	        		
	        	}
	        	else if(element.hasClass("day")){
        			this.searchCB();
        		}
	        	
	        }.bind(this));
	        //通用参数
	        var now = new Date();                    //当前日期
	        var nowDayOfWeek =now.getDay();         //今天本周的第几天
	        var nowDay =now.getDate();              //当前日
	        var nowMonth = now.getMonth();           //当前月
	        var nowYear = now.getYear();             //当前年
	        nowYear += (nowYear < 2000) ? 1900 : 0;  //
	        var dateutils = {
	            //获得本周的开始日期
	            getWeekStartDate:function() {
	                var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	                return this.formatDate(weekStartDate);
	            },
	            //获得本周的结束日期
	            getWeekEndDate:function() {
	                var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
	                return this.formatDate(weekEndDate);
	            },
	            //日期格式化
	            formatDate:function (date) {
	                var myyear = date.getFullYear();
	                var mymonth = date.getMonth()+1;
	                var myweekday = date.getDate();

	                if(mymonth < 10){
	                    mymonth = "0" + mymonth;
	                }
	                if(myweekday < 10){
	                    myweekday = "0" + myweekday;
	                }
	                return (myyear+"-"+mymonth + "-" + myweekday);
	            },
	            //获得某月的天数
	            getMonthDays:function(myMonth){
	                var monthStartDate = new Date(nowYear, myMonth, 1);
	                var monthEndDate = new Date(nowYear, myMonth + 1, 1);
	                var   days   =   (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);
	                return   days;
	            },

	            //获得本季度的开始月份
	            getQuarterStartMonth:function(){
	                var quarterStartMonth = 0;
	                if(nowMonth<3){
	                    quarterStartMonth = 0;
	                }
	                if(2<nowMonth && nowMonth<6){
	                    quarterStartMonth = 3;
	                }
	                if(5<nowMonth && nowMonth<9){
	                    quarterStartMonth = 6;
	                }
	                if(nowMonth>8){
	                    quarterStartMonth = 9;
	                }
	                return quarterStartMonth;
	            },
	            //获得本月的开始日期
	            getMonthStartDate:function(){
	                var monthStartDate = new Date(nowYear, nowMonth, 1);
	                return this.formatDate(monthStartDate);
	            },
	            //获得本月的结束日期
	            getMonthEndDate:function (){
	                var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowMonth));
	                return this.formatDate(monthEndDate);
	            },
	            //获得本季度的开始日期
	            getQuarterStartDate:function(){
	                var quarterStartDate = new Date(nowYear, this.getQuarterStartMonth(), 1);
	                return this.formatDate(quarterStartDate);
	            },
	            //或的本季度的结束日期
	            getQuarterEndDate:function (){
	                var quarterEndMonth = this.getQuarterStartMonth() + 2;
	                var quarterStartDate = new Date(nowYear, quarterEndMonth, this.getMonthDays(quarterEndMonth));
	                return this.formatDate(quarterStartDate);
	            }
	        }
	    },
	    template:
	        '<div class="dr-picker" data-bind="{css:{\'dr-active\':dractive()}}">\
	            <input type="text" class="form-control" data-bind="{value:actualShowText,click:drselect}"><i class="fa fa-angle-down"></i>\
	            <div class="dr-picker-ctn">\
	                <ul>\
	                    <li data-bind="click:nolimit">全部</li>\
	                    <li data-bind="click:thisweek">本周</li>\
	                    <li data-bind="click:thismonth">本月</li>\
	                    <li data-bind="click:thisquarter">本季度</li>\
	                </ul>\
	                <div class="input-group date m-b-sm">\
	                	<input type="text" class="form-control" data-bind="{value:startDate,click:pickerclick}" placeholder="开始时间"/>\
                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>\
                    </div>\
                    <div class="input-group date m-b-sm">\
	                	<input type="text" class="form-control" placeholder="截止时间" data-bind="{value:endDate,click:pickerclick}"/>\
                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>\
                    </div>\
                    <button class="btn btn-primary pull-right" style="display:none" data-bind="click:ok">确定</button>\
	                <span class="text-error" data-bind="text:errortext"></span>\
	            </div>\
	         </div>'

	});
});