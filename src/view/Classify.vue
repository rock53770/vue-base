
<template>
  <div class="classify-box" v-height="'100%'">
    <div class="h-100 ">
      <div class="fl h-100 w100 of-hide bg-gray classify-nav">
        <ul class="bg-gray scrollfix">
          <li class="h80" v-for="i in navData" @click="click(i)" :class="{'active':cont === i.cont }">
            <p class="lh80" v-text="i.txt"></p>
          </li>
        </ul>
      </div>
      <div class="classify-cont">
        <div v-text="cont">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classify',
  data () {
    return {
      navData:[
        {
          txt:"111",
          cont:"11111111111"
        },{
          txt:"222",
          cont:"22222222222"
        },{
          txt:"333",
          cont:"33333333333"
        },{
          txt:"444",
          cont:"44444444444"
        },{
          txt:"555",
          cont:"55555555555"
        },{
          txt:"666",
          cont:"66666666666"
        },{
          txt:"777",
          cont:"77777777777"
        },{
          txt:"888",
          cont:"88888888888"
        },{
          txt:"999",
          cont:"88888888888888888"
        },{
          txt:"1010",
          cont:"101010101010"
        },{
          txt:"1111",
          cont:"1111111111111"
        },{
          txt:"1212",
          cont:"121212121212121"
        },{
          txt:"1313",
          cont:"1313131313131313"
        }
      ],
      cont:"11111111111"
    }
  },
  mounted () {
    this.$emit('changePage', {showHeader: false})
  },
  methods:{
      click:function(i){
          this.cont = i.cont;
      }

  }

}
</script>
