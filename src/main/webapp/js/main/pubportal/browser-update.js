! function() {
	function e(e) {
		var o = {},
			r = e.lang;
		"top" == e.mode ? (o.style = "top: -55px", o.mode = "top") : (o.style = "bottom: -55px", o.mode = "bottom");
		var n = u[r] ? u[r] : u["zh-cn"];
		return '<div class="ui-upbrowser-wraper ui-upbrowser-banner-wraper"  id="ui-upbrowser-wraper" style="' + o.style + '" mode="' + o.mode + '">            <div class="ui-upbrowser-banner-left">                 <span class="ui-upbrowser-h2">' + n.title + '</span>                 <span class="ui-upbrowser-banner-right-info">' + n.desc + '</span>                <a href="' + e.landingPage + '" style="margin-right:16px;" target="_blank"> ' + n.viewMore + "</a> " + i(e.browserConfig) + '            </div>            <span class="ui-ubr-close-btn-big" > </span>        </div>'
	}

	function i(e) {
		for(var i = "", o = 0; o < e.length; o++) {
			var r = e[o],
				n = h[r];
			i += '<a href="' + n.url + '" target="_blank"><i class="ui-upbrowser-icon-s ' + n.smallicon + '"></i></a>'
		}
		return i
	}

	function o(e) {
		for(var i = "", o = e.lang, r = e.browserConfig, n = c[o] ? c[o] : c["zh-cn"], t = "", s = 0; s < r.length; s++) {
			var a = r[s],
				d = h[a];
			2 == s && (t = 'style="margin-right:0"'), i += "<li " + t + '>            <a href="' + d.url + '" target="_blank" >            <div class="' + d.icon + '"></div>             <label>' + n[a] + '</label>             <span class="btn-download-link" >' + n.download + "</span>            </a>        </li> "
		}
		return i
	}

	function r(e) {
		var i = e.lang,
			r = c[i] ? c[i] : c["zh-cn"];
		return '<div class=".ui-upbrowser-wraper">         <div class="ui-upbrowser-bg"> </div>         <div class="ui-upbrowser-float-win-wraper">             <div class="ui-upbrowser-wraper ui-upbrowser-float-win" style="position: relative;">                 <i class="ui-ubr-close-btn ui-ubr-close-btn-abs"></i>                 <div style="padding: 23px 40px 0 40px;">                     <div class="ui-upbrowser-tipinfo">                         <h2>' + r.title + "</h2>                         <p>" + r.desc + '</p>                         <p class="ui-upbrowser-tipinfo-sub"><i class="ui-upbrowser-icon-warning"></i>' + r.info + '</p>                     </div>                     <ul class="ul-browser" style="margin-top: 30px;">' + o(e) + '</ul>                     <div class="ui-upbrowser-win-bottom">      <div class="ui-brower-chexbox" style="text-align: left; margin-left:20px"><input type="checkbox" id="browerCheckbox" class="ui-browser-checkbtn"  style="margin-right:12px"/><label >禁止此页再显示对话框</label></div>                     <a class="ui-upbrowser-orange-btn" style="display:none" href="' + e.landingPage + '" target="_blank">' + r.viewMore + "</a>                     </div>                 </div>             </div>         </div>     </div>"
	}

	function n() {
		var e = window.navigator.userAgent,
			i = e.indexOf("MSIE ");
		return i > 0 || navigator.userAgent.match(/Trident.*rv\:11\./) ? parseInt(e.substring(i + 5, e.indexOf(".", i))) : 999
	}

	function t(e, i, o) {
		var i = e.getAttribute("mode");
		if("bottom" == i) var r = setInterval(function() {
			s(e, "bottom", -65, function() {
				document.body.removeChild(e)
			})
		}, 20);
		else var r = setInterval(function() {
			s(e, "top", -65, function() {
				document.body.removeChild(e)
			})
		}, 20);
		e.setAttribute("interid", r)
	}

	function s(e, i, o, r) {
		var n = parseInt(e.style[i]);
		if(n || (n = 0), n != o) {
			var t = .1 * (o - n);
			Math.abs(t) < 1 && (t = 0 > t ? -1 : 1), n += t, e.style[i] = n + "px"
		} else {
			var s = e.getAttribute("interid");
			clearInterval(s), e.setAttribute("interid", "0"), r && r()
		}
	}

	function a(e, i, o) {
		var r = new Date;
		r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3);
		var n = "expires=" + r.toUTCString();
		document.cookie = e + "=" + i + "; " + n
	}

	function d(e, i) {
		function o(e) {
			if(1 == e.nodeType)
				if(-1 != e.className.indexOf(i)) r.push(e);
				else
					for(e = e.firstChild; e;) o(e, i), e = e.nextSibling
		}
		var r = [];
		return o(e, i), r
	}

	function l(e) {
		e || (e = {
			mode: "bottom"
		}),this.mode = e.mode, this.lang = e.lang, this.version = e.version, this.onShow = e.onShow, this.onHide = e.onHide, this.landingPage = e.landingPage ? e.landingPage : "https://activities.alibaba.com/go/rgn/alibaba/browser-update.php", this.IEVersion = n(), e.browserConfig && (this.browserConfig = e.browserConfig), e.debug && (this.IEVersion = e.debug), this.parseMode(e.displayConfig), this.IEVersion <= this.displayVersion && this.render()
		self = this;
		
		if(window.sessionStorage.getItem("browserCheck") && window.sessionStorage.getItem("browserCheck") == 'true'){
			this.hide();
		}
	}
	var u = {
			"zh-cn": {
				title: "\u4f60\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e",
				desc: "\u4e3a\u4fdd\u969c\u4f60\u7684\u6d4f\u89c8\u4f53\u9a8c\uff0c\u5efa\u8bae\u4f60\u7acb\u5373\u5347\u7ea7\u6d4f\u89c8\u5668\uff01",
				viewMore: "\u4e86\u89e3\u8be6\u60c5>"
			},
			"en-us": {
				title: "Update Your Browser",
				desc: "Please download an up-to-date browser from the sidebar in the right.",
				viewMore: "Learn more"
			},
			"zh-tw": {
				title: "\u4f60\u4f7f\u7528\u7684\u700f\u89bd\u5668\u7248\u672c\u904e\u4f4e",
				desc: "\u5efa\u8b70\u4f60\u7acb\u5373\u5347\u7d1a\u700f\u89bd\u5668\uff0c\u4f60\u53ef\u4ee5\u9ede\u64ca\u53f3\u908a\u7684\u5716\u6a19\u9032\u884c\u5347\u7d1a\u3002",
				viewMore: "\u4e86\u89e3\u8a73\u60c5>"
			}
		},
		c = {
			"zh-cn": {
				title: "\u4f60\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e",
				desc: "\u4e3a\u4fdd\u969c\u4f60\u7684\u6d4f\u89c8\u4f53\u9a8c\uff0c\u5efa\u8bae\u4f60\u7acb\u5373\u5347\u7ea7\u6d4f\u89c8\u5668\uff01",
				info: "\u5fae\u8f6f\u5df2\u505c\u6b62\u5bf9IE6~8 \u7684\u5b89\u5168\u66f4\u65b0\uff0c\u4f60\u7684\u6d4f\u89c8\u5668\u53ef\u80fd\u5b58\u5728\u5b89\u5168\u98ce\u9669\u3002",
				chrome: "Google Chrome",
				firefox: "\u706b\u72d0\u6d4f\u89c8\u5668",
				360: "360\u6d4f\u89c8\u5668",
				ie: "IE\u6d4f\u89c8\u5668",
				download: "\u4e0b\u8f7d\u66f4\u65b0",
				viewMore: "\u4e86\u89e3\u8be6\u60c5>"
			},
			"en-us": {
				title: "Update Your Browser",
				desc: "Consider switching to a modern browser for a better experience.",
				info: "The browser you are using is out of date and does not support some of the features on this site. ",
				download: "Download Now",
				chrome: "Google Chrome",
				firefox: "Firefox Browser",
				360: "360 Browser",
				ie: "Internet Explorer",
				viewMore: "Learn more"
			},
			"zh-tw": {
				title: "\u4f60\u4f7f\u7528\u7684\u700f\u89bd\u5668\u7248\u672c\u904e\u4f4e",
				desc: "\u70ba\u4fdd\u969c\u4f60\u7684\u63a1\u8cfc\u9ad4\u9a57\uff0c\u5efa\u8b70\u4f60\u7acb\u5373\u5347\u7d1a\u700f\u89bd\u5668\uff01",
				info: "\u5fae\u8edf\u5df2\u505c\u6b62IE6~8\u7684\u5b89\u5168\u66f4\u65b0\uff0c\u4f60\u7684\u700f\u89bd\u5668\u53ef\u80fd\u5b58\u5728\u5b89\u5168\u98a8\u96aa",
				chrome: "Google Chrome",
				firefox: "\u706b\u72d0\u700f\u89bd\u5668",
				360: "360\u700f\u89bd\u5668",
				ie: "IE\u700f\u89bd\u5668",
				download: "\u4e0b\u8f09\u66f4\u65b0",
				viewMore: "\u4e86\u89e3\u8a73\u60c5>"
			}
		},
		h = {
			360: {
				url: "http://se.360.cn/",
				icon: "img-360",
				smallicon: "ui-upbrowser-icon-s-360",
				key: "360"
			},
			chrome: {
				url: "http://www.chromeliulanqi.com/",
				icon: "img-chrome",
				smallicon: "ui-upbrowser-icon-s-chrome",
				key: "chrome"
			},
			firefox: {
				url: "https://www.mozilla.org/",
				icon: "img-firefox",
				smallicon: "ui-upbrowser-icon-s-firefox",
				key: "firefox"
			},
			ie: {
				url: "http://windows.microsoft.com/zh-cn/internet-explorer/download-ie",
				icon: "img-ie",
				smallicon: "ui-upbrowser-icon-s-ie",
				key: "ie"
			}
		};
	l.prototype = {
		wraper: null,
		closeBtn: null,
		checkBtn:null,
		noRemindBtn: null,
		browserConfig: ["360", "chrome", "firefox"],
		parseMode: function(e) {
			var i = this.IEVersion;
			if(!e) return this.mode = "top", void(this.displayVersion = 8);
			if(e.length)
				for(var o = 0; o < e.length && !(i <= e[o].version && (this.mode = e[o].mode, this.displayVersion = e[o].version, "mask" == e[o].mode)); o++);
			else this.mode = e.mode, this.displayVersion = e.version
		},
		render: function() {
			"mask" == this.mode ? this.renderWin() : this.renderBanner(), "function" == typeof this.onShow && this.onShow()
		},
		renderWin: function() {
			window.scroll(0, 0);
			var e = document.createElement("DIV");
			e.innerHTML = r(this), this.wraper = e.childNodes[0], document.body.style.overflowY = "hidden", document.body.appendChild(this.wraper), this.addEvent()
		},
		renderBanner: function() {
			var i = document.createElement("DIV");
			i.innerHTML = e(this), this.wraper = i.childNodes[0], document.body.appendChild(this.wraper), this.addEvent(), this.fadeIn()
		},
		addEvent: function() {
			var e = this;
			var browserChecBox = document.getElementById('browerCheckbox');
			this.closeBtn = d(this.wraper, "ui-ubr-close-btn")[0], this.closeBtn.onclick = function() {
				e.hide()
			}, this.noRemindBtn = d(this.wraper, "ui-ubr-noremind-btn")[0], this.noRemindBtn && (this.noRemindBtn.onclick = function() {
				e.hide(), a("_browser_update_", "1", 30)
			})
			this.checkBtn = d(this.wraper, "ui-browser-checkbtn")[0], this.checkBtn.onclick = function() {
				if(window.localStorage){
					if(browserChecBox.checked){
						window.sessionStorage.setItem("browserCheck", 'true')
					}else{
						window.sessionStorage.removeItem("browserCheck")
					};
				}
				
			}
			
			
			
		},
		fadeIn: function() {
			var e, i, o = this.wraper;
			i = "top" == this.mode ? "top" : "bottom", e = setInterval(function() {
				s(o, i, 0)
			}, 20), o.setAttribute("interid", e)
		},
		hide: function() {
			"mask" != this.mode ? t(this.wraper, this.mode) : (document.body.removeChild(this.wraper), document.body.style.overflowY = "auto"), "function" == typeof this.onHide && this.onHide()
		}
	}, "object" == typeof module && module.exports ? module.exports = l : window.BrowserUpdate = l
}();