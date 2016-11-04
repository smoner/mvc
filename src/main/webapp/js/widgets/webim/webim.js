define(["jquery", "vertx-eventbus", "common", "layui"], function($, EventBus, Common) {
    // roleCode
    // 采购(purchase)
    // 销售(sales)
    // 客服(support)
    // 售后(after-sales)
    var defaultOption = {
        target: "self", //self 当前窗口展开对话框 blank 新窗口展开对话框
        token: '7QzisxtYOW_dabMAN4N1tSplnHwpCdxjYQEBpWEjs4k=',
        roleCode: "purchase", //我的角色 required
        userCode: "", //对方用户中心usercode
        tenantId: "", //对方的租户id 
        enterpriseId: "" // tenantId和enterpriseId 二者有一必输入
    }
    var webim = {
        init: function(option) {
            this.option = $.extend(defaultOption, option);
            if (!this.option.tenantId) {
                //根据enterpriseid 获取tenantId
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    url: "webim/getTenantId",
                    data: { enterpriseId: this.option.enterpriseId },
                    success: function(data) {
                        if (data && data.status == 1) {
                            this.option.tenantId = data.data
                            this.initGatewayUrl();
                        } else {
                            Common.toastr().error(data.msg, "查询租户信息失败");
                        }
                    }.bind(this),
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        Common.toastr().error(textStatus, "查询租户信息失败!");
                    }
                });
            } else {
                this.initGatewayUrl();
            }
        },
        initGatewayUrl: function() {
            //网关对应的服务
            var gatewayUrl = '/gwmanage/mygwapp/im/user/chat?tenantId=' + this.option.tenantId + '&usercode=' + this.option.userCode +'&roleCode=' + this.option.roleCode + '&type_src=' + this.option.type_src + '&type_des=' + this.option.type_des;
            $.ajax({
                type: 'GET',
                dataType: 'json',
                async: false,
                url: gatewayUrl,
                data: {}, //,location:"Boston"
                success: function(data) {
                    if (data && data.status && data.status == 1) {
                        var touserid = data.data;
                        parent.layIM.chatbyuser(touserid);
                        return;
                    } else {
                        Common.toastr().error(data.msg, "暂不支持此功能！");
                    }
                }.bind(this),
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    Common.toastr().error(textStatus, "暂不支持此功能！");
                }
            });
        },
        initLayIm: function(codeurl) {

            var layIM;
            var userid = codeurl.split('userid=')[1].split('&')[0];
            if (codeurl.indexOf('touserid=') > -1) {
                this.option.touserid = codeurl.split('touserid=')[1].split('&')[0];
            }
            var urlprefix = codeurl.split('/index.html')[0];
            var eb = new EventBus(urlprefix + "/eventbus/");
            var token = this.option.token;
            var touserid = this.option.touserid;
            if (touserid) {
                parent.layIM.chatbyuser(touserid);
                return;
            }

            layui.config({
                    dir: "./js/vendor/layui/"
                })
                //如果使用原生WebSocket，可以不用加载socket模块
            layui.use('layim', function(layim) {
                layIM = layim;

                layer = layui.layer,
                    laytpl = layui.laytpl,
                    laypage = layui.laypage,

                    //基础配置
                    layim.config({
                        token: token,
                        //默认打开联系人
                        touserid: touserid,
                        //默认服务地址
                        baseurl: urlprefix,
                        //初始化接口
                        init: {
                            url: urlprefix + '/im/init?token=' + token + '&id=' + userid,
                            data: {}
                        }
                        //简约模式（不显示主面板）
                        //,brief: true
                        //查看群员接口
                        ,
                        members: {
                            url: urlprefix + '/im/groupmembers?token=' + token,
                            data: {}
                        },
                        uploadImage: {
                            url: urlprefix + '/im/uploadimg?token=' + token //（返回的数据格式见下文）
                                ,
                            type: 'post' //默认post
                        },
                        uploadFile: {
                            url: urlprefix + '/im/uploadfile?token=' + token //（返回的数据格式见下文）
                                ,
                            type: 'post' //默认post
                        }
                        //,skin: ['http://cdn.firstlinkapp.com/upload/2016_4/1461747766565_14690.jpg'] //皮肤
                        //,isgroup: false //是否开启群组
                        ,
                        chatLog: urlprefix + '/im/chatlog.html?token=' + token + '&id=' + userid + '&chatid=' //聊天记录地址
                            ,
                        find: '/find' //查找好友或者群的地址
                            //,copyright: false //是否授权
                    });
                //监听发送消息
                layim.on('sendMessage', function(data) {
                    var To = data.to;
                    //console.log(data);
                    if (eb.state != EventBus.OPEN) {
                        console.trace();
                        layer.alert("您已掉线，刷新页面尝试重新连接！");
                        return false;
                    }
                    //发送消息倒Socket服务
                    eb.send("messagecenter.msg.receive", data);
                    return true;
                });
                //监听在线状态的切换事件
                layim.on('online', function(status) {
                    var data = {
                        status: status,
                        id: userid
                    };
                    //console.log(data);
                    eb.send("usercenter.userstate.change", data);
                });
                //layim建立就绪
                layim.on('ready', function(res) {
                    var data = {
                        state: "online",
                        userid: userid
                    }
                    eb.send("user.online", data);

                    $.ajax({
                        type: 'GET',
                        url: urlprefix + '/im/getunconsumedmsg?token=' + token + '&id=' + userid,
                    });
                });
                //监听查看群员
                layim.on('members', function(data) {
                    //console.log(data);
                });
                //监听聊天窗口的切换
                layim.on('chatChange', function(data) {
                    //console.log(data);
                });
                //更改心情
                var remarktxt = '';
                $(".layui-layim-remark").on("click", function() {
                    var $upremark = $("#up-remark");
                    if (!$upremark[0]) {
                        var _this = $(this);
                        remarktxt = _this.text();
                        _this.html('<input type="text" id="up-remark" value="' + remarktxt + '"/><span class="layui-icon layim-status-check">&#xe605;</span>');
                    }
                });
                //确认更改更改心情
                $(".layui-layim-remark").on("click", ".layim-status-check", function(event) {
                    var _this = $("#up-remark"),
                        inpremark = _this.val();
                    $(".layui-layim-remark").html(inpremark);
                    if (remarktxt != inpremark) {
                        $.post("user/msg.php?dopost=add", { remark: inpremark }, function(res) {}, 'json');
                    }
                    event.stopPropagation(); //// 只执行check的click，
                });
                //确认更改更改心情
                $(".layui-layim-remark").on("change", "#up-remark", function(event) {
                    _this = $(this), tipsval = _this.val();
                    if (tipsval.length >= 14) {
                        layer.tips(tipsval, _this);
                    }
                });
            });

            var tryconnected;
            //断线重连
            var reconnected = function() {
                console.log("尝试重新连接");
                try {
                    eb = new EventBus("/eventbus/");
                } catch (e) {
                    console.log("重连失败");
                }
            };
            //监听收到的聊天消息
            eb.onopen = function() {
                eb.registerHandler("messagereceive." + userid, function(err, msg) {
                    //console.log(msg.body);            
                    layIM.getMessage(msg.body);
                });
                eb.registerHandler("friendsadd." + userid, function(err, msg) {
                    //console.log(msg.body);
                    layIM.addList(msg.body);
                });
                eb.registerHandler("friendstatus." + userid, function(err, msg) {
                    //console.log(msg.body);
                    layIM.friendstatus(msg.body);
                });
            };

            eb.onclose = function() {
                layer.alert("您已掉线");
                //setInterval(window.location.reload(), 5000);       
            };
        }
    };
    return webim;
})