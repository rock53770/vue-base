"use strict";
Vue.component('pull', {
    template: '#pull',
    props:{
        dis:{
            type: [String, Number],
            default: 44
        }
    },
    data: function () {
         return {
        };
    },
    ready:function(){
        this.init();
    },
    methods: {
        init: function() {
            var touchId, isTouched, isMoved, touchesStart = {}, isScrolling, touchesDiff, touchStartTime, container, refresh = false, useTranslate = false, startTranslate = 0, translate, scrollTop, wasScrolled, layer, triggerDistance, dynamicTriggerDistance, pullStarted;
            triggerDistance = parseInt(this.dis);
            var ua = navigator.userAgent;
            container = this.$el;
            container.style.height = document.documentElement.clientHeight + triggerDistance + "px";
            var vm = this;
            // app.device.os = 'android';

            function checkInIOS () {
                return /(iPhone|iPad|iPod|iOS)/i.test(ua);
            }
            function checkInAndroid () {
                return /(Android)/i.test(ua);
            }
            function handleTouchStart(e) {
                if (isTouched) {
                    if (checkInAndroid ()) {
                        if ('targetTouches' in e && e.targetTouches.length > 1) return;
                    }
                    else return;
                }

                /*jshint validthis:true */
                // container = $(this);
                if (container.classList.contains("refreshing")) {
                    return;
                }

                isMoved = false;
                pullStarted = false;
                isTouched = true;
                isScrolling = undefined;
                wasScrolled = undefined;
                if (e.type === 'touchstart') touchId = e.targetTouches[0].identifier;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();

            }

            function handleTouchMove(e) {
                if (!isTouched) return;
                var pageX, pageY, touch;
                if (e.type === 'touchmove') {
                    if (touchId && e.touches) {
                        for (var i = 0; i < e.touches.length; i++) {
                            if (e.touches[i].identifier === touchId) {
                                touch = e.touches[i];
                            }
                        }
                    }
                    if (!touch) touch = e.targetTouches[0];
                    pageX = touch.pageX;
                    pageY = touch.pageY;
                }
                else {
                    pageX = e.pageX;
                    pageY = e.pageY;
                }
                if (!pageX || !pageY) return;


                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (!isScrolling) {
                    isTouched = false;
                    return;
                }

                scrollTop = container.scrollTop;
                if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true;

                if (!isMoved) {
                    /*jshint validthis:true */
                    // container.removeClass('transitioning');
                    container.classList.remove("transitioning");
                    if (scrollTop > container.offsetHeight) {
                        isTouched = false;
                        return;
                    }
                    // if (dynamicTriggerDistance) {
                    //     triggerDistance = container.attr('data-ptr-distance');
                    //     if (triggerDistance.indexOf('%') >= 0) triggerDistance = container.offsetHeight * parseInt(triggerDistance, 10) / 100;
                    // }
                    startTranslate = container.classList.contains("refreshing") ? triggerDistance : 0;
                    if (container.scrollHeight === container.offsetHeight || !checkInIOS) {
                        useTranslate = true;
                    }
                    else {
                        useTranslate = false;
                    }
                }
                isMoved = true;
                touchesDiff = pageY - touchesStart.y;

                if (touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0) {
                    // iOS 8 fix
                    // if (app.device.os === 'ios' && parseInt(app.device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;
                    if (checkInIOS () && scrollTop === 0 && !wasScrolled) useTranslate = true;

                    if (useTranslate) {
                        e.preventDefault();
                        translate = (Math.pow(touchesDiff, 0.85) + startTranslate);
                        // container.transform('translate3d(0,' + translate + 'px,0)');
                        container.style.transform = 'translate3d(0,' + translate + 'px,0)';
                    }
                    if ((useTranslate && Math.pow(touchesDiff, 0.85) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
                        refresh = true;
                        // container.addClass('pull-up').removeClass('pull-down');
                        container.classList.add("pull-up");
                        container.classList.remove("pull-down");
                    }
                    else {
                        refresh = false;
                        // container.removeClass('pull-up').addClass('pull-down');
                        container.classList.remove("pull-up");
                        container.classList.add("pull-down");
                    }
                    if (!pullStarted) {
                        // container.trigger('pullstart ptr:pullstart');
                        pullStarted = true;
                    }
                    // container.trigger('pullmove ptr:pullmove', {
                    //     event: e,
                    //     scrollTop: scrollTop,
                    //     translate: translate,
                    //     touchesDiff: touchesDiff
                    // });
                }
                else {
                    pullStarted = false;
                    // container.removeClass('pull-up pull-down');
                    container.classList.remove("pull-up");
                    container.classList.remove("pull-down");
                    refresh = false;
                    return;
                }
            }
            function handleTouchEnd(e) {
                if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0 && touchId) {
                    if (e.changedTouches[0].identifier !== touchId) return;
                }
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                if (translate) {
                    // container.addClass('transitioning');
                    container.classList.add("transitioning");
                    translate = 0;
                }
                // container.transform('');
                container.style.transform = "";
                if (refresh) {
                    // container.addClass('refreshing');
                    container.classList.add("refreshing");
                    // container.trigger('refresh ptr:refresh', {
                    //     done: function () {
                    //         app.pullToRefreshDone(container);
                    //     }
                    // });
                    vm.$emit('refresh',pullToRefreshDone);
                }
                else {
                    // container.removeClass('pull-down');
                    container.classList.remove("pull-down");
                }
                isTouched = false;
                isMoved = false;
                // if (pullStarted) container.trigger('pullend ptr:pullend');
            }
            function pullToRefreshDone(){
                container.classList.remove("refreshing");
                container.classList.add("transitioning");

                container.addEventListener("transitionend", function(e) {
                    container.classList.remove("transitioning");
                    container.classList.remove("pull-up");
                    container.classList.remove("pull-down");
                }, false);
            }

            function pullToRefreshTrigger() {

                if (container.classList.contains("refreshing")) return;
                container.classList.add("transitioning");
                container.classList.add("refreshing");
                pullToRefreshDone();
            }
            
            container.addEventListener("touchstart", handleTouchStart, !1);
            container.addEventListener("touchmove", handleTouchMove, !1);
            container.addEventListener("touchend", handleTouchEnd, !1);
            // Detach Events on page remove
            // if (page.length === 0) return;
            // function destroyPullToRefresh(destroyTarget) {
            //     destroyTarget.off(app.touchEvents.start, handleTouchStart, passiveListener);
            //     destroyTarget.off(app.touchEvents.move, handleTouchMove, activeListener);
            //     destroyTarget.off(app.touchEvents.end, handleTouchEnd, passiveListener);
            // }
            // for (var i = 0; i < eventsTarget.length; i++) {
            //     eventsTarget[i].f7DestroyPullToRefresh = destroyPullToRefresh;
            // }
            // function detachEvents() {
            //     destroyPullToRefresh(eventsTarget);
            //     page.off('page:beforeremove', detachEvents);
            // }
            // page.on('page:beforeremove', detachEvents);
        }
    }
});