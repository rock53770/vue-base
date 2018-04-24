import Vue from 'vue';
Vue.directive('height', {
  inserted: function (el,binding) {
    if(binding.value === '100%'){
      el.style.height = document.documentElement.clientHeight + 'px';
    } else {
      el.style.height = binding.value;
    }
  }
});

Vue.directive('scroll', {
  inserted: function (el) {
    function GetSlideAngle(dx, dy) {
      return Math.atan2(dy, dx) * 180 / Math.PI;
    }
//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    function GetSlideDirection(startX, startY, endX, endY) {
      var dy = startY - endY;
      var dx = endX - startX;
      var result = 0;

      //如果滑动距离太短
      if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
      }

      var angle = GetSlideAngle(dx, dy);
      if(angle >= -45 && angle < 45) {
        result = 4;
      }else if (angle >= 45 && angle < 135) {
        result = 1;
      }else if (angle >= -135 && angle < -45) {
        result = 2;
      }
      else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
      }

      return result;
    }
    var botScroll = parseInt(window.getComputedStyle(el.children[0], null).height) - parseInt(window.getComputedStyle(el, null).height);
    var scrollTop;
    var direction;
    var startX, startY;
    el.addEventListener('touchstart',function (e) {
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
    }, false);
    el.addEventListener('touchmove',function (e) {
      var endX, endY;
      endX = e.changedTouches[0].pageX;
      endY = e.changedTouches[0].pageY;
      direction = GetSlideDirection(startX, startY, endX, endY);
      scrollTop = el.scrollTop;
      if((scrollTop === 0 && direction === 2) || (scrollTop === botScroll && direction === 1)){
        e.preventDefault();
      }
    }, false);
  }
});


Vue.directive('btDateTime', {
  inserted: function (el,binding) {
    var arg = binding.value;
    // var minDate = arg.minDate ? new Date(formatDate(arg.minDate)) : new Date(2000, 0, 1, 0, 0, 0),
    //     maxDate = arg.maxDate ? new Date(formatDate(arg.maxDate)) : new Date(new Date().getFullYear() + 2, 0, 1, 0, 0, 0),
    //     defaultDate = arg.defaultDate ? new Date(formatDate(arg.defaultDate)) : new Date()
    // ;
    // function formatDate(dateStr){
    //     if(!dateStr){
    //         return dateStr;
    //     }

    //     if(dateStr.match(/^\d{8,}$/g)){//时间戳
    //         dateStr = parseInt(dateStr);
    //     } else{
    //         if(!isDateTime){
    //             dateStr = Util.formatDate(dateStr, 'yyyy-MM-dd HH:mm:ss');
    //         }
    //     }
    //     return dateStr;
    // }

    require.ensure([], function(require){
      require('./lib/jquery.min');
      require('./lib/mobiscroll2.5.1/mobiscroll.min');
      require('./lib/mobiscroll2.5.1/mobiscroll.min.css');
      // require('lib/mobiscrollAll/mobiscroll.custom-2.5.2.min');
      // require('lib/mobiscrollAll/mobiscroll.custom-2.5.2.min.css');
// console.log(minDate, maxDate, defaultDate)
      var options = {
          // defaultValue: new Date(ngModel.$modelValue),
          dateFormat: "yyyy-mm-dd",
          timeFormat: 'HH:ii',
          // dateOrder: 'yyyymmdd',
          yearText: '年',
          monthText: '月',
          dayText: '日',
          position: true,
          // headerText: "{value}",
          // readonly: 'true',
          // valid : false,
          // width: $(window).width(),
          theme: 'android-ics light bt-datetime-box',      // Specify theme like: theme: 'ios' or omit setting to use default
          lang: 'zh',    // Specify language like: lang: 'pl' or omit setting to use default
          display: 'bottom',  // Specify display mode like: display: 'bottom' or omit setting to use default
          //mode: 'datetimeMinmax',         // More info about mode: https://docs.mobiscroll.com/3-0-0_beta2/measurement#!opt-mode
          //minDate: minDate,   // More info about min: https://docs.mobiscroll.com/3-0-0_beta2/datetime#!opt-min
          //maxDate: maxDate,    // More info about max: https://docs.mobiscroll.com/3-0-0_beta2/datetime#!opt-max
          height: 34,
          onShow: function(ele, sss, obj){
              //点击背景关闭
              $('.dwo').one('click', function(){
                  obj.cancel();
              })

              // $scope.$on('$stateChangeStart', function(){
              //     angular.element('.bt-datetime-box').remove();
              // });
          }
      };


      arg.dataTime ? $(el).mobiscroll().datetime(options) : $(el).mobiscroll().date(options);
      

      //解决ios输入框readonly无效的bug
      $(el)
          .attr('unselectable', 'on')
          // .css('imeMode', 'disabled')
          .attr('readonly', 'readonly').on('focus', function(e){
              var _this = this;
              this.blur();
              e && e.preventDefault();
              e && e.stopPropagation();

              return false;
          }
      )
  }, 'lib/mobiscroll');

  }
});
