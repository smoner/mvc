
define(['jquery'],function($){
	$(function(){
		$.fn.fixedTop = function( options ) {
	        	var topNavw = $('#topnav').width()
		      	var oTopHeight = $('#topnav').height();
		      	var fixHeight = $('.fix-top').height()+10;
		      	$('.fix-top').removeClass('box-shadow')
		      	$('body,html').scrollTop('0');
		      	$(window).scroll(function(){
		      		var $scrollTop = $(window).scrollTop();
		      		if($scrollTop<= oTopHeight){
		      			$('.fix-top').css({'position': 'absolute','top':'24px','display':'block'});
		      			$('.fix-top').removeClass('box-shadow')
		      		}else{
						$('.fix-top').css({'position': 'absolute','top':$scrollTop-oTopHeight-14+'px','display':'none'}).delay(120).fadeIn();
						$('.fix-top').addClass('box-shadow')
		      		}
	      	});	
	      	$(this).find('ul li').click(function(e){
	      		   var index = $(this).index();
			      	$(this).addClass('active').siblings().removeClass('active');
			      	if(index ==0){
			      		$('body,html').animate({ scrollTop: 0 },500)
			      	}else{
			      		$('body,html').animate({ scrollTop: $('.ibox-index').eq(index).offset().top-fixHeight+'px' },500)
			      	};
	      		
	      	})
		}
	});
})

//HTML结构： 导航： <div class = 'fix-top'><ul><li>home</li><li>2gogog</li></ul>
//			内容:  <div class = " ibox-index"></div>
//调用:$('.fix-top').fixedTop()
