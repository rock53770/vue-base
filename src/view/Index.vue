<style>

</style>
<template>
  <div class="hello">

    <!-- <div v-html="a"></div> -->
    <!-- <img :src="picUrl" style="width:100%"> -->
    <!-- <img src="../assets/images/11.jpg" style="width:100%">
    <img :src="'/static/images/12.jpg'" style="width:100%"> -->
    <!-- <div>
      <my-test></my-test>
    </div> -->
    <div class="content">
      <ul>
        <li>
          <router-link to="/classify" class="ft20">分类选择</router-link>
        </li>
        <li>
          <router-link to="/info" class="ft20">弹出框滚动</router-link>
        </li>
        <li>
          <router-link to="/date" class="ft20">日期选择</router-link>
        </li>
        <li>
          <router-link to="/upload" class="ft20">图片上传</router-link>
        </li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome',
      msg2:"11",
      a:'<span>22</span>',
      headers:{
        credientials:false
      }
    }
  },
  mounted () {
    this.$emit('changePage', {showFooter: true})
//    console.log(111)
//    var oHeader = document.getElementById("header");
//    var nLast = 0;
//    var homeScroll = function(){
//
//      if(window.pageYOffset > nLast && window.pageYOffset > 100){
//        oHeader.style.top = "-.4rem";
//      } else {
//        oHeader.style.top = "0";
//      }
//      // nLast = window.pageYOffset;
//      setTimeout(function(){nLast = window.pageYOffset;},10);
//    };
//
//    window.addEventListener("scroll",homeScroll,false);
  }

}
</script>
