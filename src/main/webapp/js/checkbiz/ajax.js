define([ 'jquery',"lodash"],
    function($,_) {
    	var alertFail=console.log.bind(console);
    	//错误处理
    	function fail(ajax){
    		 return  ajax.fail(function(xhr,msg){
    			alertFail(msg);
    		})
    	}
        //rest方式转换
        function join2rest(url,getParams){
           return url.replace(/:[^&:/\?]+/g,function(value){
                var key=value.slice(1); 
                return getParams[key]||value;
            })
        }

        //数据转换
        function then(fns,ajax){
            if(_.isArray(fns)){
                _.each(fns,function(fn){
                    ajax=ajax.then(fn);
                })
                return ajax
            }else{
                return ajax.then(fns);
            }
        }



        return {
            //post :: Object
            "post" :_.flow($.post,fail),
             //get :: Object
            "get":_.flow($.get,fail),
             //restget
            "restget":_.flow(join2rest,$.get),
            "restpost":_.flow(join2rest,$.post),
            //既有query又有body...
            "options":function(url,getParams,postParms){
                var url=join2rest(url,getParams);
                return  $.ajax({
                    type: 'POST',
                    url:url,
                    dataType: 'json',
                    contentType: 'application/json',
                    data:JSON.stringify(postParms)
                });
            },
            "then":_.curry(then),
             "_post" :_.flow(function(url,params){
                  return  $.ajax({
                    type: 'POST',
                    url:url,
                    dataType: 'json',
                    // 'Access-Control-Allow-Origin': '*',
                    contentType: 'application/json',
                    data:JSON.stringify(params)
                });
             }),
             "_restget":_.flow(join2rest,function(url,params){
                  return  $.ajax({
                    type: 'GET',
                    url:url,
                    dataType: 'json',
                    // contentType: 'application/json',
                    data:JSON.stringify(params)
                });
             }),
             "_form":_.flow(function(url,params){
                
                  return  $.ajax({
                    type: 'POST',
                    url:url,
                    contentType: 'application/x-www-form-urlencoded',
                    data:JSON.stringify(params)
                });
             },fail),
        };
  });

