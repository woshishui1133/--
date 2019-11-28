<template>
  <div class="tijiao" >
    <div v-for="(item,index) in  ddlist" :key="index">
     <div class="ti_zhifu" >
       <p>支付订单</p>
       <div class="ti_con">
          <h1>提交订单成功</h1>
          <p>请在<span>24小时内</span>完成支付，超时订单将自动取消</p>
          <p>我们将在您完成支付之后的72小时内发货</p>
       </div>
       <div class="ti_buttom">
         <div>
           <p>应付金额：<span>￥{{item.dingprices}}</span></p>
           <el-button type="primary" @click="ti_zhifu(item)">现在支付</el-button>
         </div>
       </div>
     </div>
     <div class="ti_ding">
       <h5>订单编号</h5>
       <p>{{item.dingdan}}</p>
     </div>
     <div class="ti_shouhuo">
       <h5>收货信息</h5>
       <ul>
         <li>
           <p>姓名：{{ti_dizhi.dd_name}}</p>
           <p>联系电话：{{ti_dizhi.dd_phone}}</p>
           <p>详细地址：{{ti_dizhi.dval}}{{ti_dizhi.dqu}}{{ti_dizhi.dxian}}{{ti_dizhi.dd_xq}}</p>
         </li>
       </ul>
     </div>
     <div class="ti_fapiao">
       <h5>发票信息</h5>
       <p>发票类型：电子发票</p>
        <p>发票抬头：{{item.fatai}}</p>
        <p>发票内容：购买商品明细</p>
     </div>
     <div class="ti_shangp">
       <div class="shangnav">
         <h6>商品信息</h6>
         <h6>单价</h6>
         <h6>数量</h6>
         <h6>小计</h6>
       </div>
       <ul>
         <li v-for='(item2,index2) in item.gouwu' :key="index2">
           <p>{{item2.title}}（{{item2.spec_json.show_name}}）</p>
           <p>{{item2.price}}</p>
           <p>{{item2.num}}</p>
           <p>{{item2.num*item2.price}}</p>
         </li>
       </ul>
       <div class="shang_zong">
         <div>
           <h4>商品总计：￥<span>{{item.dingprices}}</span></h4>
           <p>运费：￥0</p>
         </div>
       </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  // 计算属性
  computed: {
    // 总价
    prices () {
      return this.$store.getters.prices
    },
    // 地址信息
    ti_dizhi () {
      return this.$store.state.ti_dizhi
    },
    // 订单数据
    dingdanlist () {
      return this.$store.state.dingdanlist
    },
    // 过滤订单号相同的
    ddlist () {
      return this.$store.state.dingdanlist.filter(item => {
        if (Number(item.dingdan) === Number(this.$store.state.xqdingdan)) {
          console.log(item)
          return item
        }
      })
    }

  },
  data () {
    return {

    }
  },
  methods: {
    ti_zhifu (item) {
      alert('成功支付')
      this.$store.commit('zhifucg', item)
      // localStorage.path=""
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.tijiao{
  width: 1200px;
  height: 1200px;
  // border: 1px solid;
  margin: 0 auto;
  .ti_zhifu{
    width: 100%;
    height: 300px;
    box-shadow: slategray 0 0 2px;
    // box-sizing:border-box;
    &>p{
      height: 50px;
      background: #ECECEC;
      line-height: 50px;
      padding-left:20px;
      box-shadow:slategray 0 0 2px;
    }
    .ti_con{
      background: white;
      height: 190px;
      text-align: center;
      box-shadow: slategray 0 0 2px;
      h1{
        font-size: 40px;
        font-weight: 500;
        padding-top: 30px;
      }
      p{
        font-size: 13px;
        color: slategray;
        span{
          color: red;
          font-weight: 900;
        }
      }
    }
    .ti_buttom{
      &>div{
         height: 58px;
        display: flex;
        align-items: center;
         float:right;
         margin-right:20px;
      }
      .el-button{
        font-size: 25px;
        line-height: 25px;
      }
    }
  }
  .ti_ding{
    margin-top:50px;
     height: 120px;
     border-top:1px solid silver;
     box-shadow: silver 0 2px 0;
     padding-left:50px;
     display: flex;
     flex-direction: column;
     justify-content: space-evenly;
     p{
       color:slategray;
       font-size: 14px;
     }
  }
  .ti_shouhuo{
    height: 180px;
    padding-left:50px;
    border-bottom:1px solid silver;
    display: flex;
     flex-direction: column;
     justify-content: space-evenly;
     ul{
       margin-top:-15px;
       li{
         p{
           margin:5px;
           color:slategray;
           font-size: 14px;
         }
       }
     }
  }
  .ti_fapiao{
    height: 180px;
    border-bottom: 1px solid silver;
    padding-left:50px;
    h5{
      padding: 25px 0;
    }
    p{
      margin: 5px 0;
      color:slategray;
      font-size: 14px;
    }
  }
  .ti_shangp{
    .shangnav{
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid silver;
      h6:nth-child(1){
        width: 60%;
      }
    }
    ul{
      li{
        height: 50px;
        display: flex;
        border-bottom: 1px solid silver;
        align-items: center;
        justify-content: space-around;
        p:nth-child(1){
          width: 60%;
        }
      }
    }
    .shang_zong{
      height: 70px;
      div{
        margin-top:30px;
        float:right;
        margin-right:50px;
        p{
          margin: 10px 0;
          float: right;
        }
      }
    }
  }
}
</style>
