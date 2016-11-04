define( ['PopUp'], function ( Popup ) {
  function Tags( conf ) {
    var _this = this;

    this.urls = conf.tagUrls;
    this.methods = conf.methods || null;
    this.data = conf.tagData || {};
    this.type = conf.tagType;
    this.stars = 0;
    this.fun = conf.fun || function () {};
    this.$el = conf.$el;
    this.$tList = conf.$tList;
    this.defTxt = conf.defTxt;
    this.tag = conf.tag;
    this.isedit=conf.isedit;
    this.removefun=conf.removefun||function () {};
    this.initfun=conf.initfun||function () {};
    this.downloadfun=conf.downloadfun||function () {};
    
    // 弹出层
    this.popup = new Popup.init( {
      url: conf.editUrl,
      type: conf.editType,
      $popup: conf.$popup,
      data: conf.tagData || null,
      start: function ( $popup ) {
        $err = $popup.find( '.err' );
        $input = $popup.find( 'input[type="text"]' );
        $err.length > 0 && $err.remove();
        $input.val( '' );
        $input[0].value = "";
	    $input.focus();
 
      },
      end: function ( dt, result, stars ) {
        _this.insterTag( {
          dt: dt,
          fileid:result&&result.length>0?result[0].id:0 ,
          fun: function ( $tag ) {
        	  _this.fun($tag);
          }
        } );
      }
    } );
    this.popup.init();
  }

  Tags.prototype = {
    // 初始化标签条数
    init: function () {
      var _this = this;

      this.clearTags();
      this.add();
      this.addConversion();
      this.remove();
      this.download();
      this.$target = this.$tList.children();

      if ( this.methods )
      {
        this.data['method'] = this.methods.get;
      }

      this.asyQuery( this.urls.init, function ( dt ) {
        var result = dt.result;

        if ( result.length > 0 )
        {
          for ( var i = 0, l = result.length; i < l; i++ )
          {
            _this.insterTag( {
              dt: result[i],
              id: result[i].id,
              fileid:result[i].fileid,
              fromBI: parseFloat( result[i].fromBI || -1 ),
              type: parseFloat( result[i].type || -1 ),
              fun: function ( $tag ) {
                ( _this.$target.length > 0 ) ;
              }
            } );
           
          }
          _this.initfun( dt );
        }
        else
        {
          _this.defTxt && _this.$tList.html( '<div class="no-mess icon-th-list"><span>'+ _this.defTxt +'</span></div>' );
        }
      }, 'init' );
    },

    getTagStr: function ( tit, id ,dt,fileid) {
      var filepk,filename,filesize;
      filepk=dt.result?dt.result[0].pkFile:dt.pkfile;
      filename=dt.result?dt.result[0].filename:dt.filename;
      filesize=dt.result?dt.result[0].filesize:dt.filesize;
     
      var regTit = /{%tit%}/g;
      var regID = /{%id%}/g;     //文件系统id
      var regfilepk = /{%filepk%}/g;  //存储的文件的主键
      var regattachid=/{%fileid%}/g;  //子表id
      var regfilename=/{%filename%}/g;  //子表id
      var regfilesize=/{%filesize%}/g;  //子表id
      
      var tags = {
        area: '<div class="tag" id="{%id%}" filepk="{%filepk%}" fileid="{%fileid%}" filename="{%filename%}" filesize="{%filesize%}">'+
                '<span>{%tit%}</span>'+
                '<a href="#" class="download"></a>'+
                '<a href="#" class="ok"></a>'+
                (this.isedit==true?'<a href="#" class="del"></a>':"")
                	+
              '</div>'
        
      };
      var temp = tags[this.tag];

      temp = temp.replace( regTit, tit )
                .replace( regID, id ).replace( regfilepk, filepk )
                .replace( regattachid, fileid ).replace( regfilename, filename )
                .replace( regfilesize, filesize );
      return temp;
    },

    // 新增标签
    add: function () {
      var _this = this;

      this.bindEvent( function ( $target ) {
        if ( $target.hasClass( 'addTag' ) )
        {
          var $pop;

          _this.$target = $target;
          _this.popup.pop();
          _this.popup.submit();
        }
      } );
    },

    // 下载标签
    download: function () {
       var _this = this;
      var $parent;
      var filepk,id;
      this.bindEvent( function ( $target ) {
        if ( $target.hasClass( 'download' ) )
        {	$parent= $target.parents( '.tag' );
        	 id= $parent.attr( 'fileid' );
        	 filepk=  $parent.attr( 'filepk' );
       
        
    	if(id){
    		_this.data['ids'] =id;
    		 
    		_this.asyQuery( _this.urls.download, function (data) {
    	           
    	           // _this.downloadfun(data);
    			 if(data){
	        		 for(var dttemp in data.data){
	        			 var url=data.data[dttemp];
	        			 if(url.startWith("http")){
	        				 window.open(url,"下载","");
	        			 }else
	        				 window.open("//"+url,"下载","");
	        			
	        		 }
	        	   }
    	          } );
    	}
      } } );
    },
    // 插入标签
    insterTag: function ( conf ) {
    	
    	 var datatemp=conf.dt.data ?  conf.dt.data[0]:conf.dt.data;
    	 if(!datatemp){
    		 datatemp=conf.dt;
    	 }
      var tit = datatemp.filename;
   	 
      var $tag;
		
      if ( tit )
      {
    	var filepk=datatemp.pkfile;
        $tag = $( this.getTagStr( tit, conf.id,datatemp,conf.fileid) );
     
        ( this.$target.length > 0 ) ? this.$target.before( $tag ) : this.$tList.append( $tag );
       // ( conf.stars != 'undefined' ) && this.initStars( $tag, conf.stars );
        ( typeof conf.fun === 'function' ) && conf.fun( $tag );
      }
    },

    // 删除标签
    remove: function () {
      var _this = this;
      var $parent;

      this.bindEvent( function ( $target ) {
        if ( $target.hasClass( 'del' ) )
        {
          $parent = $target.parents( '.tag' );
          _this.data[_this.tag+'id'] = $parent.attr( 'id' );
          _this.removefun(_this.data);
          $parent.remove();
//          _this.asyQuery( _this.urls.remove, function () {
//            $parent.css( {
//              opacity: 0
//            } );
//            setTimeout( function () {
//              $parent.remove();
//            }, 600 );
//          } );
        }
      } );
    },

    // 将联系标签转化为确认标签
    addConversion: function () {
     
    },

    // 加载星级
    initStars: function ( $tag, num ) {
      var $stars = $tag.find( '.stars_fg' );
      var sBase = 19;
      $stars.length > 0 && $stars.width( sBase*num );
    },

    // 修改星级
    modifyStars: function ( $tag ) {
     
 
    },

    bindEvent: function ( fn ) {
      var _this = this;

      this.$el.bind( 'click', function ( evt ) {
        var et = evt || window.event;
        var $target = $( et.target || et.srcElement );

        fn.call( _this, $target );
        return false;
      } );
    },

    clearTags: function () {
      var $childs = this.$tList.children();
      var $item;

      $childs.each( function ( i, item ) {
        $item = $( item );
        !$item.hasClass( 'addTag' ) && $item.remove();
      } );
    },

    asyQuery: function ( url, fun, type ) {
      var _this = this;
      var param = {
        params: JSON.stringify( this.data )
      };
      var ty = ( type == 'init' ) ? true : false;

      $.ajax( {
        url: url,
        type: this.type || 'GET',
        data: ( this.type == 'POST' ) ? param : this.data,
        contentType : "application/json", 
        dataType: 'json',
        success: function ( dt ) {
          if ( dt.status === 1||dt.err==0 )
          {
            ( typeof fun === 'function' ) && fun( dt );
          }
          else
          {
        	 
        	 
          }
        }
      } );
    }
  }

  return {
    init: Tags
  }
} )