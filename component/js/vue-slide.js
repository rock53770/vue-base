"use strict";
Vue.component('slide', {
    template: '\
        <div class="slide-wrap">\
            <div class="slide">\
                <slot></slot>\
            </div>\
            <div class="slide-indicators" v-show="options.showIndicators && sLength>1">\
                <div>\
                    <p v-for="i in sLength" :class="{ active: options.curIndex === i }"></p>\
                </div>\
            </div>\
        </div>',
    props:{
        slidelist:Array,
        options:{
            type: Object,
            coerce: function (options) {
                options = options || {};
                return {
                    curIndex:  options.curIndex || 0,
                    speed: options.speed || 300,
                    auto:  options.auto || 0,
                    showIndicators:options.showIndicators || 1,
                    callback:options.callback || null ,
                    afterTouchStop:options.afterTouchStop || 0
                };
            }
        }
    },
    data: function () {
         return {
          el: "",
          element: {},
          slides: [],
          width:0,
          sLength: 0,
          autoTimer: 0,
          startStatus: {},
          endStatus: {},
          delta: {},
          slidePos: [],
          canSkip: true,
          isScrollY: undefined,
          tab: 0
        };
    },
    watch:{
        slidelist:function(){
            this.init(); 
        }
    },
    ready:function(){
        this.init();
    },
    methods: {
        init: function() {
            this.el = this.$el;
            this.element = this.el.children[0];
            this.slides = this.el.children[0].children;
            this.sLength = this.slides.length;
            if(this.sLength <= 1){
                return;
            }
            this.width = this.el.getBoundingClientRect().width || this.el.offsetWidth,
            this.element.style.width = this.sLength * this.width + "px";
            for (var t = this.sLength; t--; ) {
                var e = this.slides[t];
                e.style.width = this.width + "px",
                e.style.left = t * -this.width + "px",
                this.medium(t, this.width, 0)
            }
            this.medium(this.circle(this.options.curIndex - 1), -this.width, 0),
            this.medium(this.options.curIndex, 0, 0),
            this.medium(this.circle(this.options.curIndex + 1), this.width, 0),
            this.el.style.visibility = "visible",
            this.clearTimer(),
            this.setTimer(),
            this.setIndex(this.options.curIndex),
            this.initEvents();
            this.loadHandle();
        },
        medium: function(t, e, n) {
            this.slidePos[t] = e,
            this.translate(t, e, n)
        },
        translate: function(t, e, n) {
            var i = this.slides[t];
            i.style.webkitTransitionDuration = n + "ms";
            i.style.webkitTransform = "translate3d(" + e + "px, 0, 0)";
        },
        circle: function(t) {
            return (this.sLength + t % this.sLength) % this.sLength;
        },
        initEvents: function() {
            this.el.addEventListener("touchstart", this.touchStart, !1);
            this.el.addEventListener("touchmove", this.touchMove, !1);
            this.el.addEventListener("touchend", this.touchEnd, !1);
            //document.addEventListener("resize", this.init, !1);
        },
        destroy: function() {
            this.el.removeEventListener("touchstart", this.touchStart, !1),
            this.el.removeEventListener("touchmove", this.touchMove, !1),
            this.el.removeEventListener("touchend", this.touchEnd, !1),
            //window.removeEventListener("resize", this.init, !1),
            this.element.removeAttribute("style"),
            this.clearTimer();
            for (var t = 0, e = this.element.children.length; e > t; t++)
                this.element.children[t].removeAttribute("style")
        },
        touchStart: function(t) {
            var e = t.touches[0];
            this.startStatus = {
                x: e.pageX,
                y: e.pageY,
                time: (new Date).getTime()
            },
            this.isScrollY = undefined,
            this.clearTimer();
        },
        touchMove: function(t) {
            if (!(t.touches.length > 1 || t.scale && 1 !== t.scale)) {
                var e = t.touches[0];
                this.endStatus = {
                    x: e.pageX,
                    y: e.pageY,
                    time: (new Date).getTime()
                },
                this.delta.x = this.endStatus.x - this.startStatus.x,
                this.delta.y = this.endStatus.y - this.startStatus.y,
                this.delta.time = this.endStatus.time - this.startStatus.time;
                if("undefined" == typeof this.isScrollY){
                    this.isScrollY = !!(
                        this.isScrollY || Math.abs(this.delta.x) < Math.abs(this.delta.y)
                        );
                    if(this.sLength == 2){
                        this.medium(1-this.options.curIndex, this.delta.x > 0 ? -this.width : this.width, e && 0);
                    }
                }
                if(!this.isScrollY) {
                    t.preventDefault(),
                    
                    this.translate(this.circle(this.options.curIndex - 1), this.delta.x + this.slidePos[this.circle(this.options.curIndex - 1)], 0),
                    
                    this.translate(this.options.curIndex, this.delta.x + this.slidePos[this.circle(this.options.curIndex)], 0),
                    
                    this.translate(this.circle(this.options.curIndex + 1), this.delta.x + this.slidePos[this.circle(this.options.curIndex + 1)], 0);

                }
                this.canSlide = true;
            }
        },
        touchEnd: function(t) {
            if (!this.isScrollY && this.canSlide) {
                
                if(this.sLength == 2){
                    var e = false;
                    if(Math.abs(this.delta.x) > this.width / 2 || this.delta.time < 250 && Math.abs(this.delta.x) > 20){
                        e = true;

                        this.options.curIndex = 1-this.options.curIndex;
                        this.medium(this.options.curIndex, 0, this.options.speed);
                        this.medium(1-this.options.curIndex, this.delta.x > 0 ? this.width : -this.width, this.options.speed);
                        
                        this.slideCallback(this.options.curIndex);
                        this.setIndex(this.options.curIndex);
                    } else {
                        this.medium(1-this.options.curIndex, this.delta.x > 0 ? -this.width : this.width, this.options.speed);
                        this.medium(this.options.curIndex, 0, this.options.speed);
                    }
                    
                    this.options.afterTouchStop || this.setTimer();
                } else {
                    var e = false;
                    if(Math.abs(this.delta.x) > this.width / 2 || this.delta.time < 250 && Math.abs(this.delta.x) > 20){
                        e = true;

                        if(this.delta.x > 0){
                            this.medium(this.circle(this.options.curIndex + 1), this.width, this.options.speed);
                            this.options.curIndex = this.circle(this.options.curIndex - 1);
                        } else {
                            this.medium(this.circle(this.options.curIndex - 1), -this.width, this.options.speed);
                            this.options.curIndex = this.circle(this.options.curIndex + 1);
                        }
                        
                        this.slideCallback(this.options.curIndex);
                        this.setIndex(this.options.curIndex);
                    } 

                    this.medium(this.circle(this.options.curIndex - 1), -this.width, e && this.delta.x > 0 ? 0 : this.options.speed);
                    this.medium(this.options.curIndex, 0, this.options.speed);
                    this.medium(this.circle(this.options.curIndex + 1), this.width, e && this.delta.x < 0 ? 0 : this.options.speed);
                    this.options.afterTouchStop || this.setTimer();
                }
            }
            this.canSlide = false;
            this.loadHandle();
        },
        getDirection: function(t) {
            return (t - this.options.curIndex) * (Math.abs(t - this.options.curIndex) > this.sLength / 2 ? -1 : 1) > 0 ? 1 : -1;
        },
        goTo: function(t) {
            if (this.options.curIndex != t && this.canSkip) {
                var n = this;
                n.canSkip = !1,
                t = n.circle(t);
                if(this.sLength == 2){
                    //var e = this.getDirection(t);
                    this.translate(t, this.width, 0);
                    setTimeout(function() {
                        n.medium(n.options.curIndex, -1 * n.width, n.options.speed);
                        n.medium(t, 0, n.options.speed);
                        n.options.curIndex = t ;
                    }, 0);
                    setTimeout(function() {
                        n.medium(1-n.options.curIndex, n.width, 0);
                        n.canSkip = !0;
                    }, n.options.speed);
                } else {
                    var e = this.getDirection(t);
                    this.translate(t, e * this.width, 0);
                    setTimeout(function() {
                        n.medium(n.options.curIndex, -e * n.width, n.options.speed);
                        n.medium(t, 0, n.options.speed);
                        n.options.curIndex = t ;
                    }, 0);
                    setTimeout(function() {
                        n.medium(n.circle(t - 1), -n.width, 0),
                        n.medium(n.circle(t + 1), n.width, 0),
                        n.canSkip = !0;
                    }, n.options.speed);
                }
                
                n.slideCallback(t),
                this.setIndex(t);
            }
        },
        next: function() {
            this.goTo(this.options.curIndex + 1),
            //this.loadHandle()
            this.loadImg(this.circle(this.options.curIndex + 2));
        },
        setTimer: function() {
            if (this.options.auto) {
                var t = this;
                0 == this.autoTimer && (t.autoTimer = setInterval(function() {
                    t.next()
                }, this.options.auto))
            }
        },
        clearTimer: function() {
            this.options.auto && (clearInterval(this.autoTimer),
            this.autoTimer = 0)
        },
        slideCallback: function(t) {
            this.index = t;
            this.options.callback && this.options.callback(t)
        },
        setIndex: function(t) {
            this.tab && (this.tab.innerHTML = t + 1);
        },
        loadHandle: function() {
            this.loadImg(this.circle(this.options.curIndex + 1));
            this.loadImg(this.circle(this.options.curIndex - 1));
            this.loadImg(this.circle(this.options.curIndex));
        },
        loadImg: function(t) {
            var e = this.slides[t].querySelector("img")
              , n = e && e.getAttribute("data-src");
            e && n && (e.src = n,
            e.removeAttribute("data-src"))
        },
    }
});