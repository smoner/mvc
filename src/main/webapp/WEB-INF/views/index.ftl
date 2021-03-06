<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<!-- 避免IE使用兼容模式 -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- 启用360浏览器的极速模式(webkit) -->
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="keywords" content="云采 云彩  友云采  云采购 采购 供应商">
	<meta name="description" content="云采 云彩  友云采  云采购 采购 供应商">
	<meta http-equiv="Cache-Control" CONTENT="no-cache">
	<title>友云采</title>
    <link href="${cdn}/css/bootstrap.min.css" rel="stylesheet">
    <link href="${cdn}/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <!-- Animation CSS -->
    <link href="${cdn}/css/animate.min.css" rel="stylesheet">
    <link href="${cdn}/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/landing.css?v=1.0.1" rel="stylesheet">
    <link href="css/browser-update.css" rel="stylesheet">
    
</head>
<body class="landing-page cpu-bg">
    <!--头部信息-->
    <div id="topnav"></div>
	<div class="container">
        <!--头部搜索-->
        <div id="banner">
            <div class="row">
                <div class="col-md-3 m-l-md-ng log-box">
                    <div class="pull-left">
                        <a href="" id="home-log">
                             <img src="img/logo.png" class="img-responsive" alt="Logo">
                        </a>
                          
                    </div>
                    <div class="pull-left log-font" >
                        <span>帮助企业做</span><br>
                        <span>最佳采购决策和高效协同</span>
                    </div>                
                </div>
                <div class=" col-md-5 i-tab-search i-tab-search-landing" style="position: relative; left:30px;">
                    <div class="search-box">
                        <div class="tabs-container">
                    </div>
                    <div class="input-group" id="m_search" >
                        <input  placeholder="请输入关键词" type="text"  data-bind="value: search, valueUpdate: 'afterkeydown',event:{focus:focus ,blur:blur,keyup:keyup}" class="form-control input-lg landing-search landingsearch-input">                        
                        <span class="input-group-btn">
                            <button tabindex=0 type="button" class="btn btn-landing-search btn-lg">
                                &nbsp;搜索&nbsp;
                            </button>
                        </span>

                    </div>
                </div>
                    
                </div>
                <div class="hidden-xs hidden-sm col-md-4">
                    <div class="pull-right nav navbar-top-links navbar-right">
                        <div class="connection">
                            <div class="connection-info">
                                <span class="icon-cell"></span>
                                <span>010-62437904</span>
                                <span class="icon-email"></span>
                                <span>wangglf@yonyou.com</span>
                            </div>      
                        </div>
                    </div>
                </div>
            </div>          
        </div>
        <div class="row m-t-sm">
            <div id="mainnav" class="col-md-12">
                <div class="i-navigation">
                    <ul class="nav navbar-nav navbar-left">
                        <li style="width: 180px;margin-left: -15px;background-color: #e4373d;">
                            <a href="javascript:void(0)" style="color:#FFF">
                                <i class="fa fa-list-ul"></i>全部商品分类
                            </a>
                        </li>
                        <li>
                            <a id="linkhome" href="">首页</a>
                        </li>
                        <li>
                            <a id="linkrequirement" href="">采购资讯</a>
                        </li>
                        <li>
                            <a id="linkproduct" href="">可供商品</a>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                </div>   
            </div> 
        </div> 
        <!--头部导航-->
        <div class="row" >            
            <div class="col-sm-3 col-md-3 category-content">
                <!--商品分类-->
                <div id="category">
                  <ul class="i-category-content">  
                    <li class="i-category-item" data-id="1" data-innercode="1A">化工、能源</li>       
                    <li class="i-category-item" data-id="547" data-innercode="547A">纺织、皮革</li>       
                    <li class="i-category-item" data-id="307" data-innercode="307A">包装、印刷、纸业</li>       
                    <li class="i-category-item" data-id="57" data-innercode="57A">五金、建材、家装</li>     
                    <li class="i-category-item" data-id="614" data-innercode="614A">空调、采暖、热泵</li>     
                    <li class="i-category-item" data-id="382" data-innercode="382A">机械、设备</li>      
                    <li class="i-category-item" data-id="651" data-innercode="651A">办公用品</li>       
                    <li class="i-category-item" data-id="140" data-innercode="140A">安全防护</li>     
                    <li class="i-category-item" data-id="453" data-innercode="453A">食品、制药</li>      
                    <li class="i-category-item" data-id="718" data-innercode="718A">工程服务</li>       
                    <li class="i-category-item" data-id="489" data-innercode="489A">橡塑、精细、钢材</li>      
                    <li class="i-category-item" data-id="247" data-innercode="247A">电子、仪表仪器</li>       
                </ul>                     
                </div>
            </div>  
                  
            <div class="col-sm-6 col-md-6 slide-content">   
                 <!--轮播-->
                 <div id="ad-slider">
                     <!--轮播-->
                    <div class="carousel slide" id="carousel-target">
                        <ol class="carousel-indicators">
                            <li data-slide-to="0" data-target="#carousel-target" class="active"></li>
                            <li data-slide-to="1" data-target="#carousel-target"></li>
                            <li data-slide-to="2" data-target="#carousel-target" class=""></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="item active">
                                <img alt="image" class="img-responsive" src="img/banner01.png">
                                <div class="carousel-caption">
                                    <p></p>
                                </div>
                            </div>
                            <div class="item ">
                                <img alt="image" class="img-responsive" src="img/banner02.png">
                                <div class="carousel-caption">
                                    <p></p>
                                </div>
                            </div>
                            <div class="item">
                                <img alt="image" class="img-responsive" src="img/3.png">
                                <div class="carousel-caption">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <a data-slide="prev" href="#carousel-target" class="left carousel-control">
                            <span class="icon-prev"></span>
                        </a>
                        <a data-slide="next" href="#carousel-target" class="right carousel-control">
                            <span class="icon-next"></span>
                        </a>
                    </div> 
                 </div>
                  <!--功能介绍-->
                 <div class="slogan-btm m-t-xs" >
                 	<ul class="list-unstyled clearfix">
                 		<li><a href="/home">
                 			 <i class="icon iconfont">&#xe645;</i>
                  			  <div class="name">采购需求</div>
                 			</a>	
                 		</li>
                 		<li><a href="/home">
                 			 <i class="icon iconfont">&#xe63e;</i>
                 			   <div class="name">询报价</div>
                 			</a>	
                 		</li>
                 		<li><a href="/home">
                 			  <i class="icon iconfont">&#xe63f;</i>
                   			 <div class="name">在线竞价</div>
                 			</a>	
                 		</li>
                 		<li><a href="/home">
                 			  <i class="icon iconfont">&#xe640;</i>
                 		   <div class="name">投标谈判</div>
                 			</a>	
                 		</li>
                 		<li><a href="/home">
                 			 <i class="icon iconfont">&#xe641;</i>
                  		  <div class="name">超市化采购</div>
                 			</a>	
                 		</li>
                 		<li><a href="/home">
                 			 <i class="icon iconfont">&#xe642;</i>
                   		 <div class="name">采购协同</div>
                 			</a>	
                 		</li>
                 		<li><a href="/home">
                 			  <i class="icon iconfont">&#xe643;</i>
                  			  <div class="name">供应商管理</div>
                 			</a>	
                 		</li>
                 		<li><a href="/home">
                 			 <i class="icon iconfont">&#xe644;</i>
                 			   <div class="name">采购分析</div>
                 			</a>	
                 		</li>
                 		
                 		
                 	</ul>
                   <!--<img alt="" class="img-responsive" src="img/slogan-btm.png"/>-->
                 </div>
            </div>
            <div class="col-sm-3 col-md-3 logon-content">  
                <div id="wechatlogindialog" style="position: absolute;
		    top: 82px;
		    right: 0px;
		    border: 1px solid rgb(238, 238, 238);
		    z-index: 10;
		    min-width: 302px;
		    min-height: 406px;
		    display: none;
		    background-color: rgb(255, 255, 255);box-shadow: 0 0 10px #888;">
                  <span id="closelogin" class='fa fa-remove' style="position:absolute;top:10px;right:10px"></span>
                  <div id="container">                  
                  </div>
                </div>              
                <!--登录-->
                <div id="welcome" class="welcome" data-portal="${portal}" data-defaultlogin="${defaultlogin}" style="position:relative">
                    
                                       
                    <script src="//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js">   </script>
                    <h4>Hi,欢迎来到友云采!</h4>
                    <div class="row">
                        <div class="col-sm-6 col-md-6 p-r-xs" id="btn-login">
                            <a href="/yuncai/${defaultlogin}">
                                <button  type="button" class="btn btn-block btn-danger btn-landing">
                                <i class="fa fa-sign-in"></i> 登录</button>
                            </a>
                        </div>
                        <div class="col-sm-6 col-md-6 p-l-xs">
                            <a href="${casbaseurl}/tenant/register/registerOne.html?service=${portal}/${defaultlogin}&systemId=ipu">
                                <button  type="button" class="btn btn-block btn-danger btn-outline">
                                <i class="fa fa-edit"></i>
                                注册</button>
                            </a>
                        </div>
                        <div id="wechatlogin" class="col-md-12" style="margin-top: 2px;
    margin-left: 2px;
    width: 127px;
    cursor: pointer;
    height: 35px;background-image:url('/yuncai/img/index/tips@1x.png')">                          
                        </div>
                    </div>
                </div>               
                <!--采购信息-->   
                <div id="newestreq">
                    <div  style="height:200px;padding-top: 70px;">
                    <div class="sk-spinner sk-spinner-circle">
                        <div class="sk-circle1 sk-circle"></div>
                        <div class="sk-circle2 sk-circle"></div>
                        <div class="sk-circle3 sk-circle"></div>
                        <div class="sk-circle4 sk-circle"></div>
                        <div class="sk-circle5 sk-circle"></div>
                        <div class="sk-circle6 sk-circle"></div>
                        <div class="sk-circle7 sk-circle"></div>
                        <div class="sk-circle8 sk-circle"></div>
                        <div class="sk-circle9 sk-circle"></div>
                        <div class="sk-circle10 sk-circle"></div>
                        <div class="sk-circle11 sk-circle"></div>
                        <div class="sk-circle12 sk-circle"></div>
                    </div>
                    </div>
                </div>
            </div>     
        </div>
        <div class="row m-t-md">
            <div class="i-landing-box">
                 <div id="rcmdproduct"></div>
            </div>
        </div>
        <!--采购需求-->
        <div class="row m-t-lg">
            <div class="i-landing-box">
                <div class="i-landing-box-title row">
                    <div class="col-md-2">
                        <span class="box-title">采购需求</span>
                    </div>
                    <div class="col-md-10">
                        <a href="${portal}/requirement" class="pull-right link-more">查看更多 <span class="fa fa-angle-double-right"></span></a>
                    </div>                    
                </div>
                <!--<hr class="box-btm-border">-->
                <div class="i-landing-box-content" style="border-top: 1px solid #D7D7D7;">
                    <div class="pure-content">
                        <div id="findbuyoffer"></div>
                    </div>
                </div>
            </div>   
        </div>                    
        
    </div>
    <!--合作企业-->
    <div id="cooperator"></div>
    <div id="footer" class="portal-footer"></div>
   
     <script>
		window.ctx = {};
		window.ctx.cdn = "${cdn}";
		window.ctx.portal ="${portal}";        
        window.ctx.defaultlogin = "${portal}/${defaultlogin}";
        window.ctx.workbenchurl ="${workbenchurl}";
        window.ctx.registerurl = "${casbaseurl}/tenant/register/registerOne.html?service=${portal}/${defaultlogin}&systemId=ipu";
	</script>
	<script src="${cdn}/js/requirejs/2.2.0/require.min.js"></script>
	<script src="js/main/pubportal/main.js"></script>
	<script src="js/main/pubportal.js"></script>
	<script src="js/main/pubportal/browser-update.js"></script>
	<script type="text/javascript">
		new BrowserUpdate({
            mode: 'top',
            displayConfig:  [{
                mode: 'mask',
                version: 6
            }, {
        		mode: 'mask',
        		version: 7
            },{
        		mode: 'mask',
        		version: 8
            },
             {
        		mode: 'mask',
        		version: 9
            }],
            'lang': 'zh-cn',
            onShow: function(){
            },
            onHide: function(){
            },
        	'landingPage': ''
        });
	</script>
</body>
</html>
