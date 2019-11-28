import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 商品信息模块
const Hello = {
  state: {
    list: [],
    biaoti: [
      {
        biao: '在线商城',
        hove: false
      },
      {
        biao: '坚果Pro',
        hove: false
      },
      {
        biao: 'SmartisanMi / M1L',
        hove: false
      },
      {
        biao: 'Smartisan OS',
        hove: false
      },
      {
        biao: '喜欢云',
        hove: false
      }, {
        biao: '应用下载',
        hove: false
      },
      {
        biao: '官方论坛',
        hove: false
      }]
  },
  mutations: {
    hove1 (state, index) {
      state.biaoti[index].hove = true
    },
    hove3 (state, index) {
      state.biaoti[index].hove = false
    },
    haunimg (state, imgcon) {
      console.log(imgcon.index2)
      console.log(imgcon.val2)
      state.list[imgcon.index2].sku_info[0].ali_image = imgcon.val2
      // console.log(state.list)
    }

  }
}
// 详情页模块

const Xiangq = {
  state: {
    gouwulist: []

  },
  mutations: {
    // 加
    jia (state, val) {
      console.log(val)
      let index = state.gouwulist.findIndex(item => {
        return item.id === val.id
      })
      if (index === -1) {
        state.gouwulist.push(val)
        console.log(state.gouwulist)
      } else {
        state.gouwulist[index].linit_num++
      }
    }
    // // 减
    // jian (state, index) {
    //   state.gouwulist[index].limit_num--
    //   // console.log(state.gouwulist)
    // }
  }
}
const store = new Vuex.Store({

  state: {
  },
  mutations: {

  },
  modules: {
    Hello,
    Xiangq
  }
})
export default store
