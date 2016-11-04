define( ['jquery','ajaxfileupload'], function ( $, ajaxfileupload) {
  function PopUp( conf ) {
    this.url = conf.url || '';
    this.$popup = conf.$popup;
    this.type = conf.type;
    this.data = conf.data || {};
    this.start = conf.start || function () {};
    this.end = conf.end || function () {};
    this.error = conf.error || function () {};
    this.submitBefore = conf.submitBefore || function () {};
    this.$form = conf.$popup.find( '[nodetype="form-popup"]' );
    this.$submit = conf.$popup.find( '[nodetype="ok"]' );
    this.$cancel = conf.$popup.find( '[nodetype="cancel"]' );
    this.$close = conf.$popup.find( '[nodetype="close"]' );
    this.fun = conf.fun || function () {};
  }

  PopUp.prototype = {
    init: function () {
      this.cancel();
      this.close();
    },

    // 弹出功能
    pop: function ( fun ) {
      this.createMarker();
      this.pos();
      this.start( this.$popup, this );
      ( typeof fun === 'function' ) && fun( this.$popup );
    },

    pos: function () {
      var top = $( window ).height() / 2 + $( window ).scrollTop();
      var _this = this;

      this.$popup.css( {
        top: top + 'px'
      } );

      setTimeout( function () {
        _this.$popup.show();
        _this.$popup.css( {
          opacity: 1
        } );
      }, 200 );
    },

    // 创建遮罩
    createMarker: function () {
      var w = $( document ).width();
      var h = $( document ).height();
      var $marker = $( '<div class="marker"></div>' );

      $marker.css( {
        opacity: 0.5,
        width: w + 'px',
        height: h + 'px'
      } );

      $( 'body' ).find( '.main' ).append( $marker );
    },

    getPopup: function () {
      return this.$popup;
    },

    setPostData: function ( data ) {
      this.data = $.extend( this.data, data );
    },

    // 返回整合数据
    getBackData: function () {
      var _this = this;
      var data = this.$form.serializeArray();
      var getStr = function () {
        var dt, str = '';

        if ( _this.data )
        {
          for ( var key in _this.data )
          {
            str += '&'+key+'='+_this.data[key];
          }
          dt = _this.$form.serialize() + str;
        }
        else
        {
          dt = _this.$form.serialize();
        }
        return dt;
      };
      var postStr = function () {
        var params = {};
        var param;

        for ( var i = 0, l = data.length; i < l; i++ )
        {
          param = {};
          param[ data[i].name ] = data[i].value;
          $.extend( params, param );
        }
        ( _this.data ) && $.extend( params, _this.data );
        return {
          params: JSON.stringify( params )
        }
      };

      return {
        str: {
          getStr: getStr,
          postStr: postStr
        },
        array: data
      };
    },

    // 提交功能
    submit: function () {
      var _this = this;
      var data;

      this.unbindSubmit( 'click' );
      this.$submit.bind( 'click', function () {
        _this.submitBefore( _this.$popup );
        _this.submitFun();
        return false;
      } );
    },

    unbindSubmit: function ( type ) {
      this.$submit.unbind( type );
    },

    submitFun: function ( dt ) {
      data = dt || this.getBackData();
      this.asyQuery( data );
      return data;
    },

    // 取消功能
    cancel: function () {
      var _this = this;

      this.$cancel.unbind( 'click' );
      
        this.$cancel.bind( 'click', function () {
          _this.closeFun();
          return false;
        } );
       
    },

    close: function () {
      var _this = this;

      this.$close.unbind( 'click' );
      
        this.$close.bind( 'click', function () {
          _this.closeFun();
          return false;
        } );
      
    },

    // 关闭功能
    closeFun: function () {
      var _this = this;

      this.$popup.css( {
        opacity: 0
      } );
      setTimeout( function () {
        _this.$popup.hide();
      }, 350 );
      $( '.marker' ).remove();
    },

    clearValue: function () {
      this.$form.find( 'input, textarea, select' ).val( '' );
    },

    asyQuery: function ( data ) {
      var _this = this;
      if ( this.url )
      {
    	  $.ajaxFileUpload({//ajaxFileUpload包已经修改成支持json.  不是所有的ajaxFileUpload都支持json
			    //固定不能修改 它对应的是 接口方法的 value = "/upload"
		        url :this.url,
				//文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么 
				fileElementId : 'id_file', 				
				type : 'post',//固定 post类型 不可修改 
				dataType : 'json', //返回值类型 一般设置为json
		        //必须上传的参数   uploader =上传人  product = 产品   tenant = 租户   modular = 模块 
				data : {//加入的文本参数 ，下面的数值换成你自己的
			        uploader: _this.data.userId, //上传人 
			        product: 'ipu',  //产品
			        tenant: _this.data.tentid,//租户
			        modular: _this.data.modular,//模块
					filepath:_this.data.filepath,//单据唯一标识
					groupname:_this.data.groupname,
					permission : 'private'  //私有   read是可读 
			    },
				success : function(data) //服务器成功响应处理函数
				{
					if(data){
						 
						 _this.end( data, data.data, data.array,  _this.$popup );
						 _this.closeFun();
					}
				 }
			});
      }
      
    },
    showError:function(msg){
    	alert(msg);
    }
  };

  return {
    init: PopUp
  }
} );