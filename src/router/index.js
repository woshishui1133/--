import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Xiangqing from '@/components/xiangqing'
import Gouwuche from '@/components/gouwuche'
import Denglu from '@/components/denglu'
import Jisuan from '@/components/jisuan'
import Tijiao from '@/components/tijiao'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/xiangqing/:xqingId?',
      name: 'Xiangqing',
      component: Xiangqing
    },
    {
      path: '/gouwuche',
      name: 'Gouwuche',
      component: Gouwuche
    }, {
      path: '/denglu',
      name: 'Denglu',
      component: Denglu
    }, {
      path: '/jisuan',
      name: 'Jisuan',
      component: Jisuan
    }, {
      path: '/tijiao/:tijiaoId?',
      name: 'Tijiao',
      component: Tijiao
    }
  ]
})
