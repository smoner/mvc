/* global multipart_params */
/*!

 @Title: layui.upload 单文件上传 - 全浏览器兼容版
 @Author: 贤心
 @License：LGPL

 */
 
layui.define(['jquery', 'layer'], function(exports){
  var $ = layui.jquery, layer = layui.layer;
  
  exports('upload', function(options){
    options = options || {};
    
    var body = $('body'), IE = navigator.userAgent.toLowerCase().match(/msie\s(\d+)/) || [];
    var file = $(options.file || '.layui-upload-file');
    var iframe = $('<iframe id="layui-upload-iframe" class="layui-upload-iframe" name="layui-upload-iframe"></iframe>');
    
    options.check = options.check || 'images';
    $('#layui-upload-iframe')[0] || body.append(iframe);
    
    
    file.each(function(){
      var item = $(this), form = '<form target="layui-upload-iframe" id="fileform" method="'+ (options.method||'post') +'" key="set-mine" enctype="multipart/form-data" action="'+ (options.url||'') +'"></form>';
      
      if(!options.unwrap){
        form = '<div class="layui-upload-button">' + form + '<span class="layui-upload-icon"><i class="layui-icon">&#xe608;</i>'+ (item.attr('layui-text')||'上传图片') +'</span></div>';
      }
      
      form = $(form);
      
      if(item.parent('form').attr('target') === 'layui-upload-iframe'){
        if(options.unwrap){
          item.unwrap();
        } else {
          item.parent().next().remove();
          item.unwrap().unwrap();
        }
      };

      item.wrap(form); 
      
      if(options.multipart_params){
            item.parent().prepend('<input type="hidden" name="name" id="name"/>');       
            $.each(options.multipart_params,function(name,value) {  
                item.parent().prepend('<input type="hidden" name="'+name+'" id="'+name+'"  value="'+value+'"/>');
            });
          //console.log(item.parent());
      }  

      item.off('change').on('change', function(){
        var othis = $(this), val = othis.val();
        var iframe = $('#layui-upload-iframe');
        if(!val) return;
        if(options.check === 'images' && !/\w\.(jpg|png|gif|bmp|jpeg)$/.test(escape(val))){
          layer.msg('图片格式不对');
          return othis.val('');
        }
        if(options.check === 'file' && /\w\.(exe)$/.test(escape(val))){
          layer.msg('不允许传输可执行文件');
          return othis.val('');
        }

        var filetype = '';
        if(val.indexOf('.')>-1){
          filetype = val.substring(val.indexOf('.'));
        }
        var ranfilename =random_string(10) +filetype;
        $('input#name').val(ranfilename); 
        var pathurl =$('input#key').val()+ranfilename;
        $('input#key').val(pathurl);
        console.log(item.parent());
        iframe.load(function(){ 
            var strFileName=file.val().replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");  //正则表达式获取文件名，不带后缀
            var FileExt=file.val().replace(/.+\./,"");   //正则表达式获取后缀
            options.success({code:0,filename:strFileName+FileExt,path:pathurl});
            othis.val('');
            iframe.remove();
            iframe = $('<iframe id="layui-upload-iframe" class="layui-upload-iframe" name="layui-upload-iframe"></iframe>');
        });
        if(item.parent().is('form')){
            item.parent().submit();
        } else{
            $('#fileform').submit();
        }        
        options.before && options.before();      
      });
    });
  });
});

function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}