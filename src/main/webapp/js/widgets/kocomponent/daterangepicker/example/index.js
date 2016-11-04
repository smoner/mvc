/**
 * Created by windknow on 16/7/8.
 */
//var viewmodel ={
//    startDate:ko.observable(""),
//    endDate:ko.observable("")
//};
//ko.applyBindings(viewmodel);

ko.components.register('daterange-picker', {
    viewModel: function(params) {
        // Data: value is either null, 'like', or 'dislike'
        this.startDate = ko.observable("");
        this.endDate = ko.observable("");
        this.showText = ko.observable(params.showText||"请选择时间");
        this.errortext= ko.observable("");
        this.dractive=ko.observable(false);
        this.drselect=function(){
            console.log("clickme ");
            this.dractive(true);
        }
        this.nolimit=function(){
            this.showText("不限");
            this.dractive(false);
        }.bind(this);
        this.thisweek=function(){
            this.showText("本周");
            params.startDate(dateutils.getWeekStartDate());
            params.endDate(dateutils.getWeekEndDate());
            this.dractive(false);
        }.bind(this);
        this.thismonth=function(){
            this.showText("本月");
            params.startDate(dateutils.getMonthStartDate());
            params.endDate(dateutils.getMonthEndDate());
            this.dractive(false);
        }.bind(this);
        this.thisquarter=function(){
            this.showText("本季度");
            params.startDate(dateutils.getQuarterStartDate());
            params.endDate(dateutils.getQuarterEndDate());
            this.dractive(false);
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
                params.startDate(this.startDate());
                params.endDate(this.endDate())
                this.showText(this.startDate()+"~"+this.endDate());
                this.dractive(false);
            }

        }.bind(this);
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
        '<div class="dr-picker" data-bind="css:{\'dr-active\':dractive()}">\
            <input type="text" class="form-control" data-bind="{value:showText,click:drselect}"><i class="fa fa-arrow-up"></i>\
            <div class="dr-picker-ctn">\
                <ul>\
                    <li data-bind="click:nolimit">不限</li>\
                    <li data-bind="click:thisweek">本周</li>\
                    <li data-bind="click:thismonth">本月</li>\
                    <li data-bind="click:thisquarter">本季度</li>\
                </ul>\
                <input type="date" class="form-control" placeholder="开始时间" data-bind="value:startDate"/>\
                <input type="date" class="form-control" placeholder="截止时间" data-bind="value:endDate"/>\
                <button class="btn btn-primary" data-bind="click:ok">确定</button>\
                <span class="text-error" data-bind="text:errortext"></span>\
            </div>\
         </div>',

});
var viewmodel={
    startDate:ko.observable(""),
    endDate:ko.observable("")
}

ko.applyBindings(viewmodel,document.getElementById("app"));
