<template>
  <div class="denglu">
    <div class="leftnav">
      <p><img src="../assets/666.png" alt=""></p>
        <span class="el-button" @click="ding">我的订单</span>
        <span class="el-button" @click="ding2">收货地址</span>
        <!-- @mouseover="ding3" @mouseout="ding4" -->
    </div>
    <div class="rightnav"  v-show="!dingshow">
       <div class="right_top">
         <h2>我的订单</h2>
          <select :v-model="txt">
            <option v-for="(item,index) in txtlist" :key="index" :v-model="item">{{item}}</option>
          </select>
          <select :v-model="quan">
            <option value="全选">全选</option>
            <option value="已选">已选</option>
            <option value="未选">未选</option>
          </select>
       </div>
       <ol>
         <li v-for="(item,index) in dingdan" :key="index">
           <div>
              <p>{{new Date().toLocaleDateString()}}</p>
              <p>订单号：<span>{{item.dingdan}}</span></p>
              <p>单价</p>
              <p>数目</p>
              <p>商品操作</p>
              <div class="conright">
                 <p>应付总额</p>
                 <router-link :to="'/tijiao/'+item.dingdan" tag="div"><button @click='xqddh(item)'>查看详情>></button></router-link>
                 <!-- <p>查看详情</p> -->
              </div>
           </div>
           <div>
              <div class="nav_con" v-for="(item2,index2) in item.gouwu" :key="index2">
                <p> <img :src="item2.ali_image" alt=""></p>
                <p>{{item2.title}}</p>
                <p>￥{{item2.price}}</p>
                <p>{{item2.num}}</p>
              </div>
           </div>
            <div class="conright2">
                <p>{{item.dingprices}}</p>
                <router-link :to="'/tijiao/'+item.dingdan" v-show="!item.zhifu" tag="el-button">现在付款</router-link>
                <p v-show="item.zhifu">已完成</p>
                <!-- <el-button type="primary" size='mini'>现在付款</el-button> -->
              </div>
         </li>
       </ol>
    </div>
    <div class="rightnav" v-show="dingshow">
       <div class="right_top">
         <h2>收货信息</h2>
         <button class="dizhi" @click="dd_dizhi">+添加新地址</button>
       </div>
       <ul>
         <li class="dz" v-for="(item,index) in dizhilist" :key="index">
          <p :title="item.dd_name">{{item.dd_name}}</p>
          <p :title="item.dval+item.dqu+item.dxian+item.dd_xq">{{item.dval}} {{item.dqu}} {{item.dxian}} {{item.dd_xq}}</p>
          <p :title="item.dd_phone">{{item.dd_phone}}</p>
          <p v-show="item. dd_moren" >默认地址</p>
          <div>
            <el-button  icon="el-icon-edit" circle @click='gaidizhi(item,index)'></el-button>
            <el-button icon="el-icon-close" circle @click="dizhidele(index)"></el-button>
          </div>
         </li>
       </ul>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      txt: '最近三个月',
      txtlist: ['最近三月', '最近一周'],
      quan: '全选'
      // dingshow: false
    }
  },
  computed: {
    // 地址
    dizhilist () {
      return this.$store.state.dizhilist
    },
    // 结算提交的订单
    dingdan () {
      return this.$store.state.dingdanlist
    },
    // 订单地址的判断
    dingshow () {
      return this.$store.state.dingshow
    }
  },
  // created () {
  //   // 地址数据
  //   let data = JSON.parse(localStorage.getItem('key')) || []
  //   this.$store.commit('createLo', data)
  // },
  methods: {
    // 显示订单
    ding () {
      // this.dingshow = false
      this.$store.commit('dingshow1')
    },
    // 显示地址
    ding2 () {
      // this.dingshow = true
      this.$store.commit('dingshow2')
    },

    // 添加地址
    dd_dizhi () {
      this.$store.commit('dd_dzjia')
    },
    // 修改地址
    gaidizhi (item, index) {
      this.$store.commit('gaidizhi', item, index)
    },
    // 删除地址
    dizhidele (index) {
      this.$store.commit('dizhidele', index)
    },
    // 点击详情信息跳转和传订单号
    xqddh (itemId) {
      console.log(itemId)
      this.$store.commit('xqdd', itemId)
    }
  }
  // watch: {
  //   dizhilist: {
  //     handler: function () {
  //       localStorage.setItem('key', JSON.stringify(this.$store.state.dizhilist))
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.denglu{
  width: 1200px;
  height: 450px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  .leftnav{
    width: 300px;
    height: 400px;
    box-shadow:slategray 0px 0px 2px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: white;
    .el-button{
      width: 100%;
      margin-left:0px;
    }
    .el-button:hover{
      background:#95b1f1;
      color:white;
    }

  }
  .rightnav{
    width: 800px;
    height: 400px;
    // border: 1px solid;
    // display: none;
    .right_top{
      display: flex;
      align-items: center;
      height: 40px;
      justify-content: space-around;
      box-shadow:slategray 0 0 2px;
      background: snow;
      border-radius: 5px;
      h2{
        width: 70%;
      }
      .dizhi{
        border:none;
        width: 120px;
        height: 30px;
        background: silver;
        color: white;
        border-radius: 5px;
        box-shadow: silver 0 0 2px;
      }
    }
    ul{
      li{
        display: flex;
        justify-content: space-around;
        p{
         width: 15%;
         height: 20px;
        //  border: 1px solid;
         overflow:hidden;
         white-space:nowrap;
         text-overflow:ellipsis;
        }
        p:nth-child(2){
          width: 30%;
        }
      }
    }
    ol{
      width: 100%;
      margin-left: -40px;
      li{
        width: 100%;
        background: white;
        box-shadow: slategray 0 0 2px;
        display: flex;
        flex-wrap: wrap;
        &>div:nth-child(1){
          width: 100%;
          height: 40px;
          background: slategrey;
          display: flex;
          align-items: center;
          justify-content: space-around;
          p{
             font-size:10px;
          }
          p:nth-child(2){
            span{
              font: size 13px;
              color: aqua;
            }
          }
        }
        &>div:nth-child(2){
          width: 72%;
        }
        .nav_con{
          display: flex;
          justify-content: space-around;
          align-items: center;
          &>p:nth-child(1){
            width: 100px;
            height: 100px;
            box-shadow: slategray 0 0 2px;
            img{
              width: 100px;
            }
          }
          p:nth-child(2){
            width: 230px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .conright{
            width: 200px;
            border-left:1px solid silver;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .conright2{
            @extend .conright;
          }
      }
    }
  }
}
</style>
