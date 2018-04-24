(function(w,d){
"use strict";
var Rslide = function(el, ele, options) {
	this.el = el;
	this.element = ele;
	this.slides = this.element.children;
	this.sLength = this.slides.length;
	this.options = options || {};
    this.options = {
        curIndex: this.options.curIndex || 0,
        speed: this.options.speed || 300,
        auto: this.options.auto || 0,
        callback: this.options.callback || null ,
        afterTouchStop: this.options.afterTouchStop || !1
    };
    this.clientH = d.body.clientHeight;
    this.startStatus = {};
	this.delta = {};
    this.init();
};
Rslide.prototype = {
	handleEvent: function (e){
		switch(e.type){
			case "touchstart" :
				this.touchStart(e);
				break;
			case "touchmove":
				this.touchMove(e);
				break;
			case "touchend":
				this.touchEnd(e);
				break;
		}
	},
	init:function () {

		this.element.style.height = this.sLength * this.clientH + "px";
		for(var i=0; i<this.sLength; i++){
			this.slides[i].style.height = this.clientH + "px";
			this.slides[i].style.position = "absolute";
			this.slides[i].style.top = i * this.clientH + "px";
		}
		this.el.addEventListener("touchstart", this, false);
	},
	translate:function(dist, speed, ele) {
		if (!!ele) { ele = ele.style; } else { ele = this.element.style; }
        ele.webkitTransitionDuration = ele.MozTransitionDuration = ele.msTransitionDuration = ele.OTransitionDuration = ele.transitionDuration = speed + 'ms';
        ele.webkitTransform = 'translate(0,' + dist + 'px)' + 'translateZ(0)';
        ele.msTransform = ele.MozTransform = ele.OTransform = 'translateY(' + dist + 'px)';
	},
	destroy:function(){
        this.el.removeEventListener("touchmove", this, false);
        this.el.removeEventListener("touchend", this, false);
	},
	touchStart:function (t) {
		this.el.addEventListener("touchmove", this, false);
        this.el.addEventListener("touchend", this, false);
		var e = t.touches[0];
        this.startStatus = {
            x: e.pageX,
            y: e.pageY,
            time: new Date().getTime()
        };
	},
	touchMove:function (t) {
		t.preventDefault();
		var e = t.touches[0];
		this.delta.x = e.pageX - this.startStatus.x;
        this.delta.y = e.pageY - this.startStatus.y;
        this.delta.time = new Date().getTime() - this.startStatus.time;

		if ((this.options.curIndex === 0 && this.delta.y > 0) || (this.options.curIndex >= this.sLength - 1 && this.delta.y < 0)) { 
			this.delta.y = this.delta.y * 0.4 ;
		}
		this.translate(-this.options.curIndex * this.clientH + this.delta.y,0);
	},
	touchEnd:function (t) {
		var self = this;
		// if(this.options.curIndex >= this.sLength - 1 && (this.delta.y < -this.clientH / 5  || (this.delta.y < -this.clientH / 10 && this.delta.time < 250)) ){
		// 	location.href = "menu.html";
		// 	return;
		// }

        if (Math.abs(this.delta.y) > this.clientH / 5 || (Math.abs(this.delta.y) > this.clientH / 10 && this.delta.time < 250)) { 
			this.delta.y > 0 ? this.options.curIndex-- : this.options.curIndex++;
		}
		if (this.options.curIndex >= this.sLength) { 
			this.options.curIndex = this.sLength-1;
		} else if (this.options.curIndex < 0) { 
			this.options.curIndex = 0;
		}
        this.translate(-this.options.curIndex * this.clientH,this.options.speed);
        
    	if (Math.abs(this.delta.y) > this.clientH / 5 || (Math.abs(this.delta.y) > this.clientH / 10 && this.delta.time < 250)) { 
    		setTimeout(function(){
	        	self.options.callback && self.options.callback(self.options.curIndex);
        	},200);
		}
        
        console.log(this.options.curIndex);  
        this.delta.y = 0;
        this.destroy();
	},
};

w.Rslide = Rslide;

})(window,document);

