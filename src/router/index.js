import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'
import Classify from '@/view/Classify'
import Info from '@/view/Info'
import Date from '@/view/Date'
import Upload from '@/view/Upload'
import clipboard from '@/view/clipboard'


Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/classify',
      name: 'Classify',
      component: Classify
    },{
      path: '/info',
      name: 'info',
      component: Info
    },{
      path: '/date',
      name: 'date',
      component: Date
    },{
      path: '/upload',
      name: 'upload',
      component: Upload
    },{
      path: '/clipboard',
      name: 'clipboard',
      component: clipboard
    }

  ]
})
router.beforeEach((to, from, next) => {
  next();
})


export default  router;
