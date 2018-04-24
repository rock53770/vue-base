<template>
  <div class="">
    <div class="date1" >
      <input id="date" type="text" readonly placeholder="日期选择" v-bt-date-time="{dataTime:true,minDate:1990}"/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mask: true
    }
  },
  mounted () {
    this.$emit('changePage', {showFooter: false})
    
//    console.log(111)
  },
  methods:{
    showMask (){
      this.mask = true;
    },
    hideMask (){
      this.mask = false;
    }
  }

}
</script>
