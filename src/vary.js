ksComm.apply(KS, {
  swfPath: 'js/online/code/test',
  swfObjid: 'ksSwfObjid',
  swfDivid: 'ksSwfDivid',
  flashLoaded: 0,
  loadSeconds: 0,
  cookieDefExpireHours: 432000,
  hasChecked: false,
  hasInstallFlash: true,
  loadInitVi: false,
  checkFlash: function() {
    var a = 0;
    var b = 0;
    if (ksComm.browser.msie) {
      try {
        var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (c) {
          a = 1;
          VSwf = c.GetVariable("$version");
          b = parseInt(VSwf.split(" ")[1].split(",")[0])
        }
      } catch (e) {}
    } else {
      if (navigator.plugins && navigator.plugins.length > 0) {
        var c = navigator.plugins["Shockwave Flash"];
        if (c) {
          a = 1;
          var d = c.description.split(" ");
          for (var i = 0; i < d.length; ++i) {
            if (isNaN(parseInt(d[i]))) continue;
            b = parseInt(d[i])
          }
        }
      }
    }
    return a == 1 && b >= 8
  },
  loadFlash: function() {
    var a = ksComm.$(KS.swfDivid);
    if (a == null) {
      setTimeout('KS.loadFlash()', 30);
      return
    }
    a.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + KS.__basePath.substring(0, KS.__basePath.indexOf('//')) + '//fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width=0 height=0 id="' + KS.swfObjid + '" class="noswap"><param name=movie value="' + KS.__basePath + KS.swfPath + '.swf"><param name="FlashVars" value="fName=ks_' + KS.__cas + '"><PARAM NAME="BGColor" VALUE="FFFFFF"><param name=quality value=high><PARAM NAME="Scale" VALUE="NoBorder"><param name="allowScriptAccess" value="always" /><embed src="' + KS.__basePath + KS.swfPath + '.swf" FlashVars="fName=ks_' + KS.__cas + '" quality=high width=0 height=0 type="application/x-shockwave-flash" pluginspage="' + KS.__basePath.substring(0, KS.__basePath.indexOf('//')) + '//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" name="' + KS.swfObjid + '" allowScriptAccess="always"></embed></object>';
    KS.flashLoaded = 1
  },
  getSwfObj: function() {
    return (navigator.appName.indexOf("Microsoft") != -1) ? window[KS.swfObjid] : document[KS.swfObjid]
  },
  saveFcData: function(a, b) {
    try {
      var f = this.getSwfObj();
      if (f && f.saveData) f.saveData(a, b)
    } catch (e) {}
  },
  loadFcData: function(a) {
    try {
      var f = this.getSwfObj();
      if (f && f.loadData) {
        return f.loadData(a)
      }
    } catch (e) {}
    return undefined
  },
  setCookie: function(a, b, c, d) {
    if (!d) {
      d = document.domain.match(/([\w]+\.(?:net|cn|com\.cn|com))(?![\w]+)$/g)
    }
    a = KS.__cas + '_' + a;
    var e = new Date();
    e.setTime(e.getTime() + c * 60 * 60 * 1000);
    document.cookie = a + '=' + escape(b) + ';expires=' + e.toGMTString() + ";path=/" + ((d == null) ? "" : ("; domain=" + d))
  },
  getCookie: function(a) {
    a = KS.__cas + '_' + a;
    var b = document.cookie.match(new RegExp('(^| )' + a + '=([^;]*)(;|$)'));
    if (b != null) {
      return unescape(b[2])
    } else {
      return null
    }
  },
  getVisitorSignFromCookie: function() {
    var a = 'KS_' + KS.__cas;
    var s = '';
    if (KS.hasInstallFlash) {
      s = this.loadFcData(a);
      if (s != null && s != '' && s != 'null') {
        this.setCookie(a, s, KS.cookieDefExpireHours);
        return s
      } else {
        s = this.getCookie(a);
        if (s != null && s != 'null' && s != '') {
          this.saveFcData(a, s);
          this.setCookie(a, s, KS.cookieDefExpireHours);
          return s
        } else {
          this.saveFcData(a, KS.visitorSign);
          this.setCookie(a, KS.visitorSign, KS.cookieDefExpireHours);
          KS.isNewVs = true;
          return KS.visitorSign
        }
      }
    } else {
      s = this.getCookie(a);
      if (s != null && s != 'null' && s != '') {
        return s
      } else {
        this.setCookie(a, KS.visitorSign, KS.cookieDefExpireHours);
        KS.isNewVs = true;
        return KS.visitorSign
      }
    }
  },
  getVisitorValueFromCookie: function(a, b) {
    var s = '';
    if (KS.hasInstallFlash) {
      s = this.loadFcData(a);
      if (s != null && s != 'null' && s != '') {
        return s
      }
    }
    s = this.getCookie(a);
    if (s != null && s != 'null' && s != '') {
      return s
    } else {
      return (typeof b == 'undefined') ? '' : b
    }
  },
  setVisitorValueToCookie: function(a, b) {
    if (KS.hasInstallFlash) {
      this.saveFcData(a, b)
    }
    KS.setCookie(a, b, KS.cookieDefExpireHours)
  },
  delVisitorValueCookie: function(a) {
    if (KS.hasInstallFlash) {
      KS.saveFcData(a, '')
    }
    KS.setCookie(a, '', 0)
  },
  operCorrIp: function() {
    if (KS.loadSeconds > 5 && !KS.loadInitVi) {
      KS.initVi()
    } else if (KS.loadSeconds <= 5 && !KS.loadInitVi) {
      setTimeout('KS.operCorrIp()', 100)
    }
  },
  checkBrowser: function(a) {
    if (a) {
      var s = (KS.ksvcode || '') + (KS.rivcode || '');
      if (s) {
        var i = 0,
          len = s.length,
          r = 0;
        do {
          r += s.charCodeAt(i) & 0xFF
        } while (++i < len);
        a['cbr'] = r
      }
    }
  }
});
document.write('<div id="' + KS.swfDivid + '"></div>');
if (KS.cwAdvSound) {
  var soundUrl = KS.__basePath + 'sound/sound000.wav';
  if (ksComm.browser.msie) {
    document.write(' <OBJECT id="SysSoundPlayer"');
    document.write(' classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6"');
    document.write(' width=0 height=0 > <param name="URL" value="' + soundUrl + '" /> <param name="AutoStart" value="false" /> </OBJECT>')
  } else {
    if (ksComm.browser.chrome) {
      soundUrl = KS.__basePath + 'sound/sound000.mp3'
    }
    document.write('<audio id="SysSoundPlayer" src="' + soundUrl + '"></audio>')
  }
}
var plupload;
var imgUploader, imgInitUploderFlag;
var fileUploader, fileInitUploderFlag;
var nicEditor = function(n) {
    var p = this.options = {
      clientSendMsgNum: 0
    };
    var q;
    var r;
    this.nicInstances = [];
    var u = {
      cmd: {
        bold: {
          name: 'blod',
          command: 'Blod',
          icon: 'oc_ed_bold.gif',
          title: kslang.oc_editor_blod_title,
          flag: true,
          evts: {
            'click': function() {
              toEditFoucs();
              toEditStyle({
                'font-weight': 'bold'
              })
            }
          },
          icon2015: 'fontpanel_btn.png',
          icon2015Bg: '0px 0px'
        },
        italic: {
          name: 'italic',
          command: 'Italic',
          icon: 'oc_ed_italic.gif',
          title: kslang.oc_editor_italic_title,
          flag: true,
          evts: {
            'click': function() {
              toEditFoucs();
              toEditStyle({
                'font-style': 'italic'
              })
            }
          },
          icon2015: 'fontpanel_btn.png',
          icon2015Bg: '-50px 0px'
        },
        underline: {
          name: 'underline',
          command: 'Underline',
          icon: 'oc_ed_underline.gif',
          title: kslang.oc_editor_underline_title,
          flag: true,
          evts: {
            'click': function() {
              toEditFoucs();
              toEditStyle({
                'text-decoration': 'underline'
              })
            }
          },
          icon2015: 'fontpanel_btn.png',
          icon2015Bg: '-100px 0px'
        },
        forecolor: {
          name: 'forecolor',
          id: 'forecolor_cmd',
          command: 'forecolor',
          icon: 'oc_ed_forecolor.gif',
          title: kslang.oc_editor_forecolor_title,
          links: ['fontColors'],
          icon2015: 'fontpanel_btn.png',
          icon2015Bg: '-150px 0px'
        },
        fontsize: {
          name: 'fontsize',
          command: 'fontsize',
          title: kslang.oc_editor_fontsize_title,
          type: 'select',
          items: [{
            '8pt': '8pt',
            '10pt': '10pt',
            '12pt': '12pt',
            '14pt': '14pt',
            '18pt': '18pt',
            '24pt': '24pt'
          }, 'fontSize']
        },
        fontname: {
          name: 'fontname',
          command: 'fontname',
          title: kslang.oc_editor_fontname_title,
          type: 'select',
          items: [{
            'SimSun': '宋体',
            'SimHei': '黑体',
            'KaiTi_GB2312': '楷体',
            'NSimSun': '新宋体',
            'Arial': 'Arial',
            'Tahoma': 'Tahoma'
          }, 'fontFamily']
        },
        emotions: {
          name: 'emotions',
          icon: 'oc_ed_emotions.gif',
          title: kslang.oc_editor_emotion_title,
          links: ['showEmotions'],
          dirBg: '0px -50px'
        },
        print: {
          name: 'print',
          icon: 'oc_ed_print.gif',
          title: kslang.oc_editor_print_title,
          display: ['opera'],
          evts: {
            'click': function() {
              ksComm.printMsgAreaHtml('msgArea')
            }
          },
          dirBg: '-350px -50px'
        },
        sendfile: {
          name: 'sendfile',
          icon: 'oc_ed_sendfile.gif',
          text: kslang.oc_editor_sendfile_text,
          checkStatus: 'true',
          title: kslang.oc_editor_sendfile_title,
          css: 'nicEdit-sendfile',
          links: ['sendFile'],
          dirBg: '-250px -50px'
        },
        sendimg: {
          name: 'sendimg',
          icon: 'oc_ed_sendimg.png',
          text: kslang.oc_editor_sendimg_text,
          checkStatus: 'true',
          title: kslang.oc_editor_sendimg_title,
          css: 'nicEdit-sendfile',
          links: ['sendImg'],
          dirBg: '-100px -50px'
        },
        cutpic: {
          name: 'cutpic',
          icon: 'oc_ed_cutpic.gif',
          title: kslang.oc_editor_cutpic_title,
          display: ['gecko', 'chrome', 'opera', 'firefox'],
          text: kslang.oc_editor_cutpic_text,
          evts: {
            'click': startCapture
          },
          dirBg: '-300px -50px'
        },
        serviceassess: {
          name: 'serviceassess',
          icon: 'oc_ed_serviceassess.gif',
          text: kslang.oc_editor_evaluate_text,
          title: kslang.oc_editor_evaluate_title,
          evts: {
            'click': function() {
              if (!ksOnlineChat.openServiceEvaluateWin(true)) {
                return false
              }
            }
          },
          dirBg: '-50px -50px'
        },
        clearwindow: {
          name: 'clearwindow',
          icon: 'oc_ed_clearwindow.gif',
          text: kslang.oc_editor_clearwindow_text,
          title: kslang.oc_editor_clearwindow_title,
          evts: {
            'click': function() {
              if (window.confirm(ksComm.getLang('oc_editor_clearwindow_confirm'))) {
                ksComm.$('msgArea').innerHTML = ''
              }
            }
          },
          dirBg: '-200px -50px'
        },
        quickask: {
          name: 'quickask',
          icon: 'oc_ed_arrow.gif',
          text: kslang.oc_editor_quickask_text,
          'float': 'right',
          css: 'nicEdit-quickask',
          title: kslang.oc_editor_quickask_title,
          links: ['quickaskPanel']
        },
        map: {
          name: 'map',
          icon: 'oc_icon_map.gif',
          text: kslang.oc_editor_map_text,
          title: kslang.oc_editor_map_title,
          'float': 'right',
          evts: {
            'click': function() {
              ksOnlineChat.openMapWin()
            }
          },
          dirBg: '-400px -50px'
        },
        saverecord: {
          name: 'saverecord',
          icon: 'oc_ed_saverecord.gif',
          display: ['gecko', 'chrome', 'opera'],
          title: kslang.oc_editor_saverecord_title,
          evts: {
            'click': function() {
              ksComm.saveMsgAreaHtml('msgArea')
            }
          },
          dirBg: '-150px -50px'
        },
        translate: {
          name: 'translate',
          icon: 'oc_icon_translate.gif',
          text: kslang.oc_editor_translate_text,
          checkStatus: 'true',
          'float': 'right',
          css: 'nicEdit-fontpanel',
          title: kslang.oc_editor_translate_title,
          links: ['transPanel'],
          dirBg: '-550px -50px'
        },
        fontpanel: {
          name: 'fontpanel',
          icon: 'oc_ed_fontpanel.gif',
          title: kslang.oc_editor_fontpanel_title,
          css: 'nicEdit-fontpanel',
          links: ['fontname', 'fontsize', 'bold', 'italic', 'underline', 'forecolor'],
          dirBg: '-600px -50px'
        },
        freeCall: {
          title: kslang.oc_icon_freeCall,
          evts: {
            'click': function() {
              if (KS.ocCfg.btnVisible.freeCall == true && KS.fpCfg.fpDefinedEnabled == true) {
                ksOnlineChat.openOtherWin('getFcp.htm', KS.isDir, true)
              }
            }
          },
          dirBg: '-450px -50px'
        },
        leaveMsg: {
          title: kslang.oc_icon_leaveMsg,
          evts: {
            'click': function() {
              ksOnlineChat.openLeaveWin()
            }
          },
          dirBg: '-500px -50px'
        }
      },
      iconsBasePath: KS.__basePath + 'images/chat/comm/',
      buttonList: function() {
        return KS.is2015 ? ['fontpanel', 'emotions', 'saverecord', 'print', 'sendfile', 'sendimg', 'cutpic', 'serviceassess', 'clearwindow', 'faq', 'quickask', 'map', 'freeCall', 'leaveMsg', 'translate'] : KS.isDir ? ['fontpanel', 'emotions', 'saverecord', 'print', 'serviceassess', 'sendfile', 'sendimg', 'cutpic', 'clearwindow', 'faq', 'quickask', 'map', 'translate'] : ['fontpanel', 'emotions', 'saverecord', 'print', 'sendfile', 'sendimg', 'cutpic', 'serviceassess', 'clearwindow', 'faq', 'quickask', 'map', 'translate']
      }()
    };
    var w;
    var x;
    var y;
    this.getButtonList = function() {
      return u.buttonList
    };
    this.setPanel = function(b) {
      w = ksComm.$(b);
      if (!w) return;
      w.appendChild(getLinkdivPanel());
      w.appendChild(B());
      var c = u.buttonList;
      for (var i = 0; i < c.length; i++) {
        if (KS.ocCfg.btnVisible[c[i]] == true) {
          x.appendChild(bdCommd(u.cmd[c[i]]))
        }
      }
      addEvent(w, 'mousedown', function() {
        var e = getEvent();
        if (e) {
          var a = e.srcElement || e.target;
          if (a.tagName != 'SELECT') {
            if (e.preventDefault) {
              e.preventDefault()
            }
            if (e.stopPropagation) {
              e.stopPropagation()
            }
          }
        }
      })
    };
    var z = ksComm.browser ? ksComm.browser : {};
    if (navigator.userAgent) {
      var A = navigator.userAgent.toLowerCase();
      z.other = KS.__isMobile ? true : false;
      var s;
      (s = A.match(/(msie\s|trident.*rv:)(\w+)/)) ? z.ie = s[2] : (s = A.match(/firefox\/([\d.]+)/)) ? z.firefox = s[1] : (s = A.match(/chrome\/([\d.]+)/)) ? z.chrome = s[1] : z.other = true
    } else {
      z.other = true
    }
    this.addInstance = function(a) {
      q = a;
      r = ksComm.$(a);
      if (z.other && isDiv()) {
        var b = b$('textarea', a);
        b.style.cssText = 'height:84px;width:99%;padding:0px 3px;overflow-y:auto;word-wrap:break-word;';
        r.parentNode.appendChild(b);
        r.parentNode.removeChild(r);
        r = b
      } else {
        r.setAttribute('contentEditable', 'true')
      }
      r.style.overflowX = 'hidden';
      r.style.overflowY = 'auto';
      r.style.wordWrap = 'break-word';
      r.style.border = '0px';
      if (typeof p.newlineTag == 'undefined') {
        p.newLineTag = '<br/>'
      } else {
        p.newLineTag = p.newlineTag.toLowerCase()
      }
      if (p.newLineTag == 'br') {
        var c = 'keydown';
        addEvent(r, c, replaceP2Br.closureListener(r))
      }
      var d;
      addEvent(r, 'focus', function() {
        ksOnlineChat.hasNewMsg = false
      });
      addEvent(r, 'blur', function() {
        ksOnlineChat.hasNewMsg = true
      });
      this.nicInstances.push(this);
      try {
        r.focus()
      } catch (e) {}
    };
    this.getInstance = function() {
      return r
    };

    function isText() {
      return r.tagName.toUpperCase() == 'TEXTAREA'
    }
    function isDiv() {
      return r.tagName.toUpperCase() == 'DIV'
    }
    var B = this.getButdivPanel = function() {
        if (x) {
          return x
        }
        x = b$('DIV');
        x.setAttribute('unselectable', 'on');
        x.className = 'nicEdit-panelContain';
        x.style.cssText = 'position:relative;height:100%;padding-left:5px;';
        return x
      };

    function getLinkdivPanel() {
      if (y) {
        return y
      }
      y = b$('DIV');
      y.setAttribute('unselectable', 'on');
      y.style.cssText = 'position:absolute;height:0px;';
      return y
    }
    this.getContentText = function() {
      if (isText()) return r.value;
      if (ksComm.browser.msie) {
        return r.innerText
      } else {
        return r.textContent
      }
    };
    this.setContent = function(a) {
      if (isText()) r.value = a;
      if (isDiv()) r.innerHTML = a
    };

    function addEvent(a, b, c) {
      (a.addEventListener) ? a.addEventListener(b, c, false) : a.attachEvent("on" + b, c)
    }
    function delEvent(a, b, c) {
      (a.removeEventListener) ? a.removeEventListener(b, c, false) : a.detachEvent("on" + b, c)
    }
    function b$(a, b) {
      var o = document.createElement(a);
      if (b) o.id = b;
      return o
    }
    function bdBUT(a) {
      var b = document.createElement('DIV', a);
      b.setAttribute('unselectable', 'on');
      b.className = 'nicEdit-button-default';
      b.style.cssText = 'font-size:12px;position:relative;font-family:Tahoma;float:left;white-space:nowrap;margin:2px 3px;cursor:pointer;';
      addEvent(b, 'mouseover', butMOver.closureListener(b));
      addEvent(b, 'mouseout', butMOut.closureListener(b));
      return b
    }
    function bcLinkDiv(a) {
      var b = b$('DIV', a);
      b.setAttribute('unselectable', 'on');
      b.style.cssText = 'position:absolute;bottom:0px;display:none;vertical-align: bottom;';
      return b
    }
    function butMOver() {
      this.className = 'nicEdit-button-hover';
      if (KS.isDir) {
        if (checkHasLinkdiv(this)) {} else {
          var c = this.getElementsByTagName('div')[0];
          if (c) {
            var d = c.style;
            if (KS.is2015 && this.parentNode && this.parentNode.id && this.parentNode.id == 'fontpanel_link') {
              var e = this.getAttribute("flag");
              if ((e || 'true' == e) && c.getAttribute('hasOver') == 'true') {} else {
                d.backgroundPosition = d.backgroundPosition.replace(/(\d+)px$/, function(a, b) {
                  return '50px'
                })
              }
            } else {
              d.backgroundPosition = d.backgroundPosition.replace(/(\d+)px$/, function(a, b) {
                return (parseInt(b, 10) + 50) + 'px'
              })
            }
            c.setAttribute('hasOver', 'true')
          }
        }
      }
    }
    function checkHasLinkdiv(a) {
      var b = a.getAttribute("linkdiv");
      var c;
      if (b) {
        c = ksComm.$(b)
      }
      return c && c.style.display == "block"
    }
    function butMOut() {
      if (checkHasLinkdiv(this)) {} else {
        var c = this.getAttribute("flag");
        if (!c || 'false' == c) {
          this.className = 'nicEdit-button-default';
          if (KS.isDir) {
            var d = this.getElementsByTagName('div')[0];
            if (d) {
              if (d.getAttribute('hasOver') != 'true') {} else {
                var e = d.style;
                if (this.parentNode.id && this.parentNode && this.parentNode.id == 'fontpanel_link') {
                  e.backgroundPosition = e.backgroundPosition.replace(/(\d+)px$/, function(a, b) {
                    return '0px'
                  })
                } else {
                  e.backgroundPosition = e.backgroundPosition.replace(/(\d+)px$/, function(a, b) {
                    return (parseInt(b, 10) - 50) + 'px'
                  })
                }
                d.setAttribute('hasOver', 'false')
              }
            }
          }
        }
      }
    }
    function bdIMG(a) {
      var b = b$('IMG');
      b.style.cssText = 'vertical-align:text-bottom;';
      b.src = a;
      b.border = '0';
      return b
    }
    function bdSELECT(a, b) {
      var c = b$('SELECT');
      var d;
      if (b) {
        d = b$('option');
        d.setAttribute('value', '');
        d.innerHTML = kslang.oc_editor_default;
        c.appendChild(d)
      }
      for (var e in a) {
        d = b$('option');
        d.setAttribute('value', e);
        d.innerHTML = a[e];
        c.appendChild(d)
      }
      c.style.cssText = 'margin:0px;padding:0px;font-size=10px;';
      return c
    }
    function bdCommd(a) {
      var o = bdBUT();
      if ('select' == a.type) {
        var b = a.items;
        var c = bdSELECT(b[0], true);
        addEvent(c, 'change', function() {
          r.style[b[1]] = c.value;
          C[b[1]] = c.value
        });
        if (a.title) c.setAttribute('title', a.title);
        if (!ksComm.browser.msie && a.title) c.setAttribute('title', '<ks:ln k="oc_editor_' + a.name + '_title">' + a.title + '</ks:ln>');
        o.appendChild(c)
      } else {
        if (a.title) o.setAttribute('title', '<ks:ln k="oc_editor_' + a.name + '_title">' + a.title + '</ks:ln>')
      }
      if (a.id) {
        o.id = a.id
      }
      var d;
      if (KS.isDir && a.dirBg) {
        d = document.createElement('DIV');
        if (KS.is2015) {
          d.setAttribute('class', 'k_s_ol_pngFix');
          d.style.cssText = 'width:32px;height:24px;float:left;background:url("' + KS.__basePath + 'images/dchat/comm/qieqie.png") ' + a.dirBg + ';'
        } else {
          d.style.cssText = 'width:32px;height:24px;float:left;background:url("' + KS.__basePath + 'images/dchat/comm/dir_icons.gif") ' + a.dirBg + ';'
        }
        o.style.marginRight = '0px';
        o.style.marginLeft = '0px'
      } else if (a.icon && !KS.is2015) {
        d = bdIMG(u.iconsBasePath + a.icon)
      } else if (KS.is2015 && a.icon2015 && a.icon2015Bg) {
        addEvent(o, 'click', clickfontPanleBtn.closureListener(o));
        d = document.createElement('DIV');
        d.setAttribute('class', 'k_s_ol_pngFix');
        d.style.cssText = 'width:21px;height:19px;float:left;background:url("' + KS.__basePath + 'images/dchat/comm/' + a.icon2015 + '") ' + a.icon2015Bg + ';'
      }
      if (a.height) {
        d.style.height = a.height
      }
      if (d) o.appendChild(d);
      if (!KS.isDir && a.text) {
        o.innerHTML += '<span style="padding-left:3px;"><ks:ln k="' + a.name + '">' + a.text + '</ks:ln></span>'
      }
      if (a['float'] && !KS.is2015) {
        o.style['styleFloat'] = a['float'];
        o.style.cssFloat = a['float']
      }
      if (a.evts) {
        var e = a.evts;
        for (var t in e) {
          addEvent(o, t, e[t])
        }
      }
      var f = a.links;
      if (f) {
        var g = a.name + '_link';
        o.setAttribute('linkdiv', g);
        addEvent(o, 'click', butShow.closure(o, a))
      }
      if (a.flag) {
        o.setAttribute('flag', 'false');
        addEvent(o, 'click', function() {
          this.setAttribute("flag", 'false' == this.getAttribute("flag") ? 'true' : 'false')
        }.closureListener(o))
      }
      if (a.checkStatus) {
        o.setAttribute("check", "true")
      }
      var h = a.display;
      if (h) {
        for (var i = 0; i < h.length; i++) {
          if (ksComm.browser[h[i]]) {
            o.style.display = 'none';
            o.setAttribute('checkDisplay', true);
            break
          }
        }
      }
      if (KS.isDir && !KS.is2015 && a.name == 'serviceassess') {
        var g = 'oc_se_win';
        o.setAttribute('linkdiv', g);
        addEvent(o, 'click', butShow.closure(o, a))
      }
      return o
    }
    function butShow(b) {
      var f = this.getAttribute("check");
      var g = this.getAttribute("linkdiv");
      var k;
      if (g) {
        k = ksComm.$(g);
        var h = b.links;
        if (h) {
          if (!k) {
            var t;
            k = bcLinkDiv(g);
            if (b.css) {
              k.className = b.css
            }
            for (var i = 0; i < h.length; i++) {
              t = u.cmd[h[i]];
              if (t) {
                k.appendChild(bdCommd(t))
              } else {
                eval('k.appendChild(' + h[i] + '())')
              }
              y.appendChild(k)
            }
          }
        }
      }
      if (!k) return;
      if (b.name != 'serviceassess' && !(this.parentNode == x)) {
        if (k.style.display == 'none') {
          k.style.display = 'block'
        } else {
          k.style.display = 'none'
        }
        return
      }
      if (f == 'true') {
        if (ksOnlineChat.chatStatus >= 2) {
          var j = this.getAttribute('title');
          alert(ksComm.getLang('oc_editor_alertStatus0(' + (j ? '"' + j.replace(/<ks:ln k="(.*?)">.*?<\/ks:ln>/gi, '$1') + '")' : ')')));
          k.style.display = 'none';
          return
        }
      }
      if (k.style.display == 'none') {
        if (b.name != 'serviceassess') {
          ksComm.$('oc_se_win').style.display = 'none'
        } else {
          if (KS.isDir) {
            if (ksOnlineChat.chatStatus == 0 || ksOnlineChat.chatStatus == 4) {
              return
            } else if (ksOnlineChat.chatStatus > 1) {
              return
            }
          }
        }
        var c = y.firstChild;
        while (c) {
          if (!c) {
            break
          }
          c.style.display = 'none';
          c = c.nextSibling
        }
        if (KS.isDir) {
          k.style.width = ksComm.$('userOptiv').clientWidth - 2 + 'px'
        } else {
          k.style.width = (ksComm.$('chatTopArea').clientWidth - 18) + 'px'
        }
        k.style.display = 'block';
        if (b.name == 'emotions') {
          var d = document;
          var l = this;
          var m = d.onmousedown;
          d.onmousedown = function() {
            var e = getEvent();
            var a = e.srcElement || e.target;
            if (a) {
              while (a) {
                if (a == k || a.parentNode == l.parentNode) {
                  return
                }
                a = a.parentNode
              }
              k.style.display = 'none';
              d.onmousedown = m;
              var o = x.firstChild;
              while (o) {
                butMOut.closureListener(o)();
                o = o.nextSibling
              }
            }
          }
        }
        var o = x.firstChild;
        while (o) {
          butMOut.closureListener(o)();
          o = o.nextSibling
        }
        if (b.name == 'sendimg') {
          if (plupload) {
            getImgPlupload()
          } else {
            new ksComm.JSONRequest(KS.__basePath + 'js/plupload/plupload.full.min.js', null, null, getImgPlupload)
          }
        }
        if (b.name == 'sendfile') {
          if (plupload) {
            getFileUploader()
          } else {
            new ksComm.JSONRequest(KS.__basePath + 'js/plupload/plupload.full.min.js', null, null, getFileUploader)
          }
        }
      } else {
        k.style.display = 'none';
        if (b.name == 'sendimg' && imgUploader) {
          ksComm.$('ksSendImgFileName').value = '';
          imgUploader.destroy();
          imgInitUploderFlag = false
        }
        if (b.name == 'sendfile' && fileUploader) {
          ksComm.$('ksSendFileName').value = '';
          fileUploader.destroy();
          fileInitUploderFlag = false
        }
      }
    }
    function getStyle(a, d) {
      return d.style[a]
    }
    function moveStyle(a, o) {
      o.style.cssText = o.style.cssText.toLowerCase().replace(new RegExp(a.toLowerCase() + ':.*?(;|$)'), '')
    }
    function toEditFoucs(o) {
      if (o) {
        o.focus()
      } else {
        r.focus()
      }
    }
    function clickfontPanleBtn() {
      var c = this.getElementsByTagName('div')[0];
      if (c) {
        var d = c.style;
        var e = this.getAttribute("flag");
        d.backgroundPosition = d.backgroundPosition.replace(/(\d+)px$/, function(a, b) {
          return '100px'
        })
      }
    }
    function getImgPlupload() {
      ksComm.$('ksSendImgFileName').value = '';
      if (!imgInitUploderFlag) {
        imgUploader = new plupload.Uploader({
          runtimes: 'html5,flash,browserplus,html4,gears',
          browse_button: ksComm.$('ksSendImg'),
          url: KS.__filePath,
          flash_swf_url: KS.__basePath + 'js/plupload/Moxie.swf',
          filters: {
            max_file_size: (KS.onlineFileNum ? KS.onlineFileNum : 1) + 'mb',
            prevent_duplicates: true
          },
          multiple_queues: false,
          multi_selection: false,
          multipart_params: {
            ri: KS.__ri,
            si: KS.__si,
            ci: KS.__ci,
            sn: KS.__name,
            lng: KS.__lng,
            isImg: 1
          },
          init: {
            PostInit: function() {
              imgInitUploderFlag = true;
              ksComm.$('ks_sendImg_btn').onclick = function() {
                if (ksOnlineChat.chatStatus >= 2) {
                  alert(ksComm.getLang('oc_editor_alertfile0'));
                  return false
                }
                if (imgUploader.files.length == 0) {
                  alert(ksComm.getLang('oc_editor_alertfile1'));
                  return false
                }
                var a = imgUploader.files;
                for (var i = 0, len = imgUploader.files.length; i < len; i++) {
                  var f = a[i].name;
                  if (!f) {
                    alert(ksComm.getLang('oc_editor_alertfile1'))
                  }
                  if (!(/(?:jpg|gif|png|jpeg)$/i.test(f))) {
                    alert(kslang.oc_js_fileSendFail);
                    return false
                  }
                  ksComm.$('ksSendImgFileName').value = a[i].name;
                  if (!a[i].size) {
                    if (KS.__isDebug || KS.__isInTest) {
                      ksOnlineChat.insertSysDialogMsg('本地获取文件大小错误')
                    }
                  }
                }
                imgUploader.start();
                return false
              }
            },
            QueueChanged: function(a) {
              if (imgUploader.files.length > 1) {
                imgUploader.files.splice(0, imgUploader.files.length - 1)
              }
            },
            FilesAdded: function(a, b) {
              ksComm.$('ksSendImgFileName').value = '';
              for (var i = 0, len = b.length; i < len; i++) {
                ksComm.$('ksSendImgFileName').value += b[i].name
              }
            },
            FileUploaded: function(a, b, c) {
              if (KS.isDir) {
                eval(c.response.substring(c.response.indexOf('<script>parent.') + '<script>parent.'.length, c.response.lastIndexOf('</script>')))
              } else {
                eval(c.response.substring(c.response.indexOf('<script>') + '<script>'.length, c.response.lastIndexOf('</script>')))
              }
            },
            Error: function(a, b) {
              if (KS.onlineFileNum) {
                kslang.oc_js_fileSendFail = kslang.oc_js_fileSendFail.replace('1MB', KS.onlineFileNum + 'MB')
              }
              if (b.code == -600 || b.code == -601) {
                alert(kslang.oc_js_fileSendFail)
              } else {
                if (KS.__isDebug || KS.__isInTest) {
                  ksOnlineChat.insertSysDialogMsg('本地处理文件错误' + b.message)
                }
              }
            }
          }
        });
        imgUploader.init()
      }
    }
    function getFileUploader() {
      ksComm.$('ksSendFileName').value = '';
      if (!fileInitUploderFlag) {
        fileUploader = new plupload.Uploader({
          runtimes: 'html5,flash,browserplus,html4,gears',
          browse_button: ksComm.$('ksSendFile'),
          url: KS.__filePath,
          flash_swf_url: KS.__basePath + 'js/plupload/Moxie.swf',
          filters: {
            max_file_size: (KS.onlineFileNum ? KS.onlineFileNum : 1) + 'mb',
            prevent_duplicates: true
          },
          multiple_queues: true,
          multi_selection: false,
          multipart_params: {
            ri: KS.__ri,
            si: KS.__si,
            ci: KS.__ci,
            sn: KS.__name,
            lng: KS.__lng
          },
          init: {
            PostInit: function(b) {
              fileInitUploderFlag = true;
              ksComm.$('ks_sendfile_btn').onclick = function() {
                if (ksOnlineChat.chatStatus >= 2) {
                  alert(ksComm.getLang('oc_editor_alertfile0'));
                  return false
                }
                if (b.files.length == 0) {
                  alert(ksComm.getLang('oc_editor_alertfile1'));
                  return false
                }
                var a = b.files;
                for (var i = 0, len = a.length; i < len; i++) {
                  var f = a[i].name;
                  if (!f) {
                    alert(ksComm.getLang('oc_editor_alertfile1'))
                  }
                  if (!(/(?:txt|doc|docx|zip|xls|xlsx|dmp|jpg|gif|png|jpeg|mp3|amr|ppt|pptx|rm|rmvb|wmv|avi|mp4|3gp)$/i.test(f))) {
                    alert(kslang.oc_js_fileSendFail);
                    return false
                  }
                  ksComm.$('ksSendFileName').value = a[i].name;
                  if (!a[i].size) {
                    if (KS.__isDebug || KS.__isInTest) {
                      ksOnlineChat.insertSysDialogMsg('本地获取文件大小错误')
                    }
                  }
                }
                b.start();
                return false
              }
            },
            QueueChanged: function(a) {
              if (fileUploader.files.length > 1) {
                fileUploader.files.splice(0, fileUploader.files.length - 1)
              }
            },
            FilesAdded: function(a, b) {
              for (var i = 0, len = b.length; i < len; i++) {
                ksComm.$('ksSendFileName').value = b[i].name
              }
            },
            FileUploaded: function(a, b, c) {
              if (KS.isDir) {
                eval(c.response.substring(c.response.indexOf('<script>parent.') + '<script>parent.'.length, c.response.lastIndexOf('</script>')))
              } else {
                eval(c.response.substring(c.response.indexOf('<script>') + '<script>'.length, c.response.lastIndexOf('</script>')))
              }
            },
            Error: function(a, b) {
              if (KS.onlineFileNum) {
                kslang.oc_js_fileSendFail = kslang.oc_js_fileSendFail.replace('1MB', KS.onlineFileNum + 'MB')
              }
              if (b.code == -600 || b.code == -601) {
                alert(kslang.oc_js_fileSendFail)
              } else {
                if (KS.__isDebug || KS.__isInTest) {
                  ksOnlineChat.insertSysDialogMsg('本地处理文件错误' + b.message)
                }
              }
            }
          }
        });
        fileUploader.init()
      }
    }
    var C = {};

    function toEditStyle(a, o) {
      if (!o) {
        o = r
      }
      for (var b in a) {
        var c = b.split('-'),
          s;
        s = c[0];
        for (var i = 1; i < c.length; i++) s += c[i].substring(0, 1).toUpperCase() + c[i].substring(1);
        if (o.style[s]) {
          o.style[s] = '';
          delete C[s]
        } else {
          o.style[s] = a[b];
          C[s] = a[b]
        }
      }
    }
    function showEmotions() {
      var b = b$('DIV');
      b.style.position = 'relative';
      b.style.width = '320px';
      if (KS.is2015) {
        b.style.width = '312px';
        b.style.border = '1px solid #eaeaea';
        b.style.padding = '5px'
      }
      b.style.backgroundColor = '#fff';
      b.className = 'nicEdit-emotions';
      var c, d;
      for (var i = 1; i <= 60; i++) {
        c = linkContentdiv();
        if (KS.is2015 && i % 12 == 1) {
          c.style.cssText = 'border-left:1px solid #e2eef6;cursor:pointer;position:relative;width:24px;height:24px;float:left;'
        } else if (KS.is2015 && i > 48) {
          c.style.cssText = 'border-bottom:1px solid #e2eef6;cursor:pointer;position:relative;width:24px;height:24px;float:left;'
        } else {
          c.style.cssText = 'cursor:pointer;position:relative;width:24px;height:24px;float:left;'
        }
        c.className = 'nicEdit-emotionsOut';
        var d = bdIMG(KS.__basePath + 'images/emote/' + i + '.gif');
        addEvent(c, 'mouseover', function() {
          this.className = 'nicEdit-emotionsOver'
        }.closureListener(c));
        addEvent(c, 'mouseout', function() {
          this.className = 'nicEdit-emotionsOut'
        }.closureListener(c));
        c.appendChild(d);
        addEvent(c, 'click', function() {
          if (KS.isDir) {
            ksEditor.clickByLinkDiv('emotions_link')
          } else {
            this.parentNode.parentNode.style.display = 'none'
          }
          toEditFoucs();
          if (ksComm.browser.msie && !ksComm.browser.msie11) {
            r.innerHTML += '&nbsp;'
          }
          var a = this.getElementsByTagName('IMG')[0].src;
          if (isText()) {
            insertHtml('[img]' + a + '[/img]')
          } else {
            document.execCommand('insertImage', false, a)
          }
        }.closureListener(c));
        b.appendChild(c)
      }
      var e = b$('DIV');
      e.style.cssText = 'clear:both;';
      b.appendChild(e);
      return b
    }
    function fontColors() {
      var b = b$('DIV');
      b.style.position = 'absolute';
      b.style.width = '270px';
      b.style.bottom = '26px';
      var d = ['00', '33', '66', '99', 'CC', 'FF'];
      var i = 0,
        j = 0,
        k = 0,
        len = d.length;
      var e = 'cursor:pointer;position:relative;width:11px;height:11px;float:left;';
      for (; i < len; i++) {
        for (j = 0; j < len; j++) {
          for (k = 0; k < len; k++) {
            var c = '#' + d[i] + d[j] + d[k];
            var v = b$('DIV');
            v.style.cssText = e;
            v.style.backgroundColor = c;
            addEvent(v, 'click', function() {
              var c = this.style.backgroundColor;
              r.style.color = c;
              C.color = c;
              this.parentNode.parentNode.style.display = 'none';
              var a = ksComm.$(u.cmd.forecolor.id);
              a.setAttribute('flag', 'true');
              a.style.backgroundColor = c
            }.closureListener(v));
            b.appendChild(v)
          }
        }
      }
      return b
    }
    function startCapture() {
      if (ksOnlineChat.chatStatus == 0 || ksOnlineChat.chatStatus == 4) {
        alert(ksComm.getLang('oc_editor_alertcutpic0'));
        return false
      } else if (ksOnlineChat.chatStatus > 1) {
        alert(ksComm.getLang('oc_editor_alertcutpic1'));
        return false
      }
      if (!ksComm.browser.msie) {
        alert(ksComm.getLang('oc_editor_alertcutpic2'));
        return
      }
      var a = null;
      try {
        a = new ActiveXObject("ScreenCapture.FastBusiness")
      } catch (e) {}
      if (a) {
        delete a
      } else {
        alert(ksComm.getLang('oc_editor_alertcutpic3'));
        window.open(KS.__basePath + 'jsp/screen_download.jsp', ksComm.browser.msie ? '' : 'screen_download');
        return
      }
      var b = b$("OBJECT");
      b.classid = 'clsid:8F192139-8B19-43B4-8C43-A39CB44CE519';
      try {
        b.StartCapture2(ksComm.getLang('oc_editor_alertcutpic4'))
      } catch (e) {
        alert(ksComm.getLang('oc_editor_alertcutpic5'));
        window.open(KS.__basePath + 'jsp/screen_download.jsp', ksComm.browser.msie ? '' : 'screen_download');
        return
      }
      b.AddParam("ri", KS.__ri);
      b.AddParam("si", KS.__si);
      b.AddParam("ci", KS.__ci);
      b.AddParam("lng", KS.__lng);
      b.AddParam("sn", encodeURIComponent(KS.__name));
      b.SendFile(KS.__cDom, KS.__cPot, KS.__cPat);
      b.ENDCapture();
      detectVal()
    }
    this.clickByLinkDiv = function(a) {
      var o = x.firstChild;
      while (o) {
        if (o.getAttribute('linkdiv') == a) {
          o.click();
          butMOut.closureListener(o)();
          break
        }
        o = o.nextSibling
      }
    };

    function sendImg() {
      if (typeof KS.__name == 'undefined') return;
      var a = b$('DIV');
      a.style.position = 'relative';
      var f = b$('DIV', 'ksSendImgArea');
      var b = [];
      if (KS.onlineFileNum) {
        kslang.oc_editor_tipmsg = kslang.oc_editor_tipmsg.replace('1MB', KS.onlineFileNum + 'MB')
      }
      if (KS.is2015) {
        b.push('<div class="file" unselectable="on"><div class="fileDiv" style="margin-right:0px;">');
        b.push('<span class="btn_file" onmouseover="this.style.backgroundColor=\'#a1a9ae\'" onmouseout="this.style.backgroundColor=\'#96a1a5\'" style="cursor: pointer;vertical-align:middle;padding:3px 8px;line-height:22px;margin-left: 5px;background-color: #96a1a5;color:#fff" id="ksSendImg" name="ksSendImg"/>', kslang.oc_editor_selectFile, '</span>');
        b.push('<input class="btn_file" style="*+padding-left:8px;border-left:0px;vertical-align:middle;height:21px;line-height:normal;width:35%;" id="ksSendImgFileName" size="20" readonly="readonly"/>');
        b.push('<div class="extBtnDiv" style="*bottom:1px;"><input id="ks_sendImg_btn" class="extBtn" type="submit" style="cursor:pointer" value="', kslang.oc_editor_sendfileBtn, '"/></div></div>');
        b.push('</div>');
        b.push('<div class="filetype" unselectable="on">*.jpg、gif、png、jpeg ');
        b.push('<ks:ln k="oc_editor_tipmsg">', kslang.oc_editor_tipmsg, '<ks:ln></div>');
        b.push('')
      } else {
        if (KS.isDir) {
          b.push('<div class="fileclose" unselectable="on" onclick="ksEditor.clickByLinkDiv(\'sendimg_link\')"></div>');
          b.push('<div class="filetype" unselectable="on">*.jpg、gif、png、jpeg ');
          b.push('<ks:ln k="oc_editor_tipmsg">', kslang.oc_editor_tipmsg, '<ks:ln></div>');
          b.push('<div class="file" unselectable="on"><div class="fileDiv" style="margin-right:135px;"><input class="btn_file" style="vertical-align:middle;height:22px;line-height:normal" id="ksSendImgFileName" size="20" readonly="readonly"/><a class="btn_file" style="padding: 2px 3px 4px 3px;_padding:3px;line-height:22px;margin-left: 5px;background-color: #F0F0F0;" id="ksSendImg" name="ksSendImg"/>', kslang.oc_editor_selectFile, '</a></div>');
          b.push('<div class="extBtnDiv" style="*bottom:0px;-bottom:12px;"><input id="ks_sendImg_btn" class="extBtn" type="submit" style="cursor:pointer" value="', kslang.oc_editor_sendfileBtn, '"/></div></div>');
          b.push('')
        } else {
          b.push('<div class="file" unselectable="on"><span class="title" unselectable="on"><ks:ln k="oc_editor_sendfile">', kslang.oc_editor_sendfile, '</ks:ln>: </span><input class="btn_file" style="_vertical-align:middle;height:16px;line-height:normal" id="ksSendImgFileName" size="20"  readonly="readonly"/><a class="btn_file" style="padding:2px;_padding:4px 3px 0px 3px;margin-left: 5px;line-height:20px;background-color: #F0F0F0;margin-right:10px;" id="ksSendImg" name="ksSendImg"/>', kslang.oc_editor_selectFile, '</a>');
          b.push('<input id="ks_sendImg_btn" class="extBtn" type="submit" style="cursor:pointer;padding-top:1px;margin-left:0px;" value="', kslang.oc_editor_sendfileBtn, '"/></div>');
          b.push('<div class="filetype" unselectable="on"><span class="alert" unselectable="on"><ks:ln k="oc_editor_tips">', kslang.oc_editor_tips, '<ks:ln>: </span>');
          b.push('<ks:ln k="oc_editor_tipmsg">*.jpg、gif、png、jpeg ', kslang.oc_editor_tipmsg, '<ks:ln></div>');
          b.push('');
          f.style.height = '37px'
        }
      }
      f.innerHTML = b.join('');
      f.setAttribute('unselectable', 'on');
      a.appendChild(f);
      var c = b$('DIV', 'ksSendImgLoading');
      c.style.cssText = 'white-space:nowrap;display:none;height:37px;line-height:37px;';
      a.appendChild(c);
      return a
    }
    function sendFile() {
      if (typeof KS.__name == 'undefined') return;
      var a = b$('DIV');
      a.style.position = 'relative';
      var f = b$('DIV', 'ksSendFileArea');
      var b = [];
      if (KS.onlineFileNum) {
        kslang.oc_editor_tipmsg = kslang.oc_editor_tipmsg.replace('1MB', KS.onlineFileNum + 'MB')
      }
      if (KS.is2015) {
        b.push('<div class="file" unselectable="on"><div class="fileDiv" style="margin-right:0px;">');
        b.push('<div style="margin-right:85px;overflow:hidden"><span class="btn_file" onmouseover="this.style.backgroundColor=\'#a1a9ae\'" onmouseout="this.style.backgroundColor=\'#96a1a5\'" style="cursor: pointer;vertical-align:middle;padding: 3px 8px;margin-left: 5px;background-color: #96a1a5;color:#fff" id="ksSendFile" name="ksSendFile">', kslang.oc_editor_selectFile, '</span>');
        b.push('<input class="btn_file" style="border-left:0px;vertical-align:middle;height:21px;line-height:normal;width:auto" id="ksSendFileName" size="20" readonly="readonly"/>');
        b.push('<span class="filetype" unselectable="on">*');
        b.push('<ks:ln k="oc_editor_tipmsg">', kslang.oc_editor_tipmsg, '<ks:ln>');
        b.push('</span></div>');
        b.push('<div class="extBtnDiv" style="*bottom:0px;-bottom:12px;"><input id="ks_sendfile_btn" class="extBtn" type="submit" style="cursor:pointer" value="', kslang.oc_editor_sendfileBtn, '"/></div></div></div>');
        b.push('')
      } else {
        if (KS.isDir) {
          b.push('<div class="fileclose" unselectable="on" onclick="ksEditor.clickByLinkDiv(\'sendfile_link\')"></div>');
          b.push('<div class="filetype" unselectable="on">*');
          b.push('<ks:ln k="oc_editor_tipmsg">', kslang.oc_editor_tipmsg, '<ks:ln></div>');
          b.push('<div class="file" unselectable="on"><div class="fileDiv" style="margin-right:135px;"><input class="btn_file" style="vertical-align:middle;height:22px;line-height:normal;" id="ksSendFileName" size="20" readonly="readonly"/><a class="btn_file" style="padding: 2px 3px 4px 3px;_padding:3px;margin-left: 5px;background-color: #F0F0F0;" id="ksSendFile" name="ksSendFile">', kslang.oc_editor_selectFile, '</a></div>');
          b.push('<div class="extBtnDiv" style="*bottom:0px;-bottom:12px;"><input id="ks_sendfile_btn" class="extBtn" type="submit" style="cursor:pointer" value="', kslang.oc_editor_sendfileBtn, '"/></div></div>');
          b.push('')
        } else {
          b.push('<div class="file" unselectable="on"><span class="title" unselectable="on"><ks:ln k="oc_editor_sendfile">', kslang.oc_editor_sendfile, '</ks:ln>: </span><input class="btn_file" style="_vertical-align:middle;height:16px;line-height:normal;" id="ksSendFileName" size="20" readonly="readonly"/><a class="btn_file" style="padding:2px;_padding-top:4px;_padding-bottom:0px;margin-left: 5px;margin-right:10px;background-color: #F0F0F0;" id="ksSendFile" name="ksSendFile">', kslang.oc_editor_selectFile, '</a>');
          b.push('<input id="ks_sendfile_btn" class="extBtn" type="submit" style="cursor:pointer;padding-top:1px;margin-left:0px;" value="', kslang.oc_editor_sendfileBtn, '"/></div>');
          b.push('<div class="filetype" unselectable="on"><span class="alert" unselectable="on"><ks:ln k="oc_editor_tips">', kslang.oc_editor_tips, '<ks:ln>: </span>');
          b.push('<ks:ln k="oc_editor_tipmsg">', kslang.oc_editor_tipmsg, '<ks:ln></div>');
          b.push('');
          f.style.height = '37px'
        }
      }
      f.innerHTML = b.join('');
      f.setAttribute('unselectable', 'on');
      a.appendChild(f);
      var c = b$('DIV', 'ksSendFileLoading');
      c.style.cssText = 'white-space:nowrap;display:none;height:37px;line-height:37px;';
      a.appendChild(c);
      return a
    }
    function linkContentdiv(a, b) {
      var d = b$('DIV', a);
      if (KS.is2015) {
        d.style.cssText = 'float:left;white-space:nowrap;margin:0px 3px;height: 24px;line-height: 18px;vertical-align:middle;'
      } else {
        d.style.cssText = 'float:left;white-space:nowrap;margin:0px 3px;height: 24px;line-height: 24px;vertical-align:middle;'
      }
      if (b) {
        for (var i = 0; i < b.length; i++) {
          d.appendChild(b[i])
        }
      }
      d.setAttribute('unselectable', 'on');
      return d
    }
    function transPanel() {
      var a = linkContentdiv();
      a.setAttribute('unselectable', 'on');
      var b = bdSELECT({
        'auto': kslang.oc_lang_auto,
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        'en': 'English',
        'ja': '日本の',
        'ko': '한국의'
      });
      var c = bdSELECT({
        'en': 'English',
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        'ja': '日本の',
        'ko': '한국의'
      });
      var d = b$('INPUT');
      d.className = 'btn';
      d.type = 'button';
      d.value = '  ';
      d.style.verticalAlign = 'middle';
      d.name = 'sourceLang';
      var e = d.cloneNode(true);
      e.name = 'targetLang';
      e.value = kslang['oc_editor_translate_text'];
      e.className = 'extBtn';
      addEvent(d, 'click', function() {
        var s = b.value;
        var t = c.value;
        if (s != 'auto') {
          b.value = t;
          c.value = s
        }
      });
      addEvent(e, 'click', function() {
        ksOnlineChat.translate(b.value, c.value, e)
      });
      var f = linkContentdiv();
      f.innerHTML = '<ks:ln k="oc_editor_forlang">' + kslang.oc_editor_forlang + '</ks:ln>：';
      var g = linkContentdiv();
      g.innerHTML = '<ks:ln k="oc_editor_tolang">' + kslang.oc_editor_tolang + '</ks:ln>：';
      a.appendChild(linkContentdiv('', [f]));
      a.appendChild(linkContentdiv('', [b]));
      var h = linkContentdiv('', [d]);
      h.className = 'nicEdit-trans_ex_div';
      a.appendChild(h);
      a.appendChild(linkContentdiv('', [g]));
      a.appendChild(linkContentdiv('', [c]));
      var i = linkContentdiv('', [e]);
      i.className = 'nicEdit-trans_div';
      a.appendChild(i);
      return a
    }
    function quickaskPanel() {
      var a = linkContentdiv();
      a.innerHTML = KS.quickAskInnerHtml.join('');
      return a
    }
    function insertText(a, b) {
      if (document.selection) {
        var c = document.selection.createRange();
        c.text = b
      } else if (typeof a.selectionStart === 'number' && typeof a.selectionEnd === 'number') {
        var d = a.selectionStart,
          endPos = a.selectionEnd,
          cursorPos = d,
          tmpStr = a.value;
        a.value = tmpStr.substring(0, d) + b + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += b.length;
        a.selectionStart = a.selectionEnd = cursorPos
      } else {
        a.value += b
      }
    }
    function insertHtml(a, b) {
      var b = b || getEvent();
      toEditFoucs();
      if (b.preventDefault) {
        b.preventDefault()
      }
      if (b.stopPropagation) {
        b.stopPropagation()
      }
      if (isText()) {
        insertText(r, a);
        return
      }
      if (ksComm.browser.msie) {
        var c = document.selection.createRange();
        c.pasteHTML(a);
        c.select()
      } else {
        document.execCommand('inserthtml', false, a)
      }
      return false
    }
    function replaceP2Br(e, t) {
      ksOnlineChat.lastTypeTime = new Date().getTime();
      if ((e.keyCode != 13 && !e.ctrlKey) || e.shiftKey || e.altKey) return true;
      if (p.sendMsgType == 1 && !e.ctrlKey && (e.keyCode == 13)) {
        var a = t.parentNode;
        var b = a.tagName.toLowerCase();
        if (p.newLineTag == 'br' && ksComm.browser.msie) {
          if (!ksComm.inArray(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'], b)) {
            return insertHtml('<br/>', e)
          }
        }
        return true
      }
      if (p.sendMsgType == 0 && e.ctrlKey && (e.keyCode == 13)) {
        var a = t.parentNode;
        var b = a.tagName.toLowerCase();
        if (p.newLineTag == 'br') {
          if (!ksComm.inArray(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'], b)) {
            return insertHtml('<br/>', e)
          }
        }
        return true
      }
      if ((p.sendMsgType == 1 && e.ctrlKey && (e.keyCode == 13)) || (p.sendMsgType == 0 && !e.ctrlKey && (e.keyCode == 13))) {
        D();
        clearEr(e);
        return false
      }
      return true
    }
    function clearEr(e) {
      try {
        e.keyCode = 0
      } catch (e1) {}
      try {
        if (e.preventDefault) e.preventDefault()
      } catch (e1) {}
      try {
        e.returnValue = false
      } catch (e1) {}
    }
    function detectVal() {
      if (ksOnlineChat.chatStatus == 1 && ksOnlineChat.robotReceiving != 2) {
        p.clientSendMsgNum++
      }
      if (ksOnlineChat.isTreated && !ksOnlineChat.hasEvaluated && (KS.ocCfg.valuation.autoPrompt == true) && (p.clientSendMsgNum == KS.ocCfg.valuation.smsNum)) {
        ksOnlineChat.openServiceEvaluateWin()
      }
    }
    function sendLocalMsg(b, c, d) {
      ksComm.ajax({
        type: 'POST',
        dataType: 'json',
        timeout: 20000,
        url: b,
        data: c,
        success: function(a) {
          d(a)
        },
        error: function() {
          if (ksOnlineChat.chatStatus == 1) {
            setTimeout(function() {
              sendLocalMsg(b, c, d)
            }, 3000)
          }
        }
      })
    }
    var D = this.sendMsg = function() {
        if (!KS.useVCAPage) {
          if (ksOnlineChat.chatStatus == 2) {
            alert(ksComm.getLang('oc_editor_sendmsg0'));
            return false
          } else if (ksOnlineChat.chatStatus > 2) {
            alert(ksComm.getLang('oc_editor_sendmsg1'));
            return false
          }
        }
        var d = r.innerHTML;
        if (isText()) {
          d = r.value
        }
        d = d.trimAll();
        if (d == '') {
          return false
        }
        var e = new Date().getTime();
        if (ksOnlineChat.lastSendTime && ksOnlineChat.lastSendTime + 500 > e) {
          if (ksOnlineChat.lastSendTime > e) ksOnlineChat.lastSendTime = e;
          alert(ksComm.getLang('oc_editor_sendmsg3') || '您的手脚太麻利了，担心抽筋啊');
          return false
        }
        if (!isText() && KS.ocCfg.btnVisible.cutpic) {
          var f = /<img.*src=[\'"]?(data:image\/[\w]+;base64,[^\'"\s]*)[\'"]?[^>]*[\/]?>/gim;
          var g = '',
            _base = '';
          d = d.replace(/<img[^>]*src=[\'"](data:image\/[\w]+;base64,[^\'"]*)[\'"][^>]*>/gim, function(v, b, c) {
            if (_base == b) {
              return ''
            } else {
              _base = b
            }
            if (_base) {
              ksOnlineChat.sendBytePic(_base, function(a) {
                eval(a.substring(a.indexOf('<script>') + '<script>'.length, a.lastIndexOf('</script>')))
              }, function() {})
            }
            return ''
          });
          d = d.trimAll();
          if (d == '') {
            r.innerHTML = '';
            r.focus();
            ksOnlineChat.preKnow('');
            return false
          }
        }
        if (isText()) d = d.replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1"/>');
        var h = b$('SPAN');
        bkExtend(h.style, C);
        var s = h.style.cssText;
        if (s) {
          d = '<span style="' + s + '">' + d + '</span>'
        };
        if (d.length > 1300) {
          ksOnlineChat.insertSysDialogMsg(ksComm.getLang('oc_editor_sendmsg2'));
          return
        }
        var j = KS.rbCfg,
          param = {};
        param['msg'] = d;
        param['name'] = KS.__name;
        param['si'] = KS.__si;
        param['ci'] = KS.__ci;
        param['ri'] = KS.__ri;
        param['sid'] = KS.__sid;
        param['cwId'] = KS.__cwId || '';
        if (ksOnlineChat.robotReceiving == 2 || KS.useVCAPage) {
          param['rbName'] = j.robotName;
          param['lang'] = KS.__lng;
          if (j.keywords != '') {
            var k = j.keywords.trim().split('|');
            for (var i = 0; i < k.length; i++) {
              if (k[i] && d.indexOf(k[i]) != -1) {
                ksOnlineChat.insertCsDialogMsg(j.robotName, new Date().format(), j.responseText, false);
                return
              }
            }
          }
          if (KS.isUseVCA) {
            ksOnlineChat.queryVcaAnswer(d, null, param)
          } else {
            if (ksOnlineChat.lastSendRobotMsg == d) {
              ksOnlineChat.insertCsDialogMsg(j.robotName, new Date().format(), j.repeatSend, false);
              return
            }
            ksOnlineChat.lastSendRobotMsg = d;
            sendLocalMsg(KS.__basePath + 'msgToRb.htm', param, function(a) {
              if (!a.sendTime) a.sendTime = new Date().format();
              ksOnlineChat.insertVtDialogMsg(a.sendTime, d);
              ksOnlineChat.sendRobotMsgCallback(a)
            })
          }
        } else {
          sendLocalMsg(KS.__basePath + 'dia/msg.htm', param, function(a) {
            ksOnlineChat.sendMsgCallback(a, d)
          });
          detectVal()
        }
        if (isText()) {
          r.value = '';
          r.focus()
        } else {
          r.innerHTML = '';
          r.focus();
          if (!ksComm.browser.msie) {
            var l = ksComm.$('msg_ipt');
            if (!l) {
              var m = b$('div');
              m.style.cssText = 'width:0px;height:0px;overflow:hidden;position:absolute;right:0px;';
              m.innerHTML = '<input type="text" id="msg_ipt" onfocus="document.getElementById(\'' + q + '\').focus();"/>';
              document.body.appendChild(m);
              l = ksComm.$('msg_ipt')
            }
            if (l) l.focus()
          }
        }
        ksOnlineChat.lastSendTime = new Date().getTime();
        ksOnlineChat.preKnow('')
      };
    Function.prototype.closure = function() {
      var a = this,
        args = ksComm.toArray(arguments),
        obj = args.shift();
      return function() {
        if (typeof(ksComm) != 'undefined') {
          return a.apply(obj, args.concat(ksComm.toArray(arguments)))
        }
      }
    };

    function getEvent() {
      if (window.event) return window.event;
      var a = getEvent.caller;
      while (a != null) {
        var b = a.arguments[0];
        if (b) {
          var c = b.constructor;
          if (c.toString().indexOf('Event') != -1) {
            return b
          }
        }
        a = a.caller
      }
      return null
    }
    Function.prototype.closureListener = function() {
      var b = this,
        args = ksComm.toArray(arguments),
        object = args.shift();
      return function(e) {
        e = getEvent();
        var a;
        if (e) {
          if (e.target) {
            a = e.target
          } else {
            a = e.srcElement
          }
        }
        return b.apply(object, [e, a].concat(args))
      }
    };

    function bkExtend() {
      var a = arguments;
      if (a.length == 1) a = [this, a[0]];
      for (var b in a[1]) a[0][b] = a[1][b];
      return a[0]
    };
    bkExtend(p, n)
  };
var ksOnlineChat = {
  chatStatus: 4,
  hasEvaluated: false,
  receiveMsgCount: 0,
  intervalCusWaitTime: 0,
  cusIsWaiting: false,
  intervalVtWaitTime: 0,
  vtIsWaiting: false,
  doPring: false,
  lastText: '',
  lastSendRobotMsg: '',
  robotReceiving: 0,
  ifEndAlert: true,
  curChatTitle: '',
  isTreated: false,
  isWriting: false,
  lastTypeTime: null,
  transferinfoShow: false,
  insertMsg: function(a) {
    ksComm.insertHtml('beforeend', ksComm.$('msgArea'), a);
    ksOnlineChat.insertIcon(ksComm.$('msgArea'));
    if (KS.isDir) {
      setTimeout(function() {
        ksComm.$('chatContent').scrollTop = ksComm.$('chatContent').scrollHeight;
        ksComm.$('chatOutput').scrollTop = ksComm.$('chatOutput').scrollHeight
      }, 200)
    } else {
      ksComm.$('chatTopArea').scrollTop = ksComm.$('chatTopArea').scrollHeight
    }
  },
  insertIcon: function(a) {
    if (a) {
      var b = document.createElement("span");
      b.className = 'spanicon';
      a.lastChild.appendChild(b)
    }
  },
  setChatTitle: function(a) {
    if (ksOnlineChat.isvca && ksOnlineChat.robotReceiving == 2) {
      a = window.vcaTitle || a || KS.rbCfg.robotName && KS.rbCfg.robotName + '|智能机器人' || kslang.oc_toptitle_receive && kslang.oc_toptitle_receive(KS.rbCfg.robotName)
    } else {
      if (KS.useVCAPage && KS.useNewVCAPage && arguments.callee.caller != ksOnlineChat.receiveMsgCallback && arguments.callee.caller != window.gotoRobot) {
        return
      }
      if (KS.useVCAPage && arguments.callee.caller == ksOnlineChat.receiveMsgCallback) {
        if (!KS.useNewVCAPage || ksOnlineChat.isvca && ksOnlineChat.robotReceiving == 2) {
          return
        } else {
          if (ksOnlineChat.robotReceiving != 2) {
            KS.useVCAPage = false;
            ksOnlineChat.isvca = false
          }
        }
      }
    }
    if (ksOnlineChat.setTitleTimeout) {
      clearTimeout(ksOnlineChat.setTitleTimeout)
    }
    ksOnlineChat.setTitleTimeout = setTimeout(function() {
      if (window.checkShowBt) {
        checkShowBt()
      }
      ksComm.$('oc_top_title').innerHTML = a
    }, 200);
    this.curChatTitle = a;
    if (KS.isDir && typeof setMiniTitle == 'function') {
      setMiniTitle();
      setTimeout(function() {
        try {
          if (ksOnlineChat.chatStatus >= 2) {
            parent.postMessage('KS.wins[4].chatStatus=' + ksOnlineChat.chatStatus + ';KS.reMonitor()', '*')
          }
        } catch (e) {}
      }, 100)
    }
  },
  openServiceEvaluateWin: function(c, d) {
    if (ksOnlineChat.chatStatus == 0 || ksOnlineChat.chatStatus == 4) {
      alert(ksComm.getLang('oc_editor_alertevaluate0'));
      return
    } else if (ksOnlineChat.chatStatus > 1) {
      alert(ksComm.getLang('oc_editor_alertevaluate1'));
      return
    }
    if (!c && KS.isDir && !KS.is2015) {
      ksEditor.clickByLinkDiv('oc_se_win');
      return
    }
    var e = ksComm.$("oc_se_win");
    if (KS.is2015) {
      ksComm.$('oc_se_topic1TR').style.display = 'none';
      ksComm.$('oc_se_topic2TR').style.display = 'block'
    }
    if (this.chatStatus >= 2 && !this.isTreated) {
      if (KS.isDir) e.style.display = "block";
      return false
    }
    if (KS.isDir && !KS.is2015) {
      e.style.width = ksComm.$('userOptiv').clientWidth - 2 + 'px';
      ksComm.$("oc_se_cancle").onclick = function() {
        ksEditor.clickByLinkDiv('oc_se_win')
      }
    } else {
      if (e.style.display == 'block') {
        return false
      }
      e.style.marginTop = -75 + document.documentElement.scrollTop + "px";
      ksComm.$("oc_se_cancle").onclick = function() {
        ksComm.hideMask();
        e.style.display = "none"
      };
      ksComm.showMask();
      e.style.display = "block"
    }
    ksComm.$("oc_se_submit").onclick = function() {
      var v = ksComm.$('serviceEvaluateDesc').value;
      if (v == ksComm.getAttributeValue(ksComm.$('serviceEvaluateDesc'), 'defaultVal')) {
        v = ''
      }
      if (v.length > 1300) {
        alert(ksComm.getLang('oc_editor_sendmsg2'));
        return
      }
      ksOnlineChat.hasEvaluated = true;
      var b = {};
      b['ri'] = KS.__ri;
      b['ci'] = KS.__ci;
      b['si'] = KS.__si;
      for (var i = 0; i < KS.__valNums; i++) {
        var r = ksComm.$('val' + i);
        if (r.checked == true) {
          b['se'] = r.value;
          break
        }
      }
      if (!b['se']) {
        alert(ksComm.getLang('oc_evaluate_noscore'));
        return
      }
      b['sed'] = v;
      ksComm.get(KS.__basePath + 'chat/val.htm', b, function(a) {
        if (a.success) {
          ksOnlineChat.insertSysDialogMsg(kslang.oc_js_valSucc);
          if (d) {
            ksOnlineChat.setChatTitle(kslang.oc_js_dialogAlreadyEnd);
            ksOnlineChat.unloadWindowEvent()
          }
        }
      });
      if (KS.isDir && !KS.is2015) {
        ksEditor.clickByLinkDiv('oc_se_win')
      } else {
        ksComm.hideMask();
        e.style.display = "none"
      }
    };
    return true
  },
  openVerifyWin: function(c) {
    var d = ksComm.$("oc_comm_win_verify");
    if (!d) {
      KS.hasChecked = true;
      KS.initVi();
      return false
    }
    if (d.style.display == 'block') {
      return false
    }
    if (typeof c == 'undefined' && typeof KS['verifyCallback'] != 'undefined') {
      delete KS['verifyCallback']
    } else if (typeof c == 'function') {
      KS['verifyCallback'] = c
    }
    if (KS.hasChecked) {
      KS.hasChecked = false;
      ksComm.showMask();
      d.style.display = "block";
      if (KS.ins) {
        KS.ins.refresh()
      } else {
        ksComm.$("ksVerifyRefresh").onclick();
        ksComm.$('ksVerifyInput').focus()
      }
      return
    }
    if (KS.vt && KS.vt === 1) {
      var e = 332;
      var f = false;
      if (typeof(vtFrom) !== 'undefined' && vtFrom === 'dir') {
        f = true;
        e = 260
      }
      var g = {
        "element": "ksVerifyArea",
        "captchaId": KS.neteastId,
        "width": e,
        "mode": "embed",
        "verifyCallback": function(b) {
          if (b['value']) {
            ksComm.$('ncpt_success_icon').style.display = 'block';
            ksComm.$('ncpt_fail_icon').style.display = 'none';
            ksComm.get(KS.__basePath + 'chat/verifycode.htm', {
              code: b.validate,
              ksvcode: KS.ksvcode,
              type: KS.vt
            }, function(a) {
              if (a) {
                KS.rivcode = b.validate;
                ksComm.hideMask();
                d.style.display = "none";
                KS.hasChecked = true;
                if (KS['verifyCallback'] && typeof KS['verifyCallback'] == 'function') {
                  n = false;
                  KS['verifyCallback']()
                } else {
                  KS.initVi()
                }
              } else {
                m = b.validate
              }
              n = false
            })
          } else {
            ksComm.$('ncpt_success_icon').style.display = 'none';
            ksComm.$('ncpt_fail_icon').style.display = 'block';
            setTimeout(function() {
              ksComm.$('ncpt_success_icon').style.display = 'none';
              ksComm.$('ncpt_fail_icon').style.display = 'none'
            }, 650)
          }
        }
      };
      KS.ins = new NECaptcha(g);
      ksComm.$('ksVerifyArea').style.display = 'block';
      d.style.display = 'block';
      var h = document.createElement('div');
      var i = document.createElement('div');
      i.id = "ncpt_success_icon";
      var j = document.createElement('div');
      j.id = "ncpt_fail_icon";
      h.style.width = '58px';
      h.style.height = '28px';
      h.style.background = 'url("' + KS.__basePath + '/images/chat/kslogo.png") no-repeat';
      h.style.position = 'absolute';
      if (f) {
        h.style.bottom = '57px';
        h.style.right = '20px'
      } else {
        h.style.bottom = '68px';
        h.style.right = '33px'
      }
      h.style.zIndex = '1000';
      i.style.width = '20px';
      i.style.height = '20px';
      i.style.display = 'none';
      i.style.background = 'url("' + KS.__basePath + '/images/chat/icon_verify_success.png") no-repeat';
      i.style.position = 'absolute';
      if (f) {
        i.style.bottom = '30px';
        i.style.right = '1px'
      } else {
        i.style.bottom = '33px';
        i.style.right = '5px'
      }
      i.style.zIndex = '1000';
      j.style.width = '20px';
      j.style.height = '20px';
      j.style.display = 'none';
      j.style.background = 'url("' + KS.__basePath + '/images/chat/icon_verify_fail.png") no-repeat';
      j.style.position = 'absolute';
      if (f) {
        j.style.bottom = '30px';
        j.style.right = '1px'
      } else {
        j.style.bottom = '33px';
        j.style.right = '5px'
      }
      j.style.zIndex = '1000';
      d.appendChild(h);
      d.appendChild(j);
      d.appendChild(i);
      return
    }
    var k = true;
    var l = ksComm.$("ksVerifyImg");
    var r;
    var m;
    ksComm.addEvent(l, 'load', function() {
      k = true;
      if (r) clearTimeout(r)
    });
    ksComm.$("ksVerifyRefresh").onclick = function() {
      if (k) {
        l.src = KS.__basePath + 'chat/verifyImg.htm?ksvcode=' + KS.ksvcode + "&t=" + Math.random();
        k = false;
        r = setTimeout(function() {
          k = true;
          r = null
        }, 2000)
      }
    };
    l.src = KS.__basePath + 'chat/verifyImg.htm?ksvcode=' + KS.ksvcode + "&t=" + Math.random();
    var n = false;
    var o = ksComm.$('ksVerifyInput');
    var p = function() {
        var b = o.value;
        if (!n && b && b.length == 4 && m != b) {
          n = true;
          ksComm.get(KS.__basePath + 'chat/verifycode.htm', {
            code: b,
            ksvcode: KS.ksvcode
          }, function(a) {
            if (a) {
              KS.rivcode = b;
              o.value = '';
              ksComm.hideMask();
              d.style.display = "none";
              KS.hasChecked = true;
              if (KS['verifyCallback'] && typeof KS['verifyCallback'] == 'function') {
                n = false;
                KS['verifyCallback']()
              } else {
                KS.initVi()
              }
            } else {
              m = b;
              ksComm.$("ksVerifyRefresh").onclick();
              o.value = ''
            }
            n = false
          })
        }
      };
    ksComm.addEvent(o, 'input', p);
    ksComm.addEvent(o, 'keyup', p);
    d.style.marginTop = -65 + document.documentElement.scrollTop + "px";
    ksComm.showMask();
    d.style.display = "block";
    ksComm.$('ksVerifyInput').focus()
  },
  openVisitorInfoWin: function() {
    var d = ksComm.$("oc_comm_win_panel");
    if (!d) {
      KS.hasCollect = true;
      KS.initVi();
      return false
    }
    if (d.style.display == 'block') {
      return false
    }
    d.style.marginTop = -75 + document.documentElement.scrollTop + "px";

    function disStr(s) {
      if (s == 'name') return kslang.oc_vi_name;
      if (s == 'email') return 'Email';
      if (s == 'qq') return 'QQ';
      if (s == 'msn') return kslang.oc_vi_mobile || 'MSN';
      if (s == 'phone') return kslang.oc_vi_phone;
      if (s == 'address') return kslang.oc_vi_address
    }
    function checkReq(s, a) {
      var b = KS.cwAdvVicReq;
      if (b && b.indexOf(s) != -1) {
        if (a == '' || a.trim() == '') {
          alert(kslang.lm_notEmpty(disStr(s)));
          return false
        }
      }
      return true
    }
    ksComm.$("oc_vi_submit").onclick = function() {
      try {
        var a = KS.cwAdvVicDis;
        if (a) {
          var b = a.split(','),
            _resStr = '';
          for (var j = 0; j < b.length; j++) {
            var c = ksComm.$('oc_vi__' + b[j]),
              _v = '';
            if (c) {
              _v = c.value
            } else {
              continue
            }
            if (checkReq(b[j], _v)) {
              if (_v != '') {
                _v = disStr(b[j]) + '：' + _v;
                if (_resStr.length > 0) {
                  _resStr = _resStr + '<br/>' + _v
                } else {
                  _resStr = _v
                }
              }
            } else {
              return false
            }
          }
          if (_resStr.length > 0) {
            if (KS.__st && (KS.__st).length > 0) {
              KS.__st2 = KS.__st;
              KS.__st += '<br/>'
            } else {
              KS.__st = '[]<br/>'
            }
            KS.__st += '<span class=\"remarkTitle\">[' + kslang.oc_vi_prefix + ']:</span><br/>' + _resStr
          }
        }
        ksComm.hideMask();
        d.style.display = "none"
      } catch (e) {}
      KS.hasCollect = true;
      KS.initVi()
    };
    ksComm.$("oc_vi_cancle").onclick = function() {
      window.opener = null;
      window.close()
    };
    ksComm.showMask();
    d.style.display = "block";
    try {
      var f = KS.cwAdvVicDis;
      if (f) {
        var g = f.split(',');
        for (var j = 0; j < g.length; j++) {
          var h = ksComm.$('oc_vi__' + g[j]);
          if (h) {
            h.focus();
            break
          } else {
            continue
          }
        }
      }
    } catch (e) {}
    return true
  },
  sendRobotMsgCallback: function(a) {
    if (a.success) {
      this.chatOvertime = 0;
      this.intervalVtWaitTime = 0;
      this.insertRobotMsg(a.sendTime, a.data)
    } else if (a.expired && this.chatStatus < 2 && this.chatStatus != 4) {
      this.setChatTitle(kslang.oc_js_dialogAlreadyEnd);
      this.insertEndDialogMsg();
      this.changChatStatus(2);
      this.robotReceiving = 0
    } else {
      this.chatOvertime = 0;
      this.intervalVtWaitTime = 0;
      this.insertRobotMsg(new Date().format(), kslang.oc_js_robotNoAnswer)
    }
  },
  delayConnChat: function(b, c) {
    if (c > 0) ksOnlineChat.setChatTitle('<font color=red>' + (c--) + '</font> ' + kslang.oc_js_delayConn);
    var d = window.setInterval(function() {
      if (ksOnlineChat.chatStatus != 4) {
        window.clearInterval(d);
        d = null;
        return
      }
      if (c > 0) {
        ksOnlineChat.setChatTitle('<font color=red>' + (c--) + '</font> ' + kslang.oc_js_delayConn)
      } else {
        try {
          window.clueInit({
            client: KS.__ci,
            client_type: 'kst',
            callback: function(a) {
              b.bid = JSON.parse(a).bid;
              ksOnlineChat.connChat(b)
            }
          })
        } catch (e) {
          ksOnlineChat.connChat(b)
        }
        window.clearInterval(d);
        d = null
      }
    }, 1000)
  },
  connChat: function(k) {
    if (this.chatStatus != 4 && !k['isvca']) {
      return
    }
    if (KS.__adArea) {
      ksOnlineChat.insertSysDialogMsg(KS.__adArea)
    }
    k['lng'] = KS.__lng;
    k['gr'] = KS.__gr;
    k['grs'] = KS.__grs;
    k['gn'] = KS.__gn;
    k['ln'] = KS.__ln;
    k['ri'] = KS.__ri;
    k['si'] = KS.__si;
    k['ci'] = KS.__ci;
    k['aai'] = KS.__aai;
    k['dp'] = KS.__dp;
    k['fd'] = KS.__fd;
    k['cdt'] = KS.__cdt;
    k['fi'] = KS.__fi;
    k['its'] = KS.__its;
    k['info'] = KS.__st;
    if (k['info'] && k['info'].length > 150) {
      k['info'] = k['info'].substring(0, 150)
    }
    k['cd'] = KS.__cd;
    k['ns'] = KS.__ns;
    k['rns'] = KS.__rns;
    k['cn'] = KS.__cn;
    k['clickSource'] = KS.__cs;
    k['st2'] = KS.__st2;
    k['ksvcode'] = KS.ksvcode;
    if (KS.rivcode) {
      k['rivcode'] = KS.rivcode
    }
    if (KS.lid) k['lid'] = KS.lid;
    if (KS.did) k['did'] = KS.did;
    if (KS.corrIp) k['cip'] = KS.corrIp;
    if (KS.r4EnableClose && KS.r4CloseTimeInterval) {
      k['t'] = KS.r4CloseTimeInterval
    }
    var l = ksComm.getQueryString(document.location.href, "ecInfo");
    if (l) l = l.replaceAll("+", " ").trim();
    if (l) k['ecInfo'] = l;
    if (KS.isWeb) {
      k['isWeb'] = true
    }
    KS.checkBrowser(k);
    if (KS.vt && KS.vt === 1) {
      k['vt'] = KS.vt
    }
    ksComm.get(KS.__basePath + 'connNew.htm', k, function(b) {
      if (b.success) {
        if (ksComm.recordStatusMap) ksComm.recordStatusMap = {};
        if (KS.errSev && KS.errIp && b.checkIPInfo) {
          if (b.txIpKey) {
            ksOnlineChat.getIPInfoByTencent(b.txIpKey)
          } else {
            ksOnlineChat.checkIPInfo()
          }
        }
        var c = b.type;
        var d = b.msg;
        KS.__sid = b.sid;
        KS.__ri = b.ri;
        KS.__name = b.name;
        KS.__cwId = b.cwId;
        KS.isMonitor = false;
        if (b.rck) {
          ksOnlineChat.rck = true
        }
        if (b.cvc) {
          KS.noCkParams = true;
          KS.delVisitorValueCookie('KS_lastVisitTime');
          KS.delVisitorValueCookie('KS_firstVisitTime');
          KS.delVisitorValueCookie('KS_visitPages');
          KS.delVisitorValueCookie('KS_visitCounts');
          KS.delVisitorValueCookie('KS_preVisitPages');
          KS.delVisitorValueCookie('KS_preDiaRi');
          KS.delVisitorValueCookie('KS_preDiaTime');
          KS.delVisitorValueCookie('KS_pc')
        } else if (!KS.noCkParams) {
          var f = b.viInfo;
          if (!f.isExist) {
            KS.setVisitorValueToCookie('KS_lastVisitTime', KS.__vt);
            if (f.isNewVs) {
              if (f.firstVisitTime && f.firstVisitTime != 0) {
                KS.setVisitorValueToCookie('KS_firstVisitTime', f.firstVisitTime)
              }
            }
          }
          if (f.hasViewPage) {
            KS.setVisitorValueToCookie('KS_visitPages', f.curVisitorPages);
            KS.setVisitorValueToCookie('KS_visitCounts', f.totalVisitTime);
            KS.setVisitorValueToCookie('KS_preVisitPages', f.preVisitPages)
          }
        }
        if (c == 0 || c == 4) {
          ksOnlineChat.changChatStatus(3);
          if (KS.isDir && !KS.is2015) {
            var g = ksComm.$("oc_comm_win_noserver");
            g.style.marginTop = -75 + document.documentElement.scrollTop + "px";
            ksComm.showMask();
            var h = ksComm.$('oc_comm_win_noserver_content');
            if (h) {
              h.innerHTML = KS.cwOffline || d || ''
            }
            g.style.display = "block";
            ksComm.$("oc_comm_win_noserver_ok").onclick = function() {
              ksComm.hideMask();
              g.style.display = "none"
            }
          } else {
            if (((typeof KS.cwOffline) != 'undefined') && (KS.cwOffline != '')) {
              alert(KS.cwOffline)
            } else {
              alert(d)
            }
          }
          if (b.nrc == 0) {
            if ((KS.ocCfg.btnVisible.leaveMsg == true && KS.lmCfg.lmDefinedEnabled == true) && KS.is2015) {
              ksComm.goNewPage(KS.lmCfg.lmDefinedUrl, KS.isDir, true)
            } else if (KS.ocCfg.btnVisible.leaveMsg == true || KS.is2015) {
              ksOnlineChat.openOtherWin('leavemsg.htm', KS.isDir && !KS.is2015, true)
            }
          } else if (b.nrc == 1) {
            if ((KS.ocCfg.btnVisible.freeCall == true && KS.fpCfg.fpDefinedEnabled == true) || KS.is2015) {
              ksOnlineChat.openOtherWin('getFcp.htm', KS.isDir && !KS.is2015, true)
            }
          } else if (b.nrc == 2) {
            if (typeof gotoRobot == 'function') {
              if (gotoRobot() === false) {
                return
              }
            } else {
              if ((KS.ocCfg.btnVisible.robotMsg == true && KS.rbCfg.bsEnabled == true && !KS.is2015) || (KS.is2015 && KS.rbCfg.bsEnabled == true)) {
                ksOnlineChat.openOtherWin('robot.htm', KS.isDir && !KS.is2015, true)
              }
            }
          }
        } else {
          ksOnlineChat.isvca = b.isvca;
          KS.setVisitorValueToCookie('KS_isvca', ksOnlineChat.isvca || '');
          if (!ksOnlineChat.isvca) {
            KS.useVCAPage = false
          }
          if (!ksOnlineChat.isvca && KS.vcaEva) {
            ksOnlineChat.insertSysDialogMsg(kslang['oc_js_online_ok'])
          } else {
            if (b.recs.length > 0) {
              var i = ksOnlineChat.operPreRecords(b.recs);
              if (!i) {
                return
              }
            }
          }
          ksOnlineChat.robotReceiving = b.irr ? 2 : 0;
          if (c == 2 || c == 5) {
            if (b.corder) {
              ksOnlineChat.showOrderWaitInfo(b.corder)
            }
            ksOnlineChat.operWaitAccept();
            ksOnlineChat.checkOvertime();
            setTimeout('ksOnlineChat.checkServerMsg()', 500)
          } else {
            ksOnlineChat.chatStatus = 1;
            try {
              if (KS.isDir) parent.postMessage('KS.wins[4].chatStatus=' + ksOnlineChat.chatStatus + ';', '*')
            } catch (e) {}
            ksOnlineChat.isTreated = true;
            ksOnlineChat.checkOvertime();
            if (b.c) {
              KS.__c = b.c;
              if (!KS.noCkParams) KS.setVisitorValueToCookie('KS_pc', KS.__c)
            }
            setTimeout('ksOnlineChat.checkServerMsg()', 500)
          }
          if (KS.cv) {
            onlineChatIns.setContent(KS.cv);
            onlineChatIns.sendMsg()
          }
          var j = window.setInterval(function() {
            if (ksOnlineChat.chatStatus >= 2) {
              window.clearInterval(j);
              j = null;
              return
            }
            var w = true;
            if (ksOnlineChat.lastTypeTime == null || (new Date().getTime() - ksOnlineChat.lastTypeTime >= 5000)) {
              w = false
            }
            if (w != ksOnlineChat.isWriting) {
              ksOnlineChat.isWriting = w;
              ksComm.get(KS.__basePath + 'dia/ow.htm', {
                ri: KS.__ri,
                ci: KS.__ci,
                si: KS.__si,
                iw: w
              }, function(a) {}, 'post')
            }
          }, 1000);
          if (!KS.noCkParams && KS.__ri && b.cTime) {
            KS.setVisitorValueToCookie('KS_preDiaRi', KS.__ri);
            KS.setVisitorValueToCookie('KS_preDiaTime', b.cTime)
          }
        }
        if (ksOnlineChat.isvca) {
          ksOnlineChat.setChatTitle(window.vcaTitle || '');
          KS.useVCAPage = true;
          if (window.checkShowBt) {
            checkShowBt()
          }
        } else {
          ksOnlineChat.setChatTitle(d)
        }
      } else {
        if (b.errorCode == 1401) {
          ksComm.$('chatTopArea').innerHTML = kslang['oc_js_shield'];
          ksOnlineChat.setChatTitle(kslang['oc_js_shield'])
        } else if (b.errorCode == 1411) {
          KS.delVisitorValueCookie('KS_' + KS.__cas);
          window.location.href = KS.__basePath + 'im.htm?cas=' + KS.__cas + '&fi=' + KS.__fi + '&sText=DialogSiteNoMatch:' + KS.visitorSign
        } else if (b.errorCode == 1301) {
          KS.cwAdvAuthCode = true;
          ksOnlineChat.openVerifyWin(function() {
            ksOnlineChat.connChat(k)
          });
          return false
        } else {
          ksOnlineChat.setChatTitle(kslang.oc_js_failConn(b.errorCode))
        }
      }
      ksOnlineChat.showKsMsg()
    }, 'post')
  },
  getScreenPic: function(a) {
    return '<a href="' + a + '" target="_blank"><img class="ks_screen_img" src="' + a + '" border="0"/></a><br/>' + '<a class="ks_screen_a" href="' + a + '" target="_blank">' + kslang.oc_js_viewPic + '</a>&nbsp;&nbsp;&nbsp;&nbsp;' + '<a class="ks_screen_a" href="#" onclick="ksComm.saveAsPicOrFile(\'' + a + '\');">' + kslang.oc_js_savePic + '</a>'
  },
  operPreRecords: function(a) {
    try {
      var i = 0,
        j = 0;
      var b = [];
      for (i = 0; i < a.length; i++) {
        j++;
        var c = a[i];
        var d = c.msg || '',
          __type = c.msgType,
          __sendTime = c.sendTime,
          __name = c.sender || '';
        if (c.localId) {
          b.push(c.localId)
        }
        ksOnlineChat.lastReceiveMsg = {
          type: __type,
          clientSendTime: __sendTime,
          msg: d
        };
        if (__type == 0) {
          ksOnlineChat.insertOtherDialogMsg(d)
        } else if (__type == 23 || __type == 37) {
          if (d && d.indexOf('┣') == -1) {
            ksOnlineChat.insertOtherDialogMsg(d)
          }
        } else if (__type == 42) {
          ksOnlineChat.insertVtDialogMsg(__sendTime, this.getScreenPic(d))
        } else if (__type == 10) {
          ksOnlineChat.insertCsDialogMsg(__name, __sendTime, d, true)
        } else if (__type == 12) {
          ksOnlineChat.insertVtDialogMsg(__sendTime, d)
        } else if (__type == 30) {
          if (d.indexOf('[{') != -1) {
            try {
              d = eval('(' + d + ')')
            } catch (e) {}
          }
          ksOnlineChat.insertRobotMsg(__sendTime, d)
        } else if (__type == 33) {
          ksOnlineChat.insertCsDialogMsg(KS.rbCfg.robotName, __sendTime, d ? d : KS.rbCfg.enterRobot, false)
        } else if (__type == 19 || __type == 67 || __type == 671 || __type == 672 || __type == 43 || __type == 22 || __type == 24 || __type == 29) {
          j--
        } else {
          j--
        }
      }
      ksComm.changStatus(b);
      if (j > 0) {}
    } catch (e) {
      ksComm.alertDebugMsg(e)
    }
    return true
  },
  operWaitAccept: function() {
    ksOnlineChat.changChatStatus(0);
    if (KS.curOrder) return;
    var b = KS.ocCfg.autoResponse;
    var c = KS.rbCfg;
    if (b.r1EnableTimeInterval == true) {
      ksOnlineChat.autoResponseTime1 = 0;
      var d = window.setInterval(function() {
        if (ksOnlineChat.chatStatus != 0 || KS.curOrder) {
          window.clearInterval(d);
          d = null;
          return
        }
        if (ksOnlineChat.autoResponseTime1 < b.r1TimeInterval) {
          ksOnlineChat.autoResponseTime1++
        } else {
          if (ksOnlineChat.chatStatus == 0) {
            ksOnlineChat.insertSysDialogMsg(b.r1AutoContent)
          }
          window.clearInterval(d);
          d = null
        }
      }, 1000)
    }
    if (ksOnlineChat.robotReceiving == 0 && c.enabled == true && c.noReceiveTimeout != 0) {
      ksOnlineChat.robotReceiveTime = 0;
      var e = window.setInterval(function() {
        if (ksOnlineChat.chatStatus != 0 || KS.curOrder || ksOnlineChat.robotReceiving == 2) {
          window.clearInterval(e);
          e = null;
          return
        }
        if (ksOnlineChat.robotReceiveTime < c.noReceiveTimeout) {
          ksOnlineChat.robotReceiveTime++
        } else {
          ksOnlineChat.robotReceiving = 1;
          ksComm.get(KS.__basePath + 'rbtr.htm', {
            ri: KS.__ri,
            ci: KS.__ci,
            si: KS.__si,
            en: c.noReceive,
            rn: c.robotName,
            cwId: KS.__cwId || ''
          }, function(a) {
            if (a.success == true) {
              ksOnlineChat.robotReceiving = 2;
              ksOnlineChat.insertRobotMsg(a.sendTime, c.noReceive)
            } else {
              ksOnlineChat.robotReceiving = 1
            }
          }, 'post');
          window.clearInterval(e);
          e = null
        }
      }, 1000)
    }
  },
  checkServerMsg: function() {
    if (this.chatStatus >= 2) {
      if (KS.isDir) {
        try {
          parent.postMessage('KS.reMonitor()', '*')
        } catch (e) {}
      }
      return
    }
    var c = {};
    c['ri'] = KS.__ri;
    c['si'] = KS.__si;
    c['ci'] = KS.__ci;
    c['sid'] = KS.__sid;
    c['rmc'] = this.receiveMsgCount++;
    c['cwId'] = KS.__cwId || '';
    if (ksOnlineChat.rck) {
      c['rck'] = true
    }
    if (ksOnlineChat.lastReceiveMsg) {
      if (KS.lastReceive && KS.lastReceive.getTime() < new Date().getTime() - 2 * 60 * 1000) {
        c['lastType'] = ksOnlineChat.lastReceiveMsg.type;
        c['lastTime'] = (ksOnlineChat.lastReceiveMsg.clientSendTime && new Date(ksOnlineChat.lastReceiveMsg.clientSendTime.replace('-', '/')) || KS.lastReceive).getTime()
      }
    }
    if (KS.r4EnableClose && KS.r4CloseTimeInterval) {
      c['t'] = KS.r4CloseTimeInterval
    }
    if (ksComm.isActivePage) {
      c['active'] = 1
    }
    try {
      var d = KS.lastReceive;
      ksComm.ajax({
        type: 'POST',
        dataType: 'json',
        timeout: 30000,
        url: KS.__basePath + 'dia/receive.htm',
        data: c,
        success: function(a) {
          var b = d == KS.lastReceive;
          if (b) {
            KS.lastReceive = new Date()
          }
          ksOnlineChat.rck = false;
          ksOnlineChat.receiveMsgCallback(a);
          KS.isMonitor = true;
          if (a.success == false && a.expired == false) {
            setTimeout('ksOnlineChat.checkServerMsg()', 5000);
            if (KS.__isDebug || KS.__isInTest) {
              ksOnlineChat.insertSysDialogMsg('您的参数变空了,如果接受不到消息,请重新打开对话,t:' + a.time + ',pri:' + c['ri'] + ",ri:" + KS.__ri)
            }
          } else {
            if (ksOnlineChat.chatStatus < 2 && b) {
              ksOnlineChat.checkServerMsg()
            } else {
              if (KS.isDir) {
                try {
                  parent.postMessage('KS.reMonitor()', '*')
                } catch (e) {}
              }
            }
          }
        },
        complete: function(a, b) {
          if (b != 'success') {
            setTimeout('ksOnlineChat.checkServerMsg()', 5000)
          }
        }
      })
    } catch (e) {}
  },
  receiveMsgCallback: function(a) {
    try {
      if (a.success) {
        if (a.sid) KS.__sid = a.sid;
        if (a.rck) {
          ksOnlineChat.rck = true
        }
        var b = a.data;
        var c = [];
        for (var i = 0; i < b.length; i++) {
          var d = b[i];
          var g = d.msg || '',
            __type = d.type,
            __sendTime = d.clientSendTime,
            __name = d.name || '';
          if (d.localId) {
            c.push(d.localId);
            if (ksComm.recordStatusMap && ksComm.recordStatusMap[d.localId]) {
              continue
            }
          }
          if (!__sendTime || __sendTime.indexOf('1970') != -1) {
            __sendTime = new Date().format()
          }
          if (__type != 62 && __type != 65) {
            try {
              var h = ksComm.isActivePage;
              window.focus();
              onlineChatIns.getInstance().focus();
              ksComm.isActivePage = h
            } catch (e) {}
            if (__type != 82) {
              ksOnlineChat.lastReceiveMsg = {
                type: __type,
                clientSendTime: __sendTime,
                msg: g
              };
              if (__type == 78) {
                ksOnlineChat.lastReceiveMsg.type = 12
              } else if (__type == 79) {
                ksOnlineChat.lastReceiveMsg.type = 30
              } else if (__type == 31) {
                ksOnlineChat.lastReceiveMsg.type = 33
              }
            }
          }
          if (__type == 0) {
            this.insertOtherDialogMsg(g)
          } else if (__type == 106) {
            if (KS.useNewVCAPage) {
              KS.useVCAPage = true;
              ksOnlineChat.isvca = true;
              this.robotReceiving = 2;
              if (window.checkShowBt) {
                checkShowBt()
              }
              ksOnlineChat.setChatTitle()
            }
          } else if (__type == 43) {
            ksOnlineChat.chatStatus = 2;
            ksOnlineChat.insertEndDialogMsg();
            ksOnlineChat.setChatTitle(g.replace('{0}', KS.r4CloseTimeInterval))
          } else if (__type == 78) {
            ksOnlineChat.insertVtDialogMsg(__sendTime, g)
          } else if (__type == 79) {
            if (!__sendTime) __sendTime = new Date().format();
            ksOnlineChat.insertRobotMsg(__sendTime, g)
          } else if (__type == 4) {
            this.chatOvertime = 0;
            this.intervalCusWaitTime = 0;
            this.robotReceiving = 0;
            ksOnlineChat.changChatStatus(0);
            this.setChatTitle(g);
            this.insertSysDialogMsg(g);
            KS.curOrder = null
          } else if (__type == 20) {
            this.robotReceiving = 0;
            this.vtTurnEvent();
            this.openServiceEvaluateWin()
          } else if (__type == 21) {
            if (this.chatStatus != 1) {
              ksOnlineChat.changChatStatus(1);
              this.robotReceiving = 0
            }
            this.setChatTitle(g);
            this.isTreated = true;
            this.checkOvertime();
            if (KS.fpCfg.fpcConnType == 2 && d.c > 0) {
              KS.__c = d.c
            }
            if (!KS.noCkParams && d.c > 0) {
              KS.setVisitorValueToCookie('KS_pc', d.c)
            }
          } else if (__type == 22) {
            ksOnlineChat.changChatStatus(2);
            this.setChatTitle(g);
            this.insertEndDialogMsg();
            this.robotReceiving = 0
          } else if (__type == 23) {
            this.insertOtherDialogMsg(g)
          } else if (__type == 24) {
            if (d.rck && KS.isMonitor) {
              ksOnlineChat.changChatStatus(4);
              KS.__adArea = null;
              KS.initVi()
            } else {
              this.setChatTitle(g);
              this.insertEndDialogMsg();
              ksOnlineChat.changChatStatus(2);
              this.robotReceiving = 0
            }
          } else if (__type == 25) {
            if (g.jump != 0) {
              ksOnlineChat.changChatStatus(2)
            }
            this.robotReceiving = 0;
            ksOnlineChat.transferinfoShow = g.transferinfoShow;
            if (!KS.cwDisCsName) {
              this.setChatTitle(g.msg)
            } else {
              if (ksOnlineChat.transferinfoShow) {
                this.setChatTitle(g.msg)
              }
            }
            if (g.jump == 0) {
              if (g.recDesc && KS.cwDisCsName) {
                this.insertCsDialogMsg(KS.cwDisCsName, __sendTime, g.recDesc, false)
              } else if (g.recDesc) {
                this.insertCsDialogMsg(g.sn, __sendTime, g.recDesc, false)
              }
              return
            } else {
              if (g.recDesc) {
                alert(g.recDesc)
              }
            }
            var j = {},
              baseUrl = KS.__basePath;
            if (g.cusDesc) {
              j['cusDesc'] = g.cusDesc
            }
            if (g.jump == 1) {
              j['ln'] = g.ln;
              j['ci'] = KS.__ci;
              j['its'] = 'rt_ct'
            } else if (g.jump == 2) {
              j['ci'] = g.ci;
              j['its'] = 'rt_ot';
              if (g.url) {
                baseUrl = g.url
              }
            } else {
              j['its'] = ''
            }
            j['si'] = g.si;
            j['fi'] = g.fi;
            window.onbeforeunload = null;
            var f = document.createElement('form');
            f.setAttribute('method', 'get');
            f.setAttribute('action', baseUrl + 'im.htm');
            for (var p in j) {
              var k = document.createElement('input');
              k.setAttribute('type', 'hidden');
              k.setAttribute('value', j[p]);
              k.setAttribute('name', p);
              f.appendChild(k)
            }
            document.body.appendChild(f);
            f.submit()
          } else if (__type == 27) {
            this.robotReceiving = 0;
            this.vtTurnEvent();
            this.browserShake();
            this.insertOtherDialogMsg(g)
          } else if (__type == 29) {
            if (KS.useVCAPage) {}
            this.setChatTitle(g);
            this.insertEndDialogMsg();
            ksOnlineChat.changChatStatus(2);
            this.robotReceiving = 0
          } else if (__type == 36) {
            this.setChatTitle(g)
          } else if (__type == 37) {
            this.setChatTitle(g);
            this.robotReceiving = 0;
            this.operWaitAccept()
          } else if (__type == 31) {
            if (this.robotReceiving == 2) {
              this.vtTurnEvent()
            } else {
              this.robotReceiving = 2;
              this.insertRobotMsg(__sendTime, g || KS.rbCfg.noReceive)
            }
          } else if (__type == 33) {
            if (this.robotReceiving == 2) {
              this.vtTurnEvent()
            } else {
              this.robotReceiving = 2;
              this.insertRobotMsg(__sendTime, KS.rbCfg.enterRobot)
            }
          } else if (__type == 34 || __type == 38) {
            this.chatOvertime = 0;
            this.intervalCusWaitTime = 0;
            this.robotReceiving = 0
          } else if (__type == 40) {
            this.setChatTitle(g);
            this.robotReceiving = 0;
            if (KS.fpCfg.fpcConnType == 2 && d.c > 0) {
              KS.__c = d.c
            }
            if (!KS.noCkParams && d.c > 0) {
              KS.setVisitorValueToCookie('KS_pc', d.c)
            }
            ksOnlineChat.transferinfoShow = false
          } else if (__type == 41) {
            if (KS.cwDisCsName) {
              if (ksOnlineChat.transferinfoShow) {
                this.setChatTitle(g)
              } else {
                this.setChatTitle(kslang.oc_tranfer_notaccept)
              }
            } else {
              this.setChatTitle(g)
            }
            ksOnlineChat.changChatStatus(0)
          } else if (__type == 42) {
            this.robotReceiving = 0;
            this.insertVtDialogMsg(__sendTime, this.getScreenPic(g))
          } else if (__type == 44) {
            this.robotReceiving = 0;
            if (g.indexOf('§') != -1) {
              var l = g.split('§');
              if (l[1] != '') {
                alert(l[1])
              }
              if (l[0] != '') {
                try {
                  window.onbeforeunload = null;
                  window.location.href = l[0]
                } catch (e) {}
              }
            } else if (l[0] != '') {
              try {
                window.onbeforeunload = null;
                window.location.href = l[0]
              } catch (e) {}
            }
          } else if (__type == 45) {
            KS.__name = g
          } else if (__type == 46) {
            ksOnlineChat.changChatStatus(2);
            this.setChatTitle(kslang.oc_js_dialogAlreadyEnd);
            this.insertEndDialogMsg();
            this.robotReceiving = 0
          } else if (__type == 49) {
            ksOnlineChat.changChatStatus(2);
            this.setChatTitle(g);
            this.insertEndDialogMsg();
            this.robotReceiving = 0
          } else if (__type == 52 || __type == 53) {
            if (this.chatStatus != 0) {
              if (__type == 52 && KS.cwDisCsName) {
                if (!ksOnlineChat.transferinfoShow) {
                  this.setChatTitle(kslang.oc_tranfer_notaccept)
                } else {
                  if (g.indexOf(kslang.oc_js_dialogWait) > -1) {
                    this.setChatTitle(g)
                  } else {
                    this.setChatTitle(kslang.oc_js_dialogWait)
                  }
                  this.insertSysDialogMsg(g)
                }
              } else {
                if (g.indexOf(kslang.oc_js_dialogWait) > -1) {
                  this.setChatTitle(g)
                } else {
                  this.setChatTitle(kslang.oc_js_dialogWait)
                }
                this.insertSysDialogMsg(g)
              }
              ksOnlineChat.changChatStatus(0);
              this.robotReceiving = 0
            }
            this.chatOvertime = 0;
            this.intervalCusWaitTime = 0;
            KS.curOrder = null
          } else if (__type == 62) {
            if (KS.cwDisCsName) {
              __name = KS.cwDisCsName
            }
            if (ksComm.browser.other && ksComm.$('oc_top_title2')) {
              ksComm.$('oc_top_title2').innerHTML = kslang.oc_js_csIsTyping(__name)
            } else {
              ksComm.$('oc_top_title').innerHTML = kslang.oc_js_csIsTyping(__name)
            }
          } else if (__type == 65) {
            if (ksComm.browser.other && ksComm.$('oc_top_title2')) {
              ksComm.$('oc_top_title2').innerHTML = ''
            } else {
              ksComm.$('oc_top_title').innerHTML = this.curChatTitle
            }
          } else if (__type == 10 || __type == 72) {
            if (KS.isDir) {
              try {
                parent.postMessage('if(KS.wins[4].curViewStatus==1)KS.wins[4].show(true);', '*')
              } catch (e) {}
            }
            this.insertCsDialogMsg(__name, __sendTime, g, true);
            this.robotReceiving = 0;
            this.waitVtAnser()
          } else if (__type == 82) {
            if (ksOnlineChat.chatStatus == 0 && KS.curOrder != 'undefined' && g) {
              ksOnlineChat.showOrderWaitInfo(g)
            }
          }
          if (__type == 40 || __type == 21) {
            var m = ksComm.$('ks_ordermsg');
            if (m) {
              m.style.display = 'none';
              KS.curOrder = null
            }
          }
          if (__type != 40 && __type != 21 && __type != 27 && __type != 78 && __type != 79) {
            ksOnlineChat.promptNewMsg()
          }
        }
        ksComm.changStatus(c)
      } else {
        ksOnlineChat.unexceptedEndDialg(a)
      }
    } catch (e) {
      ksComm.alertDebugMsg(e)
    }
  },
  showOrderWaitInfo: function(a) {
    var b = parseInt(a, 10);
    if (!KS.curOrder || KS.curOrder > b) {
      KS.curOrder = b;
      var c = ksComm.$('ks_ordermsg');
      if (c) {
        ksComm.$('ks_ordermsg_num').innerHTML = b;
        c.style.display = ''
      } else {
        var d = [];
        d.push('<div class="msg_tip" id="ks_ordermsg">');
        d.push('<div class="msg">');
        d.push('<div class="title">', ksComm.getLang('oc_editor_orderInfo(' + b + ')'), '</div>');
        d.push('<div class="title">', ksComm.getLang('oc_editor_orderLeave'), '</div>');
        d.push('</div>');
        d.push('</div>');
        this.insertMsg(d.join(''))
      }
    }
  },
  openLeaveWin: function(a) {
    if ((KS.ocCfg.btnVisible.leaveMsg == true && KS.lmCfg.lmDefinedEnabled == true) || (KS.isDir && KS.lmCfg.lmDefinedEnabled == true)) {
      window.open(KS.lmCfg.lmDefinedUrl, ksComm.browser.msie ? '' : 'leaveMsg', '')
    } else if (KS.ocCfg.btnVisible.leaveMsg == true || KS.isDir) {
      ksOnlineChat.openOtherWin('leavemsg.htm', !KS.switchWinType || KS.isDir)
    }
  },
  unexceptedEndDialg: function(a) {
    if (a.expired && this.chatStatus < 2 && this.chatStatus != 4) {
      try {
        ksOnlineChat.changChatStatus(2);
        this.robotReceiving = 0;
        var b = a.type,
          s = a.show;
        if (b == 5) {
          this.setChatTitle(kslang.oc_js_chatIdNotEqu)
        } else if (s && b) {
          this.setChatTitle(kslang.oc_js_dialogAlreadyEndType(b))
        } else {
          this.setChatTitle(kslang.oc_js_dialogAlreadyEnd)
        }
        this.insertEndDialogMsg()
      } catch (e) {
        ksComm.alertDebugMsg(e)
      }
    }
  },
  changChatStatus: function(a) {
    if (a || a == 0) {
      if (ksOnlineChat.chatStatus != a) {
        ksOnlineChat.transferinfoShow = false;
        ksOnlineChat.chatStatus = a;
        if (a == 1) {
          if (arguments.callee.caller == ksOnlineChat.receiveMsgCallback) {
            if (ksOnlineChat.isvca) {
              ksOnlineChat.isvca = false;
              KS.useVCAPage = false;
              ksOnlineChat.robotReceiving = 0
            }
          }
        } else {
          if (ksOnlineChat.isvca) {
            ksOnlineChat.isvca = false;
            KS.useVCAPage = false;
            KS.setVisitorValueToCookie('KS_isvca', '')
          }
        }
        try {
          if (KS.isDir) parent.postMessage('KS.wins[4].chatStatus=' + ksOnlineChat.chatStatus + ';', '*')
        } catch (e) {}
      }
    }
  },
  sendMsgCallback: function(b, c) {
    if (b.success) {
      ksOnlineChat.lastReceiveMsg = {
        type: 12,
        clientSendTime: b.data.clientSendTime,
        msg: c
      };
      ksOnlineChat.insertVtDialogMsg(b.data.clientSendTime, c);
      if (b.data.sid) {
        KS.__sid = b.data.sid
      }
      var d = KS.ocCfg.autoResponse;
      var e = KS.rbCfg;
      if (this.chatStatus == 1 && !ksOnlineChat.intervalCusWait) {
        ksOnlineChat.intervalCusWait = window.setInterval(function() {
          if (ksOnlineChat.chatStatus >= 2 || KS.curOrder || ksOnlineChat.robotReceiving == 2) {
            window.clearInterval(ksOnlineChat.intervalCusWait);
            ksOnlineChat.intervalCusWait = null;
            return
          }
          if (ksOnlineChat.cusIsWaiting) {
            ksOnlineChat.intervalCusWaitTime++
          }
          if ((d.r2EnableTimeInterval == true) && (ksOnlineChat.vtIsWaiting == false) && (ksOnlineChat.intervalCusWaitTime == d.r2TimeInterval)) {
            ksOnlineChat.insertSysDialogMsg(d.r2AutoContent)
          }
          if ((d.r5EnableTimeInterval == true) && (ksOnlineChat.vtIsWaiting == false) && (ksOnlineChat.intervalCusWaitTime == d.r5TimeInterval)) {
            ksOnlineChat.insertSysDialogMsg(d.r5AutoContent)
          }
          if (ksOnlineChat.robotReceiving == 0 && (ksOnlineChat.vtIsWaiting == false) && e.enabled == true && e.noResponseTimeout != 0 && ksOnlineChat.intervalCusWaitTime >= e.noResponseTimeout) {
            ksOnlineChat.robotReceiving = 1;
            ksComm.get(KS.__basePath + 'rbtr.htm', {
              ri: KS.__ri,
              ci: KS.__ci,
              si: KS.__si,
              en: e.noResponse,
              rn: e.robotName,
              cwId: KS.__cwId || ''
            }, function(a) {
              if (a.success == true) {
                ksOnlineChat.robotReceiving = 2;
                ksOnlineChat.insertRobotMsg(a.sendTime, e.noResponse)
              } else {
                ksOnlineChat.robotReceiving = 1
              }
            }, 'post')
          }
        }, 1000)
      }
    } else {
      ksOnlineChat.unexceptedEndDialg(b)
    }
  },
  promptNewMsg: function() {
    if (ksOnlineChat.hasNewMsg && ksOnlineChat.intervalPromptNewMsg == null) {
      ksOnlineChat.intervalPromptNewMsg = window.setInterval(function() {
        if (ksOnlineChat.hasNewMsg == true && ksOnlineChat.chatStatus < 2) {
          if (document.title == kslang.oc_js_hasNewMsg) {
            document.title = KS.ocCfg.title
          } else {
            document.title = kslang.oc_js_hasNewMsg
          }
        } else {
          document.title = KS.ocCfg.title;
          window.clearInterval(ksOnlineChat.intervalPromptNewMsg);
          ksOnlineChat.intervalPromptNewMsg = null
        }
      }, 500)
    }
  },
  preKnow: function(b) {
    if ((!KS.useVCAPage || KS.useNewVCAPage) && KS.__preKnow == true && ksOnlineChat.chatOvertime != 1) {
      if (b != ksOnlineChat.lastText && !ksOnlineChat.doPring) {
        ksOnlineChat.doPring = true;
        ksComm.ajax({
          type: 'POST',
          dataType: 'json',
          timeout: 10000,
          url: KS.__basePath + 'dia/pre.htm',
          data: {
            ri: KS.__ri,
            ci: KS.__ci,
            si: KS.__si,
            ms: b,
            time: new Date().format()
          },
          success: function(a) {
            ksOnlineChat.doPring = false;
            ksOnlineChat.lastText = b
          },
          error: function() {
            ksOnlineChat.doPring = false
          }
        })
      }
    }
  },
  checkOvertime: function() {
    var c = KS.ocCfg.autoResponse;
    ksOnlineChat.chatOvertime = 0;
    if (ksOnlineChat.intervalCheckOvertime == null) {
      ksOnlineChat.intervalCheckOvertime = window.setInterval(function() {
        if (ksOnlineChat.chatStatus >= 2) {
          window.clearInterval(ksOnlineChat.intervalCheckOvertime);
          ksOnlineChat.intervalCheckOvertime = null;
          return
        }
        ksOnlineChat.chatOvertime++;
        ksOnlineChat.preKnow(onlineChatIns.getContentText());
        if (ksOnlineChat.chatStatus < 2 && c.r4EnableClose == true && (ksOnlineChat.chatOvertime >= c.r4CloseTimeInterval) && !KS.curOrder) {
          ksOnlineChat.insertEndDialogMsg();
          ksOnlineChat.changChatStatus(2);
          if (KS.__ri == '') {
            return
          }
          var b = {};
          b['ri'] = KS.__ri;
          b['ci'] = KS.__ci;
          b['si'] = KS.__si;
          b['t'] = Math.ceil(c.r4CloseTimeInterval / 60);
          b['lng'] = KS.__lng;
          ksComm.get(KS.__basePath + 'chat/to.htm', b, function(a) {
            if (a.success == true) {
              ksOnlineChat.setChatTitle(a.msg)
            }
          }, 'post')
        }
      }, 1000)
    }
  },
  beforeUnloadEvent: function() {
    if ((!KS.isDir || (KS.isDir && KS.is2015)) && this.chatStatus < 2) {
      if (!KS.__isMobile && this.isTreated && this.hasEvaluated == false && KS.ocCfg.valuation.exitPrompt == true && this.chatStatus !== 0) {
        this.openServiceEvaluateWin();
        return kslang.oc_js_hasNotVal
      }
      return kslang.comm_beforeunload
    }
  },
  unloadWindowEvent: function(a) {
    if (this.chatStatus >= 2 || !a && KS.isDir && !KS.is2015) {
      return
    }
    this.changChatStatus(2);
    var u = KS.__basePath + 'chat/closeChat.htm?ri=' + KS.__ri + '&ci=' + KS.__ci + '&si=' + KS.__si + '&cwId=' + (KS.isDir && !KS.is2015 && KS.__cwId ? KS.__cwId : '') + '&d=' + new Date().getTime();
    ksComm.ajax({
      url: u,
      async: false
    });
    if (!KS.isDir && this.ifEndAlert && !ksComm.browser.sogou) {
      if (KS.ocCfg.favourite.addFavourite == true) {
        if (KS.ocCfg.favourite.favouriteWindow == true) {
          ksComm.addFavourite(KS.__basePath + 'im.htm?cas=' + KS.__cas + '&fi=' + KS.__fi, kslang.oc_js_addFavTitle)
        } else {
          ksComm.addFavourite(KS.ocCfg.favourite.customeUrl, KS.ocCfg.favourite.customTitle)
        }
      }
    }
  },
  vtTurnEvent: function() {
    this.intervalCusWaitTime = 0;
    this.chatOvertime = 0;
    this.vtIsWaiting = true;
    this.cusIsWaiting = false
  },
  waitVtAnser: function(a) {
    var b = KS.ocCfg.autoResponse;
    if (a) {
      if (!KS.useNewVCAPage) {
        return
      }
      ksOnlineChat.vtTurnEvent()
    }
    if (!ksOnlineChat.intervalVtWait) {
      ksOnlineChat.intervalVtWait = window.setInterval(function() {
        if (ksOnlineChat.chatStatus >= 2 || KS.curOrder) {
          window.clearInterval(ksOnlineChat.intervalVtWait);
          ksOnlineChat.intervalVtWait = null;
          return
        }
        if (ksOnlineChat.vtIsWaiting) {
          ksOnlineChat.intervalVtWaitTime++
        }
        if ((b.r3EnableTimeInterval == true) && (ksOnlineChat.cusIsWaiting == false) && (ksOnlineChat.intervalVtWaitTime == b.r3TimeInterval)) {
          ksOnlineChat.insertSysDialogMsg(b.r3AutoContent)
        }
        if ((b.r4EnableTimeInterval == true) && (ksOnlineChat.cusIsWaiting == false) && (ksOnlineChat.intervalVtWaitTime == b.r4TimeInterval)) {
          ksOnlineChat.insertSysDialogMsg(b.r4AutoContent)
        }
      }, 1000)
    }
  },
  csTurnEvent: function() {
    this.intervalVtWaitTime = 0;
    this.chatOvertime = 0;
    this.cusIsWaiting = true;
    this.vtIsWaiting = false
  },
  checkDirShotTime: function(a, b) {
    if (!a) a = new Date().format();
    if (!b || b && KS.isDir) {
      if (a && a.length > 10) {
        a = a.substring(11)
      }
    }
    return a
  },
  insertHisDialogHr: function() {
    var a = [];
    a.push('<div class="his_msg"><table align="center" border="0" cellpadding="0" cellspacing="0"><tr>');
    a.push('<td class="before"></td>');
    a.push('<td>', kslang.oc_js_hisHr, '</td>');
    a.push('<td class="after"></td>');
    a.push('</tr></table></div>');
    this.insertMsg(a.join(''))
  },
  insertEndDialogMsg: function() {
    if (KS.useVCAPage && arguments.callee.caller == ksOnlineChat.receiveMsgCallback) {
      return
    }
    var a = [];
    if (KS.ocCfg.autoResponse.dialogEndEnable == true) {
      a.push('<div class="other_msg">', KS.ocCfg.autoResponse.dialogEndContent, '</div>')
    }
    this.insertMsg(a.join(''));
    ksOnlineChat.playSysSound()
  },
  insertOtherDialogMsg: function(a) {
    var b = [];
    b.push('<div class="other_msg"><span style="color:' + (KS.is2015 && !KS.chatMsgStyle ? '#9a9a9a' : KS.ocCfg.fontcolor.othermsg) + '">');
    b.push(a);
    b.push('</span></div>');
    this.insertMsg(b.join(''));
    ksOnlineChat.playSysSound()
  },
  insertCsDialogMsg: function(a, b, c, d) {
    if (KS.cwDisCsName && d == true) {
      a = KS.cwDisCsName
    }
    this.vtTurnEvent();
    b = ksOnlineChat.checkDirShotTime(b, true);
    var e = [];
    e.push('<div class="msg_cs">');
    e.push('<div class="title"><span style="color:' + (KS.is2015 && !KS.chatMsgStyle ? '#9a9a9a' : KS.ocCfg.fontcolor.customername) + '">' + a + ' ' + b + '</span></div>');
    e.push('<div class="msg">', KS.isDir && (!KS.is2015 || (KS.is2015 && !KS.chatMsgStyle)) ? '<div class="before k_s_ol_pngFix"></div>' : '', '<span style="color:' + (KS.is2015 && !KS.chatMsgStyle ? '#161515' : KS.ocCfg.fontcolor.customermsg) + '">');
    if (KS.is2015 && !KS.chatMsgStyle && c.indexOf('playVoice') >= 0) {
      c = c.replace('margin-top:5px;', '')
    }
    e.push(c);
    e.push('</span></div>');
    e.push('<div style="clear:both"></div></div>');
    this.insertMsg(e.join(''));
    ksOnlineChat.playSysSound()
  },
  insertVtDialogMsg: function(a, b) {
    this.csTurnEvent();
    var c = 'q' + new Date().getTime() + '_' + Math.round(Math.random() * 1000);
    var d = [];
    a = ksOnlineChat.checkDirShotTime(a, true);
    d.push('<div class="msg_cus">');
    d.push('<div class="title"><span style="color:' + (KS.is2015 && !KS.chatMsgStyle ? '#9a9a9a' : KS.ocCfg.fontcolor.visitorname) + '">' + (KS.is2015 && (!KS.is2015 || (KS.is2015 && !KS.chatMsgStyle)) ? a : (kslang.oc_js_youSay + '：' + a)) + '</span></div>');
    d.push('<div class="msg">', KS.isDir && (!KS.is2015 || (KS.is2015 && !KS.chatMsgStyle)) ? '<div class="after k_s_ol_pngFix"></div>' : '', '<span style="color:' + (KS.is2015 && !KS.chatMsgStyle ? '#161515' : KS.ocCfg.fontcolor.visitormsg) + '" id="', c, '">');
    d.push(b);
    d.push('</span></div>');
    d.push('<div style="clear:both"></div></div>');
    this.insertMsg(d.join(''));
    return c
  },
  insertSysDialogMsg: function(a, b, c) {
    var d = [];
    if (KS.isDir && (!KS.is2015 || (KS.is2015 && !KS.chatMsgStyle))) {
      d.push('<div class="msg_tip">');
      d.push('<div class="msg">');
      d.push(a);
      d.push('</div>');
      d.push('</div>')
    } else {
      d.push('<div class="msg_cs">');
      d.push('<div class="title">');
      if (c) d.push('<span style="color:', (KS.is2015 && !KS.chatMsgStyle ? '#9a9a9a' : KS.ocCfg.fontcolor.visitorname), '">', kslang.oc_js_youSay, '：', b, '</span>');
      else d.push(' <span style="color:#ff0000;background:url(' + KS.__basePath + 'images/chat/comm/info.gif) left center no-repeat;padding: 3px 0px 0px 16px;">', kslang.oc_js_sysAlert, '</span>');
      d.push('</div>');
      d.push('<div class="msg"><span style="color:#000">');
      d.push(a);
      d.push('</span></div>');
      d.push('<div style="clear:both"></div></div>')
    }
    this.insertMsg(d.join(''));
    ksOnlineChat.playSysSound()
  },
  insertRobotMsg: function(b, c, e, f) {
    b = ksOnlineChat.checkDirShotTime(b, true);
    var g = c;
    if (g == null) {
      g = {}
    }
    if (typeof g == 'object' && !g.length) {
      if (g.answerType == -2) {
        c = g.answerContent || KS.rbCfg.noAnswer || '';
        KS.noanwerNum = (KS.noanwerNum || 0) + 1;
        if (KS.useVCAPage) {
          if (KS.noanwerNum >= 3) {
            c = '成长虽易，完善不易，且行且珍惜。' + KS.rbCfg.robotName + '会继续努力的！为了您的问题尽快解决，请咨询<a class="chatOnline" onclick="ksOnlineChat.gotoOnline()">人工客服</a>' + '<br/><span class="chatOnlineBnt"><img src="' + KS.__basePath + 'images/vca/vca4.png" style="margin:8px 4px 10px 0px;vertical-align:middle;"/><a class="chatOnline" onclick="ksOnlineChat.gotoOnline()">人工客服</a></span>'
          }
        }
      } else {
        KS.noanwerNum = 0;
        c = g.gusList;
        if (c && c.length > 0) {} else {
          c = g.answerContent;
          if (c) {
            c = c.replace(/<a[^<>]* rel="\d+"[^<>]*>/img, function(a) {
              return a.replace('href="javascript:void(0);"', 'href="javascript:void(0);" onclick="ksOnlineChat.addLocalAnswer(this);return false;"')
            });
            c = c.replace(/人工客服|人工服务/igm, '<a class="chatOnline" onclick="ksOnlineChat.gotoOnline()">人工客服</a>')
          }
        }
      }
    }
    if (!c || c.length == 0) {
      c = g.answerContent || KS.rbCfg.noAnswer || kslang.oc_js_robotNoAnswer
    }
    var h = [];
    h.push('<div class="msg_cs vcaPage">');
    h.push('<div class="title"><span style="color:' + (KS.is2015 && !KS.chatMsgStyle ? '#9a9a9a' : KS.ocCfg.fontcolor.customername) + '">' + KS.rbCfg.robotName + ' ' + b + '</span></div>');
    if (typeof c == 'string') {
      h.push('<div class="msg">', KS.isDir && (!KS.is2015 || (KS.is2015 && !KS.chatMsgStyle)) ? '<div class="before"></div>' : '', '<span style="color:' + (KS.is2015 && !KS.chatMsgStyle ? '#161515' : KS.ocCfg.fontcolor.customermsg) + '">');
      h.push(c);
      h.push('</span>')
    } else {
      h.push('<div class="answer">', KS.isDir && (!KS.is2015 || (KS.is2015 && !KS.chatMsgStyle)) ? '<div class="before"></div>' : '');
      h.push(kslang.oc_js_robotAnswerTitle);
      h.push('<ul>');
      for (var i = 0, t = new Date().getTime(); i < c.length; i++) {
        var d = c[i],
          n = t + '' + i;
        h.push('<li><DIV class="ansTitle"><A onclick="ksOnlineChat.addLocalAnswer(this,', d.id || 0, ',\'answerC' + n + '\');return false" href="javascript:void(0);">' + (d.title || d.question) + '</A></DIV>');
        if (d.answerContent) h.push('<DIV class="answerC" id="answerC' + n + '" style="DISPLAY: none">' + d.answerContent + '</DIV>');
        h.push('</li>')
      }
      h.push('</ul>')
    }
    if (g.relateList) {
      e = ksOnlineChat.createRelateList(g.relateList)
    }
    if (g.answerId > 0) {
      var j = g.qid;
      f = ksOnlineChat.createHasHelp(g.answerId, j)
    }
    if (e) {
      h.push(e)
    }
    if (f) {
      h.push(f)
    }
    h.push('</div><div style="clear:both"></div></div>');
    this.insertMsg(h.join(''));
    this.waitVtAnser(true);
    ksOnlineChat.playSysSound()
  },
  insertWarnMsg: function(a) {
    var b = [];
    b.push('<div class="msg_cs">');
    b.push('<div class="title">');
    b.push('  <span style="color:#ff0000;background:url(' + KS.__basePath + 'images/chat/comm/info.gif) left center no-repeat;padding: 3px 0px 0px 16px;">', kslang.oc_js_sysAlert, '</span>');
    b.push('</div>');
    b.push('<div class="msg"><span style="color:#000">');
    b.push(a);
    b.push('</span></div>');
    b.push('<div style="clear:both"></div></div>');
    this.insertMsg(b.join(''))
  },
  addLocalAnswer: function(o, b, a) {
    if (o) {
      if (!KS.useVCAPage && ksOnlineChat.chatStatus >= 2) {
        alert(ksComm.getLang('oc_editor_sendmsg0'));
        return
      }
      var c = o.innerHTML.replace(/<[^<>]*>/ig, '');
      if (!c) return;
      if (!b) {
        var d = o.getAttribute('rel');
        ksOnlineChat.queryVcaAnswer(c, d);
        return
      }
      var e = ksOnlineChat.insertVtDialogMsg(new Date().format(), o.innerHTML.replace(/<[^<>]*>/ig, ''));
      var n = ksComm.$(a),
        cn = null;
      if (n) {
        cn = n.innerHTML;
        ksOnlineChat.insertRobotMsg(new Date().format(), cn);
        ksOnlineChat.insertHasHelp(b, e)
      }
      var f = {
        qst: o.innerHTML,
        si: KS.__si,
        ci: KS.__ci,
        lng: KS.__lng,
        ri: KS.__ri,
        on: KS.rbCfg.robotName,
        aid: b,
        name: KS.__name,
        ct: 1
      };
      if (cn != null) f.asw = 1;
      if (KS.__cwId) f.cwId = KS.__cwId;
      if (KS.isUseVCA) {
        f.ur = 1
      }
      var g = KS.useVCAPage && !KS.useNewVCAPage ? (KS.__basePath + 'vca/getAnswer.htm') : (KS.__basePath + 'loadAnswer.htm');
      ksComm.get(g, f, function(a) {
        if (cn == null) {
          ksOnlineChat.insertRobotMsg(new Date().format(), data);
          ksOnlineChat.insertHasHelp(b, e)
        }
      })
    }
  },
  insertHasHelp: function(a, b) {
    var c = [];
    c.push('<div class="', KS.isDir ? 'other_msg' : 'msg_cus', '"><div class="msg" style="color:#504e4e;">以上内容对您有帮助吗？');
    c.push('<span onclick="ksOnlineChat.sendResolve(this,', a, ',1,\'', b || '', '\');" style="cursor: pointer;margin-left:5px;color:blue;"><img src="' + KS.__basePath + 'images/chat/comm/up.gif" onload="ksComm.fixPNG(this)" style="vertical-align: middle;margin-left:5px;"/> 有</span>');
    c.push('<span onclick="ksOnlineChat.sendResolve(this,', a, ',0,\'', b || '', '\');" style="cursor: pointer;margin-left:5px;color:blue;"><img src="' + KS.__basePath + 'images/chat/comm/down.gif" onload="ksComm.fixPNG(this)" style="vertical-align: middle;margin-left:5px;"/> 没有</span></div></div>');
    this.insertMsg(c.join(''))
  },
  sendResolve: function(o, b, v, c) {
    var p = o.parentNode;
    var r = o.innerHTML.replace(/有|没有/g, '');
    p.innerHTML = '<img src="' + KS.__basePath + 'images/chat/comm/sending.gif" style="margin-left:10px;"/>　';
    setTimeout(function() {
      if (KS.isUseVCA) {
        p.innerHTML = '<img src="' + KS.__basePath + 'images/vca/vca7.png" style="margin:0px 3px 3px 0px;"/>谢谢您的评价！'
      } else {
        p.innerHTML = '谢谢您的反馈' + r
      }
      if (!KS.is2015) {
        p.scrollIntoView()
      }
    }, 1200);
    if (KS.isUseVCA) {
      var d = {
        si: KS.__si,
        compId: KS.__ci,
        lng: KS.__lng,
        recId: KS.__ri,
        on: KS.rbCfg.robotName,
        clientId: KS.__ri + 'chat'
      };
      d.helpful = v ? 'addufc' : 'addulc';
      d.aId = b;
      if (c) {
        var q = ksComm.$(c);
        if (q) {
          d.question = q.innerHTML
        }
      }
      ksComm.get(KS.__basePath + 'vca/isAnswerHelpful.htm', d, function(a) {})
    } else {
      var d = {
        si: KS.__si,
        ci: KS.__ci,
        lng: KS.__lng,
        ri: KS.__ri,
        on: KS.rbCfg.robotName,
        aid: b,
        v: v
      };
      ksComm.get(KS.__basePath + 'resolve.htm', d, function(a) {})
    }
  },
  sendFileCheck: function(a) {
    if (KS.onlineFileNum) {
      kslang.oc_js_fileSendFail = kslang.oc_js_fileSendFail.replace('1MB', KS.onlineFileNum + 'MB')
    }
    if (ksOnlineChat.chatStatus >= 2) {
      alert(ksComm.getLang('oc_editor_alertfile0'));
      return false
    }
    var b = a ? ksComm.$('ksSendImg') : ksComm.$('ksSendFile');
    var f = b.value;
    if (!f) {
      alert(ksComm.getLang('oc_editor_alertfile1'));
      return false
    }
    if (a && !(/(?:jpg|gif|png|jpeg)$/i.test(f))) {
      alert(kslang.oc_js_fileSendFail);
      return false
    }
    try {
      var c = /msie/i.test(navigator.userAgent) && !window.opera;
      var d = 0;
      if (c && !b.files) {
        var g = b.value;
        var h = new ActiveXObject("Scripting.FileSystemObject");
        var i = h.GetFile(g);
        d = i.Size
      } else {
        d = b.files[0].size
      }
      var j = d / 1024;
      var k = 1024;
      if (KS.onlineFileNum && KS.onlineFileNum > 0) {
        k = 1024 * KS.onlineFileNum
      }
      if (j > k) {
        alert(kslang.oc_js_fileSendFail);
        return false
      }
    } catch (e) {
      if (KS.__isDebug || KS.__isInTest) {
        ksOnlineChat.insertSysDialogMsg('本地获取文件大小错误' + e)
      }
    }
    var l = a ? ksComm.$('ks_sendImg_btn') : ksComm.$('ks_sendfile_btn');
    if (l) l.disabled = true;
    return true
  },
  sendFileCallback: function(a) {
    if (KS.onlineFileNum) {
      kslang.oc_js_fileSendFail = kslang.oc_js_fileSendFail.replace('1MB', KS.onlineFileNum + 'MB')
    }
    var b, msg;
    var c = a && a.isImg;
    var d = !a.noclk;
    var e = a.sendTime;
    if (a == false || a.success == false) {
      b = kslang.oc_js_fileSendFail;
      msg = kslang.oc_js_fileSendFail;
      if (d) {
        var f = ksComm.$('ks_sendImg_btn');
        if (f) f.disabled = false;
        var g = ksComm.$('ks_sendfile_btn');
        if (g) g.disabled = false
      }
      ksOnlineChat.insertSysDialogMsg(msg)
    } else {
      b = kslang.oc_js_fileSendSucc;
      if (a.msg && a.success == true) {
        msg = a.msg
      } else {
        msg = kslang.oc_js_fileSendSucc
      }
      if (d) {
        var h = ksComm.$(c ? 'ksSendImgLoading' : 'ksSendFileLoading');
        var i = ksComm.$(c ? 'ksSendImgArea' : 'ksSendFileArea');
        var j = ksComm.$(c ? 'ksSendImg' : 'ksSendFile');
        var f = ksComm.$(c ? 'ks_sendImg_btn' : 'ks_sendfile_btn');
        if (f) f.disabled = false;
        h.style.display = 'block';
        i.style.display = 'none';
        h.innerHTML = b;
        setTimeout(function() {
          h.style.display = 'none';
          i.style.display = 'block';
          j.value = '';
          j.outerHTML = j.outerHTML;
          if (h.parentNode.parentNode.style.display != 'none') {
            ksEditor.clickByLinkDiv(c ? 'sendimg_link' : 'sendfile_link')
          }
        }, 2000)
      }
      if (c) {
        if (!KS.isDir) {
          ksOnlineChat.insertSysDialogMsg(msg, e, c)
        } else {
          ksOnlineChat.insertVtDialogMsg(e, msg)
        }
      } else {
        if (!KS.isDir) {
          ksOnlineChat.insertSysDialogMsg(msg)
        } else {
          ksOnlineChat.insertVtDialogMsg(e, msg)
        }
      }
    }
  },
  browserShake: function() {
    if (KS.isDir) return;
    try {
      var a = {
        x: 0,
        y: 0
      };
      var t = 0,
        z = 10,
        del = function() {
          clearInterval(ksOnlineChat.browserShake.ID);
          window.moveBy(-a.x, -a.y);
          return ksOnlineChat.browserShake
        };
      del().ID = setInterval(function() {
        var i = t / 180 * Math.PI,
          x = Math.floor(Math.sin(i) * z),
          y = Math.floor(Math.cos(i) * z);
        window.moveBy(x, y);
        a.x = a.x + x;
        a.y = a.y + y;
        if ((t += 90) >= 1080) {
          del()
        }
      }, 30)
    } catch (e) {
      ksComm.alertDebugMsg(e)
    }
  },
  sendBytePic: function(a, b, c) {
    ksComm.ajax({
      type: 'POST',
      url: KS.__filePath,
      isupload: true,
      data: {
        img: a,
        ri: KS.__ri,
        si: KS.__si,
        ci: KS.__ci,
        sn: KS.__name,
        lng: KS.__lng,
        isImg: 1,
        noclk: true
      },
      success: b,
      error: c
    })
  },
  pastePic: function() {
    if (!KS.ocCfg.btnVisible.cutpic) {
      return
    }
    ksComm.addEvent(onlineChatIns.getInstance(), 'paste', function(e) {
      if (!KS.ocCfg.btnVisible.cutpic) {
        return
      }
      if (e.clipboardData && e.clipboardData.items[0].type.indexOf('image') > -1) {
        var a = this,
          file = e.clipboardData.items[0].getAsFile();
        var b = new FileReader();
        b.onload = function(e) {
          document.execCommand('insertImage', false, this.result)
        };
        b.readAsDataURL(file)
      }
    })
  },
  dragFile: function(f, g) {
    if (!KS.ocCfg.btnVisible.sendimg && !KS.ocCfg.btnVisible.sendfile) {
      return
    }
    var h = this;
    var i = false;
    ksComm.addEvent(onlineChatIns.getInstance(), 'drop', function(e) {
      if (!KS.ocCfg.btnVisible.sendimg && !KS.ocCfg.btnVisible.sendfile) {
        return
      }
      if (i) {
        alert(kslang.oc_editor_alertdrag0);
        return
      }
      if (e.dataTransfer) {
        e.preventDefault();
        if (ksOnlineChat.chatStatus >= 2) {
          alert(ksComm.getLang('oc_editor_alertfile0'));
          return false
        }
        var b = e.dataTransfer.files;
        var c = b.length;
        if (c == 0 || !b[0]) {
          return false
        } else if (c > 1) {
          alert(kslang.oc_editor_alertdrag1);
          return false
        }
        var d = b[0].type;
        if (!(d.match(/(image|msword|kswps|excel|office|text\/plain)/ig) && (d.match(/(image)/ig) && KS.ocCfg.btnVisible.sendimg || d.match(/(msword|kswps|excel|office|text\/plain)/ig) && KS.ocCfg.btnVisible.sendfile))) {
          alert(kslang.oc_editor_alertdrag2);
          return false
        }
        i = true;
        h.sendBytePic(b[0], function(a) {
          i = false;
          eval(a.substring(a.indexOf('<script>') + '<script>'.length, a.lastIndexOf('</script>')))
        }, function() {
          i = false;
          alert(kslang.oc_editor_alertdrag3)
        })
      }
    })
  },
  goNewChatWin: function(a) {
    var b = KS.__basePath + 'im.htm?cas=' + KS.__cas + '&fi=' + KS.__fi + '&ri=' + KS.__ri + '&' + ksComm.params(a || {});
    try {
      window.onbeforeunload = null;
      this.ifEndAlert = false;
      window.location.href = b
    } catch (e) {}
  },
  translate: function(b, c, d) {
    var e = onlineChatIns.getContentText();
    if (e != '') {
      if (d) d.disabled = true;
      ksComm.get(KS.__basePath + 'chat/translate.htm', {
        sLang: b,
        tLang: c,
        content: e
      }, function(a) {
        if (d) d.disabled = false;
        if (a.success && a.result != '') {
          onlineChatIns.setContent(a.result)
        }
      }, 'post')
    }
  },
  openMapWin: function() {
    var a = {};
    a['ci'] = KS.__ci;
    a['nid'] = KS.__nid;
    a['entName'] = encodeURIComponent(KS.__entName);
    var b = window.open(KS.__basePath + 'chat/map.htm?' + ksComm.params(a), ksComm.browser.msie ? '' : 'ksMapWin', '');
    if (b) b.focus()
  },
  openOtherWin: function(a, b, c) {
    if (!KS.__ri) {
      alert(kslang.comm_notrecid);
      return
    }
    var d = {};
    d['cas'] = KS.__cas;
    d['fi'] = KS.__fi;
    d['ri'] = KS.__ri;
    d['gr'] = KS.__gr;
    d['grs'] = KS.__grs;
    d['gn'] = KS.__gn;
    d['ln'] = KS.__ln;
    ksComm.goNewPage(KS.__basePath + a + '?' + ksComm.params(d), b, c)
  },
  changeSysSoundState: function() {
    KS.cwAdvSound = !KS.cwAdvSound
  },
  playSysSound: function() {
    try {
      var a = document.getElementById('SysSoundPlayer');
      if (!KS.cwAdvSound || !a) return;
      if (ksComm.browser.msie) {
        a.controls.play()
      } else {
        a.play()
      }
    } catch (e) {
      ksComm.alertDebugMsg(e)
    }
  },
  queryVcaAnswer: function(q, b, c) {
    param = c || {};
    param['msg'] = q;
    param['name'] = KS.__name;
    param['si'] = KS.__si;
    param['ci'] = KS.__ci;
    param['ri'] = KS.__ri;
    param['sid'] = KS.__sid;
    param['cwId'] = KS.__cwId || '';
    param['rbName'] = KS.rbCfg.robotName;
    param['lang'] = KS.__lng;
    param['clientId'] = KS.__ri + 'chat';
    if (q) {
      param.question = q;
      var d = ksOnlineChat.insertVtDialogMsg(new Date().format(), q);
      param.qid = d
    }
    if (b) {
      param.fid = b
    }
    var e = KS.useVCAPage && !KS.useNewVCAPage ? KS.__basePath + 'vca/getAnswer.htm' : (KS.__basePath + 'msgToRb.htm');
    ksComm.get(e, param, function(a) {
      if (a && a.code) {
        if (a.code == 8) {
          a.success = true;
          a.data = a.bean
        } else {
          a = null
        }
      }
      if (a) {
        if (a.data) {
          a.data.qid = param.qid
        }
      } else {
        a = {
          answerType: -2,
          answerContent: ''
        }
      }
      ksOnlineChat.sendRobotMsgCallback(a)
    }, 'post')
  },
  closeDailog: function() {
    if (ksOnlineChat.chatStatus < 2) {
      if (ksOnlineChat.chatStatus == 1 && !KS.__isMobile && ksOnlineChat.isTreated && ksOnlineChat.hasEvaluated == false && KS.ocCfg.valuation.exitPrompt == true) {
        ksOnlineChat.openServiceEvaluateWin(null, true);
        ksComm.$('oc_se_topic1TR').style.display = 'block';
        ksComm.$('oc_se_topic2TR').style.display = 'none'
      } else {
        var a = ksComm.$("oc_endChat_win");
        a.style.marginTop = -75 + document.documentElement.scrollTop + "px";
        ksComm.$("oc_endChat_win_cancle").onclick = function() {
          ksComm.hideMask();
          a.style.display = "none"
        };
        ksComm.showMask();
        a.style.display = "block";
        ksComm.$("oc_endChat_submit").onclick = function() {
          ksComm.hideMask();
          a.style.display = "none";
          ksOnlineChat.setChatTitle(kslang.oc_js_dialogAlreadyEnd);
          ksOnlineChat.unloadWindowEvent()
        };
        ksComm.$("oc_endChat_cancle").onclick = function() {
          ksComm.hideMask();
          a.style.display = "none"
        }
      }
    }
  },
  gotoOnline: function() {
    if (KS.useVCAPage || ksOnlineChat.isvca) {
      KS.useVCAPage = false;
      KS.loadInitVi = false;
      KS.tran2Online = true;
      KS.hasChecked = false;
      KS.hasCollect = false;
      ksOnlineChat.hasEvaluated = false;
      ksOnlineChat.chatStatus = 4;
      ksOnlineChat.setChatTitle('正在为您转人工客服，请稍后...');
      KS.cv = '';
      KS.initVi()
    } else {}
  },
  showKsMsg: function(a) {
    var b = ksComm.$('ksmsgDiv');
    if (b) {
      if (a) {
        ksComm.showMask();
        b.innerHTML = a;
        b.style.display = '';
        b.style.marginLeft = -b.clientWidth / 2 + 'px';
        b.style.marginTop = -b.clientHeight + 'px'
      } else {
        ksComm.hideMask();
        b.style.display = 'none'
      }
    }
  },
  getBaseParam: function() {
    return {
      si: KS.__si,
      compId: KS.__ci,
      lng: KS.__lng,
      recId: KS.__ri,
      on: KS.rbCfg.robotName,
      clientId: KS.__ri + 'robot'
    }
  },
  createRelateList: function(a) {
    var b = [];
    if (a && a.length) {
      b.push('<div class="relatelist">');
      b.push('  <span style="font-weight:bold;">');
      b.push(kslang.oc_js_robotAnswerTitle);
      b.push('  </span>');
      b.push('<ul>');
      for (var i = 0, t = new Date().getTime(); i < a.length; i++) {
        var d = a[i],
          n = t + '' + i;
        var c = 'q' + new Date().getTime() + i + '_' + Math.round(Math.random() * 1000);
        b.push('<li><DIV class="ansTitle"><A id="', c, '" onclick="ksOnlineChat.addLocalAnswer(this);return false" href="javascript:void(0);">' + ksOnlineChat.removeHTMLTag(d.question) + '</A></DIV>');
        if (d.answerContent) b.push('<DIV class="answerC" id="answerC' + n + '" style="DISPLAY: none">' + d.answerContent + '</DIV>');
        b.push('</li>')
      }
      b.push('</ul>');
      b.push('</div>')
    }
    return b.join('')
  },
  createHasHelp: function(a, b) {
    var c = [];
    if (a) {
      if (!b) {
        b = ''
      }
      c.push('<div class="msg_hashelp"><div style="color:#504e4e;font-size:12px;">');
      c.push('<span onclick="ksOnlineChat.sendResolve(this,', a, ',1,\'', b, '\');" style="cursor: pointer;margin-left:5px;"><img src="' + KS.__basePath + 'images/vca/up.png" onload="ksComm.fixPNG(this)" style="margin:0px 4px 2px 5px;vertical-align: middle;"/>满意</span>');
      c.push('<span onclick="ksOnlineChat.sendResolve(this,', a, ',0,\'', b, '\');" style="cursor: pointer;margin-left:5px;"><img src="' + KS.__basePath + 'images/vca/down.png" onload="ksComm.fixPNG(this)" style="margin:0px 4px 2px 5px;vertical-align: middle;"/>不满意</span></div></div>')
    }
    return c.join('')
  },
  removeHTMLTag: function(a) {
    try {
      a = a.replace(/<script[\s\S]*?<\\?\/script>/igm, '');
      a = a.replace(/<\/?[^>]*>/g, function(s) {
        if (s == null) {
          return ''
        } else {
          return ''
        }
      });
      a = a.replace(/[ | ]*\n/g, '\n');
      a = a.replace(/&nbsp;/ig, '')
    } catch (e) {};
    return a
  },
  getIPInfoByTencent: function(a) {
    new ksComm.JSONRequest('//apis.map.qq.com/ws/location/v1/ip', {
      key: a,
      output: "jsonp",
      callback: "ksOnlineChat.parseIPInfoByTencent"
    }, null, null, function() {
      ksOnlineChat.checkIPInfo()
    })
  },
  parseIPInfoByTencent: function(a) {
    if (a.status === 0) {
      var b = a.result.ad_info.province + a.result.ad_info.city;
      b = encodeURI(b);
      new ksComm.JSONRequest(KS.__basePath + 'ip.j', {
        ci: KS.__ci,
        si: KS.__si,
        ri: KS.__ri,
        tx: true,
        ipinfo: b
      })
    } else {
      ksOnlineChat.checkIPInfo()
    }
  },
  checkIPInfo: function() {
    new ksComm.JSONRequest('https://pv.kuaishang.cn/gip.j', {}, null, function() {
      setTimeout(function() {
        var a = window['returnCitySN'];
        if (a && a.cip) {
          new ksComm.JSONRequest(KS.__basePath + 'ip.j', {
            ci: KS.__ci,
            si: KS.__si,
            ri: KS.__ri,
            cip: a.cip,
            cname: a.cname
          })
        }
      }, 200)
    })
  }
};
KS.ocCfg = {
  btnVisible: {
    emotions: KS.emotions,
    sendimg: KS.sendimg != undefined ? KS.sendimg : KS.sendfile,
    sendfile: KS.sendfile,
    cutpic: KS.cutpic,
    saverecord: KS.saverecord,
    print: KS.print,
    serviceassess: KS.serviceassess,
    fontpanel: KS.fontset,
    clearwindow: KS.cls,
    quickask: KS.fastask,
    map: KS.map,
    translate: KS.translate,
    onlineConsult: KS.onlineConsult,
    freeCall: KS.freeCall,
    leaveMsg: KS.leaveMsg,
    shortMsg: KS.shortMsg,
    robotMsg: KS.robotMsg
  },
  fontcolor: {
    customername: KS.customerName,
    customermsg: KS.customerMsg,
    visitorname: KS.cwfcVisitorName,
    visitormsg: KS.visitorMsg,
    othermsg: KS.other
  },
  title: KS.title,
  valuation: {
    exitPrompt: KS.exitPrompt,
    autoPrompt: KS.autoPrompt,
    smsNum: KS.smsNum
  },
  favourite: {
    addFavourite: KS.addFavourite,
    favouriteWindow: KS.favouriteWindow,
    customeUrl: KS.customeUrl,
    customTitle: KS.afCustomTitle
  },
  visitorInfo: {
    classStyle: 'OTHER'
  },
  autoResponse: {
    r1EnableTimeInterval: KS.r1EnableTimeInterval,
    r1TimeInterval: KS.r1TimeInterval,
    r1AutoContent: KS.r1AutoContent,
    r2EnableTimeInterval: KS.r2EnableTimeInterval,
    r2TimeInterval: KS.r2TimeInterval,
    r2AutoContent: KS.r2AutoContent,
    r3EnableTimeInterval: KS.r3EnableTimeInterval,
    r3TimeInterval: KS.r3TimeInterval * 60 + KS.r3TimeIntervalSecond,
    r3AutoContent: KS.r3AutoContent,
    r4EnableTimeInterval: KS.r4EnableTimeInterval,
    r4TimeInterval: KS.r4TimeInterval * 60 + KS.r4TimeIntervalSecond,
    r4AutoContent: KS.r4AutoContent,
    r4EnableClose: KS.r4EnableClose,
    r4CloseTimeInterval: KS.r4CloseTimeInterval * 60,
    r5EnableTimeInterval: KS.r5EnableTimeInterval,
    r5TimeInterval: KS.r5TimeInterval,
    r5AutoContent: KS.r5AutoContent,
    dialogEndEnable: KS.dialogEndEnable,
    dialogEndContent: KS.dialogEndContent
  },
  exchangePrompt: {
    swidthWinType: KS.switchWinType
  }
};
KS.fpCfg = {
  fpDefinedEnabled: KS.fpcEnabled,
  fpDefinedUrl: KS.fpcUrl,
  fpcConnType: KS.fpcConnType
};
KS.lmCfg = {
  lmDefinedEnabled: KS.enabled,
  lmDefinedUrl: KS.leaveWordurl
};
KS.rbCfg = {
  enabled: KS.robotEnabled,
  bsEnabled: KS.robotBsEnabled,
  robotName: KS.robotName,
  repeatSend: KS.repeatSend,
  enterRobot: KS.enterRobot.replace(/{r}/, KS.robotName),
  keywords: KS.keywords,
  responseText: KS.responseText,
  noReceive: KS.noReceive.replace(/{r}/, KS.robotName),
  noReceiveTimeout: KS.noReceiveTimeout,
  noResponse: KS.noResponse.replace(/{r}/, KS.robotName),
  noResponseTimeout: KS.noResponseTimeout
};
KS['quickAskInnerHtml'] = [];
KS.quickAskInnerHtml.push('<ul>');
var fs = KS.mcVisitorFastAskForms;
for (var i = 0; i < fs.length; i++) {
  var item = fs[i];
  KS.quickAskInnerHtml.push('<li><a href="javascript:void(0);" onClick="ksComm.insertHtml(\'beforeend\',ksComm.$(\'ksEditInstance\'),\'', item.askContent, '\');return false;">', item.askContent, '</a></li>')
}
KS.quickAskInnerHtml.push('</ul>');
var ksEditor, onlineChatIns;
var crksEditor = function() {
    ksEditor = new nicEditor({
      newlineTag: 'br',
      sendMsgType: 0,
      maxHeight: 22
    });
    ksEditor.setPanel('ksEditPanel');
    ksEditor.addInstance('ksEditInstance');
    onlineChatIns = ksEditor.nicInstances[0]
  };
ksComm.docReady(function() {
  if (!KS.__isMobile && !KS.isDir) {
    var b = ksComm.$('chatTopArea');
    var c = ksComm.$('ksEditInstance');
    ksComm.resizeWin(b, 276, 206);
    var d = 97;
    try {
      c.style.width = (b.offsetWidth - d) + 'px'
    } catch (e) {}
    ksComm.addEvent(window.window, 'resize', function() {
      if (ksComm.$('adArea').style.display == 'none') {
        ksComm.resizeWin(b, 276, 46)
      } else {
        ksComm.resizeWin(b, 276, 206)
      }
      try {
        c.style.width = (b.offsetWidth - d) + 'px'
      } catch (e) {}
    })
  }
  try {
    crksEditor()
  } catch (e) {}
  if (!KS.checkFlash()) {
    KS.hasInstallFlash = false
  } else {
    KS.hasInstallFlash = true;
    KS.loadFlash()
  }
  if (!KS.isDir && !KS.useVCAPage) {
    var f = ksComm.$('splitBtn');
    if (f) {
      ksComm.addEvent(f, 'click', function(a) {
        ksComm.switchSplitBar(function() {
          ksComm.resizeWin(ksComm.$('chatTopArea'), 276, 206)
        }, function() {
          ksComm.resizeWin(ksComm.$('chatTopArea'), 276, 46)
        })
      });
      ksComm.addEvent(f, 'mouseover', function(a) {
        f.className = 'splitBtnOver'
      });
      ksComm.addEvent(f, 'mouseout', function(a) {
        f.className = 'splitBtn'
      })
    }
    if (ksComm.$('oc_icon_freeCall') && KS.ocCfg.btnVisible.freeCall == true && KS.fpCfg.fpDefinedEnabled == true) {
      ksComm.addEvent(ksComm.$('oc_icon_freeCall'), 'click', function(a) {
        ksOnlineChat.openOtherWin('getFcp.htm', !KS.switchWinType || KS.isDir)
      })
    }
    if (ksComm.$('oc_icon_leaveMsg')) {
      if (KS.ocCfg.btnVisible.leaveMsg == true && KS.lmCfg.lmDefinedEnabled == true) {
        ksComm.addEvent(ksComm.$('oc_icon_leaveMsg'), 'click', function(a) {
          window.open(KS.lmCfg.lmDefinedUrl, ksComm.browser.msie ? '' : 'leaveMsg', '')
        })
      } else if (KS.ocCfg.btnVisible.leaveMsg == true) {
        ksComm.addEvent(ksComm.$('oc_icon_leaveMsg'), 'click', function(a) {
          ksOnlineChat.openOtherWin('leavemsg.htm', !KS.switchWinType || KS.isDir)
        })
      }
    }
    if (ksComm.$('oc_icon_robotMsg') && KS.ocCfg.btnVisible.robotMsg == true && KS.rbCfg.bsEnabled == true) {
      ksComm.addEvent(ksComm.$('oc_icon_robotMsg'), 'click', function(a) {
        ksOnlineChat.openOtherWin('robot.htm', !KS.switchWinType || KS.isDir)
      })
    }
    document.title = KS.ocCfg.title;
    if (ksComm.$('rightAd1')) {
      if (KS.rightAd1Type == 0) {
        var g = [];
        if (!KS.__entName && !KS.entAddr) {
          if (KS.rightAd1Custom) {
            g.push(KS.rightAd1Custom)
          }
        } else {
          g.push("<div class='title'><div><ks:ln k='oc_robot_entCard'>", kslang.oc_robot_entCard, "</ks:ln></div></div>");
          g.push("<ul class='content'>");
          if (KS.__entName) {
            g.push("<li><ks:ln k='oc_robot_entName'>", kslang.oc_robot_entName, "</ks:ln>：", KS.__entName, "</li>")
          }
          if (KS.entPhone) {
            g.push("<li><ks:ln k='oc_robot_entPhone'>", kslang.oc_robot_entPhone, "</ks:ln>：", KS.entPhone, "</li>")
          }
          if (KS.entFax) {
            g.push("<li><ks:ln k='oc_robot_entFax'>", kslang.oc_robot_entFax, "</ks:ln>：", KS.entFax, "</li>")
          }
          if (KS.entQq) {
            g.push("<li>QQ：", KS.entQq, "</li>")
          }
          if (KS.entMsn) {
            g.push("<li>MSN：", KS.entMsn, "</li>")
          }
          if (KS.entAddr) {
            g.push("<li><ks:ln k='oc_robot_entAddr'>", kslang.oc_robot_entAddr, "</ks:ln>：", KS.entAddr, "</li>")
          }
          g.push("</ul>")
        }
        ksComm.$('rightAd1').innerHTML = g.join("")
      } else {
        if (KS.rightAd1Url.indexOf('swf') != -1) {
          ksComm.embedSWF(KS.rightAd1Url, 'rightAd1', '150', '290')
        } else {
          ksComm.$('rightAd1').innerHTML = "<a " + (KS.rightAd1Link ? "href='" + KS.rightAd1Link + "'" : '') + " target='_blank'><img width='150' src='" + KS.rightAd1Url + "' border='0' onload=\"if(this.height>290)this.height=290;\"/></a>"
        }
      }
    }
    if (ksComm.$('rightAd2')) {
      if (KS.rightAd2Url.indexOf('swf') != -1) {
        ksComm.embedSWF(KS.rightAd2Url, 'rightAd2', '150', '135')
      } else {
        ksComm.$('rightAd2').innerHTML = "<a " + (KS.rightAd2Link ? "href='" + KS.rightAd2Link + "'" : '') + " target='_blank'><img width='150' src='" + KS.rightAd2Url + "' border='0' onload=\"if(this.height>135)this.height=135;\"/></a>"
      }
    }
    ksComm.addEvent(window, 'load', function() {
      ksComm.resizeWin(ksComm.$('chatTopArea'), 276, 206)
    })
  }
  if (!KS.useVCAPage && KS.is2015 && KS.chatStyle) {
    document.title = KS.ocCfg.title;
    var h = false;
    var i = false;
    if (!KS.chatWinStyle || KS.chatWinStyle === 0) {
      i = true
    } else if (KS.chatWinStyle == 1) {
      h = true;
      i = true
    } else if (KS.chatWinStyle == 2) {
      h = true
    }
    var j = ksComm.$('centerMsg');
    if (h) {
      var k = document.createElement('DIV');
      k.id = 'leftAdDiv';
      k.style.cssText = 'position:absolute;width:170px;height:100%;left:0px;top:0px;background-color:#FFF;overflow: hidden;';
      document.body.appendChild(k);
      var l = document.createElement('DIV');
      l.style.cssText = 'margin-top:54px;height:100%';
      k.appendChild(l);
      k = l;
      j.style.marginLeft = '170px';
      if (KS.leftAd1Type == 0) {
        var g = [];
        if (KS.leftAd1Custom) {
          g.push(KS.leftAd1Custom)
        }
        k.innerHTML = g.join('')
      } else if (KS.leftAd1Url) {
        if (KS.leftAd1Url.indexOf('swf') != -1) {
          ksComm.embedSWF(KS.leftAd1Url, k, '170', '100%')
        } else {
          k.innerHTML = "<a " + (KS.leftAd1Link ? "href='" + KS.leftAd1Link + "'" : '') + " target='_blank'><img width='170'" + (KS.leftAd1Url ? '' : ' height=\'100%\'') + " src='" + KS.leftAd1Url + "' border='0'/></a>"
        }
      }
    }
    if (i) {
      var m = document.createElement('DIV');
      m.id = 'rightAdDiv';
      m.style.cssText = 'position:absolute;width:170px;height:100%; right:0px;top:0px; background-color:#FFF;overflow: hidden;';
      document.body.appendChild(m);
      var l = document.createElement('DIV');
      l.style.cssText = 'margin-top:54px;height:100%';
      m.appendChild(l);
      m = l;
      j.style.marginRight = '170px';
      if (KS.rightAd1Type == 0) {
        var g = [];
        if (KS.rightAd1Custom) {
          g.push(KS.rightAd1Custom)
        }
        m.innerHTML = g.join('')
      } else if (KS.rightAd1Url) {
        if (KS.rightAd1Url.indexOf('swf') != -1) {
          ksComm.embedSWF(KS.rightAd1Url, m, '170', '')
        } else {
          m.innerHTML = "<a " + (KS.rightAd1Link ? "href='" + KS.rightAd1Link + "'" : '') + " target='_blank'><img width='170'" + (KS.rightAd1Url ? '' : ' height=\'100%\'') + " src='" + KS.rightAd1Url + "' border='0'/></a>"
        }
      }
      if (KS.logoUrl) {
        var n = document.createElement('DIV');
        m.appendChild(n);
        var o = document.createElement('DIV');
        o.id = 'rightLogo';
        o.style.cssText = 'position:absolute; bottom:0px;height:130px; background-color:#FFF; width:100%;';
        m.appendChild(o);
        if (KS.logoUrl.indexOf('swf') != -1) {
          ksComm.embedSWF(KS.logoUrl, o, '170', '130')
        } else {
          o.innerHTML = "<a " + (KS.logoLink ? "href='" + KS.logoLink + "'" : '') + " target='_blank'><img width='170' src='" + KS.logoUrl + "' border='0' onload=\"if(this.height>130)this.height=130;\"/></a>"
        }
      }
      ksComm.$('ocSendMsgDiv').style.cssText = 'right:-143px;z-index:9999999;top:-24px;border-right:1px solid #dadada'
    }
  }
  if (ksComm.$('dialog_close_btn')) {
    ksComm.addEvent(ksComm.$('dialog_close_btn'), 'click', ksOnlineChat.closeDailog)
  }
  if (ksComm.$('scrollAd')) {
    ksComm.startMarquee(ksComm.$('scrollAd'), 22, 20, KS.adScrollInterval * 1000, KS.adScrollDir == 0)
  }
  ksComm.addEvent(document.body, 'keydown', function(e) {
    ksComm.blockBack(e)
  });
  window.onbeforeunload = function() {
    return ksOnlineChat.beforeUnloadEvent()
  };
  ksComm.addEvent(window, 'unload', function() {
    ksOnlineChat.unloadWindowEvent()
  });
  ksOnlineChat.pastePic();
  ksOnlineChat.dragFile();
  var p = window.setInterval(function() {
    KS.loadSeconds++;
    if (KS.loadSeconds == 6) {
      window.clearInterval(p);
      p = null
    }
  }, 1000);
  KS.initVi()
});
var ksLoadEvent = function() {
    try {
      var w = KS.__w ? KS.__w : 900,
        h = KS.__h ? KS.__h : 620;
      if (!KS.__isMobile && ksComm.browser.chrome) {
        if (window.parent == window) {
          h = h + 60
        }
        window.resizeTo(w, h)
      } else if (!KS.__isMobile) {
        if (window.parent == window) {
          window.resizeTo(w, h);
          var a = document.body ? document.body.clientWidth : innerWidth;
          var b = document.body ? document.body.clientHeight : innerHeight;
          window.resizeTo(w + w - a, h + h - b)
        }
      }
    } catch (e) {}
  };
KS.initVi = function(b) {
  if (typeof checkShowBt == 'function') {
    checkShowBt()
  }
  if (KS.useVCAPage && !KS.useNewVCAPage) {
    ksOnlineChat.robotReceiving = 2;
    return
  } else if (KS.useVCAPage) {
    ksOnlineChat.robotReceiving = 2
  } else {
    ksOnlineChat.robotReceiving = 0
  }
  if (KS.loadSeconds >= 1 || !KS.hasInstallFlash || ksComm.browser.msie9 || (KS.flashLoaded == 1 && typeof KS.getSwfObj() != 'undefined' && (typeof KS.getSwfObj().loadData != 'undefined'))) {
    if (!KS.useVCAPage && KS.cwAdvAuthCode && !KS.hasChecked) {
      ksOnlineChat.openVerifyWin();
      return false
    }
    if (KS.cwAdvVicEnable && !KS.__fd && (!KS.isDir || (KS.isDir && KS.is2015)) && !KS.hasCollect) {
      ksOnlineChat.openVisitorInfoWin();
      return false
    }
    if (KS.loadInitVi) return;
    KS.loadInitVi = true;
    var c = {};
    if (KS.isNewVs) {
      var d = KS.getVisitorSignFromCookie();
      var f = KS.getVisitorValueFromCookie('KS_errVi');
      if (d != '' && d == f) {
        KS.setVisitorValueToCookie('KS_' + KS.__cas, KS.visitorSign);
        KS.isNewVs = true
      } else if (d != '') {
        if (d != KS.visitorSign) {
          KS.isNewVs = false
        }
        KS.visitorSign = d
      }
    }
    KS.noCkParams = false;
    if (KS.isNewVs) {
      if (!KS.iRepc) {
        c['totalVisitTime'] = 1;
        c['preVisitPages'] = 0;
        KS.setVisitorValueToCookie('KS_firstVisitTime', KS.__vt);
        KS.setVisitorValueToCookie('KS_visitCounts', 1);
        KS.setVisitorValueToCookie('KS_preVisitPages', 0);
        KS.setVisitorValueToCookie('KS_lastVisitTime', KS.__vt);
        if (KS.__cur != '') {
          c['curVisitorPages'] = 1;
          KS.setVisitorValueToCookie('KS_visitPages', 1)
        } else {
          c['curVisitorPages'] = 0;
          KS.setVisitorValueToCookie('KS_visitPages', 0)
        }
      } else {
        KS.noCkParams = true
      }
    } else {
      KS.noCkParams = (KS.iRepc && KS.getVisitorValueFromCookie('KS_visitCounts', -1) == -1 && KS.getVisitorValueFromCookie('KS_lastVisitTime', -1) == -1) ? true : false;
      if (!KS.noCkParams) {
        var g = Number(KS.getVisitorValueFromCookie('KS_visitPages', 0));
        if (KS.__cur != '') {
          g += 1;
          KS.setVisitorValueToCookie('KS_visitPages', g)
        }
        var h = Number(KS.getVisitorValueFromCookie('KS_lastVisitTime', 0));
        var i = Number(KS.getVisitorValueFromCookie('KS_visitCounts', 0));
        if (h && !isNaN(h)) {
          var j = Number(KS.__vt) - h;
          if (j > 43200000) {
            i += 1;
            KS.setVisitorValueToCookie('KS_visitCounts', i)
          }
          h = new Date(Number(h)).format()
        } else {
          h = ''
        }
        c['curVisitorPages'] = g;
        c['preVisitTime'] = h;
        c['totalVisitTime'] = i;
        c['preVisitPages'] = KS.getVisitorValueFromCookie('KS_preVisitPages', 0);
        c['pri'] = KS.getVisitorValueFromCookie('KS_preDiaRi', 0);
        c['pdt'] = KS.getVisitorValueFromCookie('KS_preDiaTime', 0);
        c['pc'] = KS.getVisitorValueFromCookie('KS_pc', 0);
        var k = Number(KS.getVisitorValueFromCookie('KS_firstVisitTime', 0));
        if (k && !isNaN(k)) {
          c['firstVisitTime'] = new Date(k).format()
        }
      }
    }
    if (KS.useVCAPage && KS.useNewVCAPage && !ksOnlineChat.isvca) {
      c['isvca'] = b ? 3 : 1
    } else if (ksOnlineChat.isvca) {
      c['isvca'] = 2
    }
    c['ncp'] = KS.noCkParams;
    if (KS.__vt && !isNaN(KS.__vt)) c['curEnterTime'] = new Date(Number(KS.__vt)).format();
    c['resolution'] = screen.width + '*' + screen.height;
    c['displayColor'] = window.screen.colorDepth;
    c['width'] = KS.__w;
    c['height'] = KS.__h;
    c['fd'] = KS.__fd;
    c['cdt'] = KS.__cdt;
    c['isNewVs'] = KS.isNewVs;
    c['visitorId'] = KS.visitorSign;
    if (KS.__cur) {
      c['curViewPage'] = KS.__cur
    }
    if (KS.__ref) {
      c['sourceLink'] = KS.__ref
    }
    if (KS.__dp && KS.__dp != '') {} else if (c['curViewPage'] && c['curViewPage'] != '') {
      KS.__dp = c['curViewPage']
    } else {
      var l = '';
      var w = window,
        t = 13;
      try {
        while (w != top && (--t)) {
          w = w.parent;
          try {
            if (w.document.referrer.length > 0) {
              l = w.document.referrer
            }
          } catch (e) {
            break
          }
        }
      } catch (e) {}
      if (!l) {
        l = document.referrer
      }
      KS.__dp = l
    }
    if (KS.__dp) {
      c['diaPage'] = KS.__dp
    }
    if (c['diaPage']) {
      if (!c['sourceLink']) {
        c['sourceLink'] = c['diaPage']
      }
    }
    c['clickSource'] = KS.__cs;
    if (KS._user) {
      for (var x in KS._user) {
        c[x] = KS._user[x]
      }
    }
    if (!KS.useVCAPage && !KS.__gn && !KS.__ln && !KS.__fd && KS.connWaitTime && KS.connWaitTime > 0) {
      ksOnlineChat.delayConnChat(c, KS.connWaitTime)
    } else {
      try {
        window.clueInit({
          client: KS.__ci,
          client_type: 'kst',
          callback: function(a) {
            c.bid = JSON.parse(a).bid;
            ksOnlineChat.connChat(c)
          }
        })
      } catch (e) {
        ksOnlineChat.connChat(c)
      }
    }
  } else {
    setTimeout('KS.initVi()', 50)
  }
};