<template>
  <div class="">
    <div class="date">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {
      mask: false
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
