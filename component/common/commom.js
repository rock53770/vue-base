(function(){

function openH5(extraUrl) {
    var APP_OPEN_URL = "yhouse://";
    var downloadUrl = "/" ;
    if (typeof extraUrl !== 'undefined') {
        APP_OPEN_URL += extraUrl;
        downloadUrl += extraUrl;
    }
    var now = new Date().valueOf();
    setTimeout(function () {
        if (new Date().valueOf() - now > 100) return;
        window.location = downloadUrl;
    }, 50);

    var frame = document.createElement('iframe');
    frame.src = APP_OPEN_URL;
    frame.style.display = 'none';
    document.body.appendChild(frame);

    setTimeout(function () {
        document.body.removeChild(frame);
    }, 1000);
}
function openLink(obj) {
    var appUrl = "yhouse://web?title=" + encodeURIComponent(obj.title) + "&url=" + encodeURIComponent(obj.url) + "&shareIcon=" + encodeURIComponent(obj.shareIcon);
    
    var userAgent = window.navigator.userAgent.toLowerCase();
    if(/(YhouseAppVersion|YHMainApp)/i.test(userAgent)){
        window.location = appUrl;
    }else{
        window.location = obj.url;
    }
}
function type(obj){
    var class2type = {} ;
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e,i){
        class2type[ "[object " + e + "]" ] = e.toLowerCase();
    });
    //当然为了兼容IE低版本，forEach需要一个polyfill，不作细谈了。
    if ( obj == null ){
        return String( obj );
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[ class2type.toString.call(obj) ] || "object" :
        typeof obj;
}
function getQueryValue(key){
    var match=location.search.match(new RegExp(key+'=([^&]*)'));
    return match&&match[1]||'';
}
function veiwFit(oImg) {
    if(!oImg.width) {
        console.log("图片未加载完");
        return;
    }
    var clientHeight = document.documentElement.clientHeight;
    var clientWidth = document.documentElement.clientWidth;
    var imgScale = oImg.width/oImg.height;
    var viewScale = clientWidth/clientHeight;
    var w = 0;
    var h = 0;
    if(imgScale > viewScale) {
        w = clientHeight * imgScale;
    } else {
        h = clientWidth / imgScale;
    }
    return {W: w, H:h};
}
//以下为微信分享
function share(){
    if (/(MicroMessenger)/i.test(window.navigator.userAgent.toLowerCase())) {
        /*加载微信JSSDK*/
        var wxScript = document.createElement("script");
        wxScript.src = "//res.wx.qq.com/open/js/jweixin-1.0.0.js";
        // wxScript.defer="defer";
        var documentScript = document.getElementsByTagName("script")[0];
        documentScript.parentNode.insertBefore(wxScript, documentScript);
        
        var linkUrl = location.href;
        var imgUrl = location.protocol + "//" + location.host + "/m/201608bmw/image/top.jpg";
        wxScript.onload = function(){
            $.ajax({
                method: 'GET',
                url: "/api/m/securityTool/wxjsconfig",
                data: {
                    url: linkUrl
                },
                dataType:"json",
                success:function(data){
                    if (data.hasOwnProperty("code") && data.code === "0") {
                        wx.config({
                            debug: false,
                            appId: data.data.appID,
                            timestamp: data.data.timestamp,
                            nonceStr: data.data.nonceStr,
                            signature: data.data.signature,
                            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
                        });
                        
                        wx.ready(function () {
                            wx.onMenuShareTimeline({
                                title: '创新BMW 2系旅行车',
                                link: linkUrl,
                                imgUrl: imgUrl, 
                                success: function () { 
                                },
                                cancel: function () { 
                                }
                            });
                            wx.onMenuShareAppMessage({
                                title: '创新BMW 2系旅行车',
                                desc: '创新BMW 2系旅行车，容纳你世界',
                                link: linkUrl,
                                imgUrl: imgUrl, 
                                success: function () {
                                },
                                cancel: function () {
                                }
                            });
                        });
                    }
                }
            });
        };   
    }
}
})();