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
      }],
    indexs: 0
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
      state.indexs = imgcon.index
    }

  }
}
// 详情页模块

const Xiangq = {
  state: {
    gouwulist: [],
    show: false,
    quan: true,
    aa: 0
  },
  mutations: {
    // 加
    jia (state, val) {
      console.log(val)
      let index = state.gouwulist.findIndex(item => {
        return item.sku_id === val.sku_id
      })
      if (index === -1) {
        val.checked = true
        val.num = 1
        state.gouwulist.push(val)
        console.log(state.gouwulist)
      } else {
        state.gouwulist[index].limit_num++
        state.gouwulist[index].num++
        if (state.gouwulist[index].num >= 5) {
          state.show = true
          state.gouwulist[index].num = 5
        }
      }
    },
    show3 (state) {
      state.show = false
    },
    show2 (state) {
      state.show = true
    },
    // 删除
    dele (state, index) {
      state.gouwulist.splice(index, 1)
    },
    // 复选框
    fuxuan (state, val) {
      val.checked = !val.checked
      let arr = state.gouwulist.every(item => {
        return item.checked === true
      })
      if (arr) {
        state.quan = true
      } else {
        state.quan = false
      }
    }
    // // 减
    // jian (state, index) {
    //   state.gouwulist[index].limit_num--
    //   // console.log(state.gouwulist)
    // }
  },
  getters: {
    // 总个数
    nums (state) {
      state.as = 0
      state.gouwulist.map(item => {
        state.as += item.limit_num
      })
      return state.as
    },
    // 总价
    prices (state) {
      let aa = 0
      state.gouwulist.map(item => {
        console.log(item)
        if (item.checked === true) {
          console.log(item)
          aa += item.price * item.limit_num
        }
      })
      console.log(aa)
      return aa
    }
  }
}
const store = new Vuex.Store({
// App页面
  state: {
    dizhilist: [],
    idnum: 1,
    // 添加地址的信息
    dd_dizhi: {
      id: 1,
      dd_name: '', // 名字
      dd_phone: '', // 电话
      dd_quphone: '',
      dd_guphone: '',
      dd_xq: '', // 详情
      dval: '', // 省
      dqu: '', // 市
      dxian: '', // 区县
      dd_moren: false // 默认地址状态
    },
    dd_show: false,
    // 订单编号
    dingdan: '',
    // 提交页面的地址信息
    ti_dizhi: '',
    // 订单的数据
    dingdanlist: [],
    // 订单数据里的一个数组
    gouwu: [],
    // 点击查看详情传的订单号
    xqdingdan: '',
    // 订单地址的判断
    dingshow: false
  },
  mutations: {
    // 添加地址
    getdizhi (state, val) {
      val.id = state.idnum++
      let index = state.dizhilist.findIndex(item => {
        return item.id === val.id
      })
      if (index === -1) {
        state.dizhilist.push(val)
      }
      // window.localStorage.setItem('address', JSON.stringify(state.dizhilist))
      // console.log(state.dizhilist)
      state.dd_dizhi = {
        id: 1,
        dd_name: '',
        dd_phone: '',
        dd_quphone: '',
        dd_guphone: '',
        dd_xq: '',
        dval: '',
        dqu: '',
        dxian: '',
        dd_moren: false
      }
    },
    // 添加地址
    dd_dzjia (state) {
      state.dd_show = true
    },
    // 隐藏地址
    dd_dzyin (state) {
      state.dd_show = false
    },
    // 个人信息修改地址
    gaidizhi (state, val, index) {
      state.dd_show = true
      state.dd_dizhi = val
      console.log(state.dizhilist)
      // window.localStorage.setItem('address', JSON.stringify(state.dizhilist))
    },
    // 删除地址
    dizhidele (state, index) {
      state.dizhilist.splice(index, 1)
      // window.localStorage.setItem('address', JSON.stringify(state.dizhilist))
    },
    // 更改默认地址
    js_moren (state, index) {
      state.dizhilist.map(item => {
        item.dd_moren = false
      })
      state.dizhilist[index].dd_moren = true
    },
    // 点击结算 订单号
    dingdan (state, fa) {
      // 默认地址
      state.dizhilist.map(item => {
        if (item.dd_moren === true) {
          state.ti_dizhi = item
        }
      })
      // 订单号生成
      state.dingdan = new Date().valueOf()
      state.xqdingdan = state.dingdan
      let aa = 0
      Xiangq.state.gouwulist.map(item => {
        // 总价
        if (item.checked === true) {
          // console.log(item)
          aa += Number(item.price * item.limit_num)
        }
        state.gouwu.push(item)
      })

      state.dingdanlist.push({
        dingprices: aa, // 总价
        dingdan: state.dingdan, // 订单编号
        fatai: fa, // 订单抬头
        zhifu: false, // 有没有支付的状态
        gouwu: state.gouwu// 商品
      })
      Xiangq.state.gouwulist = []
      state.gouwu = []
      console.log(state.dingdanlist)
    },
    // 付款成功
    zhifucg (state, val) {
      state.dingdanlist.map((item, index) => {
        if (item.dingdan === val.dingdan) {
          item.zhifu = true
        }
      })
      console.log(state.dingdanlist)
    },
    // 点击查看详情
    xqdd (state, valId) {
      state.xqdingdan = valId.dingdan
      console.log(state.xqdingdan)
    },
    // 显示订单
    dingshow1 (state) {
      state.dingshow = false
    },
    // 显示订单
    dingshow2 (state) {
      state.dingshow = true
    },
    createLo (state, v) {
      state.dizhilist = v
    }
  },
  getters: {

  },
  modules: {
    Hello,
    Xiangq
  }
})
export default store
