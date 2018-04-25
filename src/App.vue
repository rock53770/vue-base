<script src="../.eslintrc.js"></script>
<template>
  <div id="app">
    <header v-if="page.showHeader" class="pos-r h40">
      <div class="header w-100 h40 pos-f box-center bg-gray" id="header">
        <div class="left w20 lh40 w40" @click="back()">
          <i class="iconfont icon-fanhuijiantou ft20"></i>
        </div>
        <div class="box-flex ellipsis">
          <h1 class="ft18">home</h1>
        </div>
        <div class="right w40 lh40"></div>
      </div>
    </header>
    <router-view v-on:changePage="changePage"></router-view>
    <footer v-if="page.showFooter" class="pos-f h40 bg-gray w-100">
      <div>
        1
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      page: {
      },
      defaultPage: {
        showHeader: true,
        showFooter: false
      }
    }
  },
  created(){
    this.changePage();
    // this.$http.post("http://movie.nccwzx.com/index/index/addFriendRequest",{
    //       appid:11,
    //       from_id: 197,
    //       to_id: 188
    // },{
    //   // headers:{"credientials": true },
    //   emulateJSON:true
    // }).then((res)=>{
    //     // res=res.body;
    //     console.log(res);
    // });
  },
  mounted(){
    var oHeader = document.getElementById("header");
    if(!oHeader) return
    var nLast = 0;
    var homeScroll = function(){

      if(window.pageYOffset > nLast && window.pageYOffset > 100){
        oHeader.style.top = "-.4rem";
      } else {
        oHeader.style.top = "0";
      }
      // nLast = window.pageYOffset;
      setTimeout(function(){nLast = window.pageYOffset;},10);
    };

    window.addEventListener("scroll",homeScroll,false);
  },
  methods: {
    changePage (page) {
      this.page = Object.assign({},this.defaultPage, page)
    },
    back (){
        history.go(-1);
    }

  }
}
</script>
