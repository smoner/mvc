define(["jquery"],function($){
jQuery = $;
jQuery.extend({
    createUploadIframe: function (id, uri) {//id为当前系统时间字符串，uri是外部传入的json对象的一个参数
        //create frame
        var frameId = 'jUploadFrame' + id; //给iframe添加一个独一无二的id
        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"'; //创建iframe元素
        if (window.ActiveXObject) {//判断浏览器是否支持ActiveX控件
            if (typeof uri == 'boolean') {
                iframeHtml += ' src="' + 'javascript:false' + '"';

            }
            else if (typeof uri == 'string') {
                iframeHtml += ' src="' + uri + '"';
            }
        }
        iframeHtml += ' />';
        jQuery(iframeHtml).appendTo(document.body); //将动态iframe追加到body中

        return jQuery('#' + frameId).get(0); //返回iframe对象
    },
    createUploadForm: function (id, fileElementId, data) {//id为当前系统时间字符串，fileElementId为页面<input type='file' />的id，data的值需要根据传入json的键来决定
        //create form	
        var formId = 'jUploadForm' + id; //给form添加一个独一无二的id
        var fileId = 'jUploadFile' + id; //给<input type='file' />添加一个独一无二的id
        var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data" ></form>'); //创建form元素
        if (data) {//通常为false
            for (var i in data) {
                jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form); //根据data的内容，创建隐藏域，这部分我还不知道是什么时候用到。估计是传入json的时候，如果默认传一些参数的话要用到。
            }
        }
        var oldElement = jQuery('#' + fileElementId); //得到页面中的<input type='file' />对象
        var newElement = jQuery(oldElement).clone(); //克隆页面中的<input type='file' />对象
        jQuery(oldElement).attr('id', fileId); //修改原对象的id
        jQuery(oldElement).before(newElement); //在原对象前插入克隆对象
        jQuery(oldElement).appendTo(form); //把原对象插入到动态form的结尾处



        //set attributes
        jQuery(form).css('position', 'absolute'); //给动态form添加样式，使其浮动起来，
        jQuery(form).css('top', '-1200px');
        jQuery(form).css('left', '-1200px');
        jQuery(form).appendTo('body'); //把动态form插入到body中
        return form;
    },

    ajaxFileUpload: function (s) {//这里s是个json对象，传入一些ajax的参数
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s); //此时的s对象是由jQuery.ajaxSettings和原s对象扩展后的对象
        var id = new Date().getTime(); //取当前系统时间，目的是得到一个独一无二的数字
        var form = jQuery.createUploadForm(id, s.fileElementId, (typeof (s.data) == 'undefined' ? false : s.data)); //创建动态form
        var io = jQuery.createUploadIframe(id, s.secureuri); //创建动态iframe
        var frameId = 'jUploadFrame' + id; //动态iframe的id
        var formId = 'jUploadForm' + id; //动态form的id
        // Watch for a new set of requests
        if (s.global && !jQuery.active++) {//当jQuery开始一个ajax请求时发生
            jQuery.event.trigger("ajaxStart"); //触发ajaxStart方法
        }
        var requestDone = false; //请求完成标志
        // Create the request object
        var xml = {};
        if (s.global)
            jQuery.event.trigger("ajaxSend", [xml, s]); //触发ajaxSend方法
        // Wait for a response to come back
        var uploadCallback = function (isTimeout) {//回调函数
            var io = document.getElementById(frameId); //得到iframe对象
            try {
                if (io.contentWindow) {//动态iframe所在窗口对象是否存在
                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

                } else if (io.contentDocument) {//动态iframe的文档对象是否存在
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                }
            } catch (e) {
                jQuery.handleError(s, xml, null, e);
            }
            if (xml || isTimeout == "timeout") {//xml变量被赋值或者isTimeout == "timeout"都表示请求发出，并且有响应
                requestDone = true; //请求完成
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error"; //如果不是“超时”，表示请求成功
                    // Make sure that the request was successful or notmodified
                    if (status != "error") {
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData(xml, s.dataType); //根据传送的type类型，返回json对象，此时返回的data就是后台操作后的返回结果
                        // If a local callback was specified, fire it and pass it the data
                        if (s.success)
                            s.success(data, status); //执行上传成功的操作

                        // Fire the global callback
                        if (s.global)
                            jQuery.event.trigger("ajaxSuccess", [xml, s]);
                    } else
                        jQuery.handleError(s, xml, status);
                } catch (e) {
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if (s.global)
                    jQuery.event.trigger("ajaxComplete", [xml, s]);

                // Handle the global AJAX counter
                if (s.global && ! --jQuery.active)
                    jQuery.event.trigger("ajaxStop");

                // Process result
                if (s.complete)
                    s.complete(xml, status);

                jQuery(io).unbind();//移除iframe的事件处理程序

                setTimeout(function () {//设置超时时间
                    try {
                        jQuery(io).remove();//移除动态iframe
                        jQuery(form).remove();//移除动态form

                    } catch (e) {
                        jQuery.handleError(s, xml, null, e);
                    }

                }, 100)

                xml = null

            }
        }
        // Timeout checker
        if (s.timeout > 0) {//超时检测
            setTimeout(function () {
                // Check to see if the request is still happening
                if (!requestDone) uploadCallback("timeout");//如果请求仍未完成，就发送超时信号
            }, s.timeout);
        }
        try {

            var form = jQuery('#' + formId);
            jQuery(form).attr('action', s.url);//传入的ajax页面导向url
            jQuery(form).attr('method', 'POST');//设置提交表单方式
            jQuery(form).attr('target', frameId);//返回的目标iframe，就是创建的动态iframe
            if (form.encoding) {//选择编码方式
                jQuery(form).attr('encoding', 'multipart/form-data');
            }
            else {
                jQuery(form).attr('enctype', 'multipart/form-data');
            }
            jQuery(form).submit();//提交form表单

        } catch (e) {
            jQuery.handleError(s, xml, null, e);
        }

        jQuery('#' + frameId).load(uploadCallback); //ajax 请求从服务器加载数据，同时传入回调函数
        return { abort: function () { } };

    },

    uploadHttpData : function (r, type) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if (type == "script")
            jQuery.globalEval(data);
        // Get the JavaScript object, if JSON is used.
        if (type == "json")
        	data = jQuery.parseJSON(jQuery(data).text());
        // evaluate scripts within html
        if (type == "html")
            jQuery("<div>").html(data).evalScripts();

        return data;
    },
    
    handleError: function( s, xhr, status, e ) {
    	// If a local callback was specified, fire it
    	if ( s.error ) {
    	s.error.call( s.context || s, xhr, status, e );
    	}
    	// Fire the global callback
    	if ( s.global ) {
    	(s.context ? jQuery(s.context) : jQuery.event).trigger( "ajaxError", [xhr, s, e] );
    	}
    	}
})
	

//附件接口定义
var interface_file = function(){
	//接口定义 常量
	//this.sys = "Woody";	
}
// 通过prototype对象定义类的其他成员；
//接口方法的定义
interface_file.prototype = {
   /**
    * 上传方法
    * @param parameter 必要参数
    * @param callback  回调函数
    */
	filesystem_upload: function(parameter,callback) {
		interface_file.upload(parameter,callback);
	},
	
	/**
	* 查询方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_query: function(parameter,callback) {
		interface_file.query(parameter,callback);
	},
	/**
	 * 删除方法
	 * @param parameter 必要参数
	 * @param callback  回调函数
	 */
	filesystem_download: function(parameter,callback) {
		interface_file.download(parameter,callback);
	}, 	
	/**
	* 下载方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	 filesystem_delete: function(parameter,callback) {
		interface_file.deletefile(parameter,callback);
	},
	/**
	* 获得附件的url方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_geturl: function(parameter,callback) {
		interface_file.url(parameter,callback);
	},
	/**
	* 替换上传附件方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_replace: function(parameter,callback) {
		interface_file.replace(parameter,callback);
	},
	
	/**
	* 附件更新方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_update: function(parameter,callback) {
		interface_file.update(parameter,callback);
	},
	
	/**
	* 附件直传方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_ossupload: function(parameter,callback) {
		interface_file.oss_upload(parameter,callback);
	},
	/**
	* 附件流式通用上传方法
    * @param parameter 必要参数
    * @param callback  回调函数
	*/
	filesystem_stream_upload: function(parameter,callback) {
		interface_file.stream_upload(parameter,callback);
	},
	
	
};  

	// 实现继承的方法  
	interface_file.extend = function(o, p) {  
	  if ( !p ) {p = o; o = this; }  
	  for ( var i in p ) o[i] = p[i];  
	  return o;  
	}; 
	
	
	// 对interface_file进行扩展；  
	interface_file.extend({
		//上传方法的实现
		upload : function (parameter,callback) {
				var path = "file/upload";
				if(parameter.cross_url != undefined){
					path = parameter.cross_url + path
				}
				$.ajaxFileUpload({//ajaxFileUpload包已经修改成支持json.  不是所有的ajaxFileUpload都支持json
			 		//固定不能修改 它对应的是 接口方法的 value = "/upload"
			 		url : path,
			 		//文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么 
			 		fileElementId : parameter.fileElementId,
			 		type : 'post',//固定 post类型 不可修改 
			 		dataType : 'json', //返回值类型 一般设置为json
			 		data : {
				        filepath: parameter.filepath,//parameter.filepath,//[单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则]
				        groupname: parameter.groupname, //[分組名称,未来会提供树节点]
				        url:parameter.url,  //是否返回附件的连接地址
				        permission : parameter.permission, //私有   read是可读       当这个参数不传的时候会默认private
				        thumbnail : parameter.thumbnail,
				        isreplace :( parameter.isreplace == undefined || parameter.isreplace == false) ? false : true,//当filepath groupname filename 都一致的时候是否覆盖上传
					},
			 		success : function(data, status) //服务器成功响应处理函数
			 		{
			 			callback(data);
			 		},
			 		error : function(data, status) //服务器成功响应处理函数
			 		{
			 			callback(status);
			 		}
				});

		},
	    //查询方法的实现 
		query : function (parameter,callback) {
				var path = "file/query";
				if(parameter.cross_url != undefined){
					path = parameter.cross_url + path
				}
				$.ajax({
			 		type : "GET",
			 		url : path,
			 		dataType : "json",
			 		data : {
		            	 filepath:parameter.filepath,//[必输][单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则]
				         groupname: parameter.groupname,//[不必输][分組名称,未来会提供树节点]
				         tenant: parameter.tenant //
				    },
			 		success : function(data, status) {
			 		  callback(data);
			 		},
			 		error : function(data, status){
			 			callback(status)
			 			
			 		}
			 	});
	  },
	    //下载方法的实现 
		download : function (parameter,callback) {
				var path = "file/download";
				if(parameter.cross_url != undefined){
					path = parameter.cross_url + path
				}
				$.ajax({
			 		type : "GET",
			 		url : path,
			 		contentType : "application/json",
			 		dataType : "json",
			 		data : {
			 			 id:parameter.id,
			 			 permission: parameter.permission,
			 			 stream: true
				    },
			 		success : function(data, status) {
			 		  callback(data);
			 		},
			 		error : function(data, status){
			 			callback(status)
			 			
			 		}
			 	});
	  },
	    //删除方法的实现 
		deletefile : function (parameter,callback) {
				var path = "file/delete";
				if(parameter.cross_url != undefined){
					path = parameter.cross_url + path
				}
				$.ajax({
					url : path,
		            data : {
		            	//附件信息表的id uap_filesystem表
		            	id : parameter.id
				    },
			 		dataType : "json",
			 		success : function(data, status) {
			 		    callback(data);
			 		},
			 		error : function(data, status){
			 			callback(status)
			 			
			 		}
			 	});
	  },
	    //获得url地址方法的实现 
		url : function (parameter,callback) {
				var path = "file/url";
				if(parameter.cross_url != undefined){
					path = parameter.cross_url + path
				}
				$.ajax({
					url : path,
			 		type : "GET",
			 		dataType : "json",
		            data : {
		            	    ids : parameter.ids,
		            	    thumbnail : parameter.thumbnail
		                 },
			 		success : function(data, status) {
			 		    callback(data);
			 		},
			 		error : function(data, status){
			 			callback(status)
			 			
			 		}
			 	});
	  },
	    //替换上传附件方法
		replace : function (parameter,callback) {
				var path = "file/replace";
				if(parameter.cross_url != undefined){
					path = parameter.cross_url + path
				}
			 	$.ajaxFileUpload({
			 		url : path,
			 		fileElementId : parameter.fileElementId,
			 		type : 'post', 
			 		dataType : 'json',
			 		data : {
		 			        id : parameter.id,
					        filepath:parameter.filepath,
					        groupname: parameter.groupname, //分組
					        url:parameter.url,  //是否返回附件的连接地址	
					        permission : parameter.permission //私有   read是可读 			        
					},
			 		success : function(data, status) //服务器成功响应处理函数
			 		{
			 			callback(data);
			 		},
			 		error : function(data, status) //服务器成功响应处理函数
			 		{
			 			callback(status);
			 		}
				});
	  },
	    //更新方法实现 
		update : function (parameter,callback) {
			var path = "file/update";
			if(parameter.cross_url != undefined){
				path = parameter.cross_url + path
			}
		 	$.ajax({
			 		type : "post",
			 		url : path,
		            data : {					            	   
						id : parameter.id,
						filepath : parameter.filepath, 
						groupname :parameter.groupname  
			        },
			 		dataType : "json",
			 		success : function(data, status) {
			 		    callback(data);
			 		},
			 		error : function(data, status){
			 			callback(status)
			 			
			 		}
			 	});
	  },
	  
	    //直传方法实现 
	   oss_upload : function (parameter,callback) {
		   //加载直传js
			   var path = "file/oss";//controller 访问地址
			   if(parameter.cross_url!= undefined){//跨域地址处理
				   path = parameter.cross_url+ path
			   }
			   var tenantvalue = interface_file.getcookie("tenantid");
			   parameter.tenantid = tenantvalue;//添加租户信息
			   parameter.path = path; //添加路径信息
			   oss_upload_entrance(parameter,callback);//oss直传入口调用
	  },
	  
	  //支持所有控件的流式上传
	  stream_upload : function (parameter,callback) {
		   var path = "file/upload";//controller 访问地址
		   if(parameter.cross_url!= undefined){//跨域地址处理
			   path = parameter.cross_url+ path
		   }
			  $.ajax({
					url : path,
					type : 'POST',
					data : parameter,
					dataType : 'json', //返回值类型 一般设置为json
					contentType : false, //必须
					processData : false, //必须
					success : function(data) {
						callback(data);
					},
					error : function(returndata) {
						callback("{'erroe' : '流式上传错误'}");
					}
				});

	   },
	  
	  
	  
	  /**
	   * 获得cookie
	   * @auth zzz
	   * @param cookieName
	   * @returns {String}
	   */
	  // 接口中不存在的静态方法 interface_file.getcookie() 可直接调用
	  getcookie : function(cookieName) {  
		    var strCookie = document.cookie;
		    var arrCookie = strCookie.split("; ");
		    for(var i = 0; i < arrCookie.length; i++){
		        var arr = arrCookie[i].split("=");
		        if(cookieName == arr[0]){
		            return arr[1];
		        }
		    }
		    return "";
	  }
	});
//oss 直传初始化
		 function oss_upload_entrance(paramers,callback){
		 	if(null == paramers) return;
		 		//附件对象
		 	    var file=$("#"+paramers.fileid).prop('files');
		 		//获取oss签名参数
		 	    for(var k in file){
		 	    	if(file[k] instanceof  File){
		 	    		var item = file[k];
		 	    		paramers.filename = item.name;
				 	    var ret = get_signature(paramers,callback)
				 	     //装配发送到oss文件上传url
				 	    if (ret == true)
				 	    {		 		    	  
			 				    var formData = new FormData(); 			    
			 			    	//装配oss签名参数
			 			    	formData.append("name",item.name);
			 			    	formData.append("key", key);
			 			    	formData.append("policy", policyBase64);
			 			    	formData.append("OSSAccessKeyId", accessid);
			 			    	formData.append("success_action_status", '200');
			 			    	formData.append("callback", callbackbody);
			 			    	formData.append("signature", signature);
			 			    	formData.append("file",file[k])//===================获得文件数据（需要你提供，获得修改成你自己的方式）
			 			    	//回写表的时候需要的参数rewrite方法是回调参数oss返回rewrite后会取下面的参数
			 			    	formData.append("x:tenantid",paramers.tenantid)//租户
			 			    	formData.append("x:groupname",paramers.groupname)//分组名称 自定义参数的传法
			 			    	formData.append("x:filepath",paramers.filepath)//单据信息   自定义参数的传法
			 			    	formData.append("x:permission",paramers.permission)//共有还是私有
			 			    	formData.append("x:modular",paramers.modular)//模块信息
			 			    	formData.append("x:sysid",paramers.sysid)//系统id
			 			    	formData.append("x:userid",paramers.userid)//用户id
			 			    	formData.append("x:url",paramers.url)//
			 			    	var ishttps = 'https:' == document.location.protocol ? true: false;
								if(ishttps){									
									oss_uploadandreturn(formData,host.replace('http','https'),callback);
								}else{									
									oss_uploadandreturn(formData,host,callback);
								}
			 			    	
			 		      }
			 		   }
		 	    }
		 	}
		 
		 
		 /**
		  * 只做请求参数的操作和formdate的组装
		  * 为了fromdata上面扩展
		  * 返回array<FormData>
		  */
		 function query_formdata(paramers){
			 
			 if(null == paramers) return;
		 		//提交
		 		//获取oss签名参数
		 	    var ret = get_signature(paramers)

		 	     //装配发送到oss文件上传url   
		 	    if (ret == true)
		 	    {
		 		    var file=$("#"+paramers.fileid).prop('files');
		 		    var arr = new Array();
		 		    for(var k in file){
		 		      if(file[k] instanceof  File){
		 		    	  
		 				    var item = file[k];
		 				    var formData = new FormData(); 			    
		 			    	//装配oss签名参数
		 			    	formData.append("name",item.name);
		 			    	formData.append("key", key);
		 			    	formData.append("policy", policyBase64);
		 			    	formData.append("OSSAccessKeyId", accessid);
		 			    	formData.append("success_action_status", '200');
		 			    	formData.append("callback", callbackbody);
		 			    	formData.append("signature", signature);
		 			    	formData.append("file",file[k])//===================获得文件数据（需要你提供，获得修改成你自己的方式）
		 			    	//回写表的时候需要的参数rewrite方法是回调参数oss返回rewrite后会取下面的参数
		 			    	formData.append("x:groupname",paramers.groupname)//分组名称 自定义参数的传法
		 			    	formData.append("x:filepath",paramers.filepath)//单据信息   自定义参数的传法
		 			    	formData.append("x:permission",paramers.permission)//共有还是私有
		 			    	formData.append("x:modular",paramers.modular)//模块信息
		 			    	arr[k] = formData;
		 		      }
		 		   }
		 		    return arr;
		 	    }
			 
			 
		 }
	
		 
		//获取到签名参数后将参数填入变量待用
			function get_signature(paramers,callback)
			{
			    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
			    expire = 0
			    now = timestamp = Date.parse(new Date()) / 1000; 
			    console.log('get_signature ...');
			    console.log('expire:' + expire.toString());
			    console.log('now:', + now.toString())
			    if (expire < now + 3)
			    {
			        console.log('get new sign')
			        var obj = send_request(obj,paramers,callback);
			        if(obj != undefined){
			        	policyBase64 = obj['policy']
			        	accessid = obj['accessid']
			        	signature = obj['signature']
			        	expire = parseInt(obj['expire'])
			        	callbackbody = obj['callback'] 
			        	host =obj['host']
			        	key = obj['perfix']+'${filename}'
			        	return true;			        	
			        }
			    }
			    return false;
			};
			
			
			 /*直传返回值*/
			 function oss_uploadandreturn(formData,host,callback){
				 
				//发送文件上传请求   
					$.ajax({  
				        url: host,  
				        type: 'POST',
				        data: formData,  
				        async: false,  
				        contentType: false, //必须
				    	processData: false, //必须
				        success: function (returndata) {
				        	callback(returndata);
				        },  
				        error: function (returndata) {
				        	callback(returndata);
				        }  
				    });  
			 }
	  
		//发送到应用服务器 获取oss签名参数
			 function send_request(obj,paramers,callback){
			 	$.ajax({
			 		type : 'GET',
			 		async : false,
			 		url :paramers.path,
		            data : {					            	   
		            	tenantid : paramers.tenantid, //这里是租户的id,需要自己处理
		            	permission : paramers.permission, //这里是租户的id,需要自己处理
						groupname : paramers.groupname,
						filepath : paramers.filepath,
						filename : paramers.filename,
						isreplace : paramers.isreplace
			        },
			 		success : function(data){
			 			obj=$.parseJSON(data);
			 		} 
			 	});
			 	return obj;
			 }

	return interface_file;
})
