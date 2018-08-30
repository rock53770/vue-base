
 
<template id="t">
  <div class="container">
    <input type="text" v-model="message" disabled="disabled">
    <button type="button"
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy!</button>
  </div>
</template>
 
<script>
// new Vue({
//   el: '#app',
//   template: '#t',
//   data: function () {
//     return {
//       message: 'Copy These Text'
//     }
//   },
//   methods: {
//     onCopy: function (e) {
//       alert('You just copied: ' + e.text)
//     },
//     onError: function (e) {
//       alert('Failed to copy texts')
//     }
//   }
// })
export default {
  name: 'test',
  data () {
    return {
      message: '1111'
    }
  },
  mounted () {
  },
  methods:{
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  }

}
</script> 