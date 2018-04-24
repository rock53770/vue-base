"use strict";
var Xslide = function(t, e, n) {
    this.el = t,
    this.element = t.children[0],
    this.slides = this.element.children,
    this.sLength = this.slides.length,
    this.sumElement = document.querySelector(".j_slide_sum"),
    this.options = e || {},
    this.options = {
        curIndex: this.options.curIndex || 0,
        speed: this.options.speed || 300,
        auto: this.options.auto || 0,
        callback: this.options.callback || null ,
        afterTouchStop: this.options.afterTouchStop || !1
    },
    this.autoTimer = 0,
    this.startStatus = {},
    this.endStatus = {},
    this.delta = {},
    this.slidePos = [],
    this.canSkip = !0,
    this.isScrollY,
    this.tab = n,
    this.init()
    
    //this.cardExpose(this.el),
    //this.initExpose()
};
Xslide.prototype = {
    handleEvent: function(t) {
        switch (t.type) {
        case "touchstart":
            this.touchStart(t);
            break;
        case "touchmove":
            this.touchMove(t);
            break;
        case "touchend":
            this.touchEnd(t);
            break;
        case "resize":
            this.init()
        }
    },
    init: function() {
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
        this.initEvents()
    },
    medium: function(t, e, n) {
        this.slidePos[t] = e,
        this.translate(t, e, n)
    },
    translate: function(t, e, n) {
        var i = this.slides[t];
        i.style.webkitTransitionDuration = n + "ms",
        i.style.webkitTransform = "translate3d(" + e + "px, 0, 0)"
    },
    circle: function(t) {
        return (this.sLength + t % this.sLength) % this.sLength
    },
    initEvents: function() {
        this.el.addEventListener("touchstart", this, !1),
        this.el.addEventListener("touchmove", this, !1),
        this.el.addEventListener("touchend", this, !1),
        document.addEventListener("resize", this, !1)
    },
    destroy: function() {
        this.el.removeEventListener("touchstart", this, !1),
        this.el.removeEventListener("touchmove", this, !1),
        this.el.removeEventListener("touchend", this, !1),
        window.removeEventListener("resize", this, !1),
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
        this.clearTimer()
    },
    touchMove: function(t) {
        if (!(t.touches.length > 1 || t.scale && 1 !== t.scale)) {
            var e = t.touches[0];
            this.endStatus = {
                x: e.pageX,
                y: e.pageY,
                time: (new Date).getTime()
            };
            this.delta.x = this.endStatus.x - this.startStatus.x;
            this.delta.y = this.endStatus.y - this.startStatus.y;
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
                
                this.translate(this.circle(this.options.curIndex + 1), this.delta.x + this.slidePos[this.circle(this.options.curIndex + 1)], 0)
            }
            this.canSlide = !0
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
        return (t - this.options.curIndex) * (Math.abs(t - this.options.curIndex) > this.sLength / 2 ? -1 : 1) > 0 ? 1 : -1
    },
    goTo: function(t) {
        if (this.options.curIndex != t && this.canSkip) {
            if(this.sLength == 2){
                this.canSkip = !1,
                t = this.circle(t);
                //var e = this.getDirection(t);
                this.translate(t, this.width, 0);
                var n = this;
                setTimeout(function() {
                    n.medium(n.options.curIndex, -1 * n.width, n.options.speed);
                    n.medium(t, 0, n.options.speed);
                    n.options.curIndex = t ;
                }, 0),
                setTimeout(function() {
                    n.medium(1-n.options.curIndex, n.width, 0);
                    n.canSkip = !0;
                }, n.options.speed);
            } else {
                this.canSkip = !1;
                t = this.circle(t);
                var e = this.getDirection(t);
                this.translate(t, e * this.width, 0);
                var n = this;
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
        this.loadHandle()
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
        this.options.callback && this.options.callback(t)
    },
    setIndex: function(t) {
        this.tab && (this.tab.innerHTML = t + 1)
    },
    loadHandle: function() {
        this.loadImg(this.circle(this.options.curIndex + 1)),
        this.loadImg(this.circle(this.options.curIndex - 1))
    },
    loadImg: function(t) {
        var e = this.slides[t].querySelector("img")
          , n = e.getAttribute("data-src");
        e && n && (e.src = n,
        e.removeAttribute("data-src"))
    },
    cardExpose: function(t) {
        t && exposeObj.trigger("elemExposeAddItem", ["sinaIndex", [t], !0])
    },
    initExpose: function() {
        var t = this;
        exposeObj.on("elemExposeHappen", function(e, n, i) {
            try {
                -1 == n.indexOf(t.el) ? t.clearTimer() : -1 != n.indexOf(t.el) && (t.lastTime = new Date,
                t.setTimer())
            } catch (s) {
                console.log(s)
            }
        })
    },
    appendItemBatch: function(t) {
        if ("[object Array]" != toString.call(t))
            return void appendItem(t.dom, t.pos);
        var e = !1;
        0 != this.autoTimer && "undefined" != this.autoTimer && (e = !0),
        e && this.clearTimer(),
        this.sLength += t.length,
        this.sumElement.innerHTML = this.sLength,
        this.element.style.width = this.sLength * this.width + "px";
        for (var n = (t.filter(function(t) {
            return parseInt(t.pos) > this.options.curIndex
        }).sort(function(t, e) {
            return parseInt(e.pos) - parseInt(t.pos)
        }).forEach(function(e) {
            this.element.appendChild(t[e].dom)
        }),
        t.filter(function(t) {
            return parseInt(t.pos) <= this.options.curIndex
        }).sort(function(t, e) {
            return parseInt(t.pos) - parseInt(e.pos)
        }).forEach(function(e) {
            this.element.insertBefore(t[e].dom, this.slides[t[e].pos])
        }),
        this.sLength); n >= this.options.curIndex && n--; ) {
            var i = this.slides[n];
            i.style.width = this.width + "px",
            i.style.left = n * -this.width + "px",
            this.medium(n, this.width, 0)
        }
        this.medium(this.circle(this.options.curIndex - 1), -this.width, 0),
        this.medium(this.options.curIndex, 0, 0),
        this.medium(this.circle(this.options.curIndex + 1), this.width, 0),
        e && this.setTimer()
    },
    appendItem: function(t, e) {
        var n = !1;
        0 != this.autoTimer && "undefined" != this.autoTimer && (n = !0),
        n && this.clearTimer(),
        this.sLength += 1,
        this.sumElement.innerHTML = this.sLength,
        this.element.style.width = this.sLength * this.width + "px",
        0 == $(t).hasClass("item") && $(t).addClass("item"),
        this.sLength - 1 >= parseInt(e) ? this.element.insertBefore(t, this.slides[e]) : this.element.appendChild(t);
        for (var i = this.sLength; i >= this.options.curIndex && i--; ) {
            var s = this.slides[i];
            s.style.width = this.width + "px",
            s.style.left = i * -this.width + "px",
            this.medium(i, this.width, 0)
        }
        this.medium(this.circle(this.options.curIndex - 1), -this.width, 0),
        this.medium(this.options.curIndex, 0, 0),
        this.medium(this.circle(this.options.curIndex + 1), this.width, 0),
        n && this.setTimer(),
        this.loadHandle()
    }
}