<template>
  <div class="jisuan">
    <div class="shou ">
      <p>收货地址</p>
      <ul>
        <li v-for="(item,index) in dd_dizhi" :key='index' @click="js_moren(index)">
          <div>
              <h5>{{item.dd_name}}</h5>
              <el-button  icon="el-icon-check" circle v-show="item.dd_moren"></el-button>
          </div>
          <p>{{item.dd_phone}}</p>
          <p>{{item.dval}}{{item.dqu}}{{item.dxian}}</p>
          <p>{{item.dd_xq}}</p>
        </li>
        <li class="js_diz" @click="js_jiadiz">
          <p>+</p>
          <p>使用新的地址</p>
        </li>
      </ul>
    </div>
    <div class="shou">
        <p>发票信息</p>
        <div class="js_fapiao">
           <p>发票类型：电子发票</p>
           <p>发票抬头： <input type="radio" value="个人"  v-model="fa">个人  <input type="radio" value="单位" v-model="fa">单位</p>
           <p>发票内容：购买商品明细</p>
           <span>电子发票是税务局认可的有效收付款凭证，可作为售后服务凭据，电子发票打印后可以用于企业报销</span>
        </div>
    </div>
    <div class="shou2">
       <p>购物清单</p>
       <div class="js_nav">
         <p>商品名称</p>
         <p>单价</p>
         <p>数量</p>
         <p>小计</p>
       </div>
        <ol>
          <li v-for="(item,index) in gouwulist" :key="index">
            <div>
             <p><img :src="item.ali_image" alt=""></p>
              <p>{{item.title}}</p>
            </div>
            <p>{{item.price}}</p>
            <p>{{item.limit_num}}</p>
            <p>{{item.price*item.limit_num}}</p>
          </li>
        </ol>
        <div class="js_jiage">
           <p>商品总价：<span>￥{{prices}}</span></p>
           <p>运费：<span>￥0</span></p>
        </div>
        <div class="js_tijiao">
          <div>
             <p>应付金额：</p>
             <h2>￥{{prices}}</h2>
             <router-link :to="'/tijiao/'+getdingdan" tag='p'>
             <el-button type="primary" size="mini"  @click="dingdan(fa,prices2)">提交订单</el-button>
             </router-link>
             <!-- <el-button type="primary" size="mini">提交订单</el-button> -->
          </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    dd_dizhi () {
      return this.$store.state.dizhilist
    },
    // 购物车商品
    gouwulist () {
      return this.$store.state.Xiangq.gouwulist
    },
    // 总价
    prices () {
      return this.$store.getters.prices
    },
    // 订单号
    getdingdan () {
      return this.$store.state.dingdan
    }
  },
  data () {
    return {
      fa: '个人',
      prices2: 0
    }
  },
  methods: {
    js_jiadiz () {
      this.$store.commit('dd_dzjia')
    },
    // 更改默认地址
    js_moren (index) {
      this.$store.commit('js_moren', index)
    },
    // 提交生成订单号
    dingdan (fa) {
      this.prices2 = this.$store.getters.prices
      this.$store.commit('dingdan', fa, this.prices2)
      console.log(this.fa)
      console.log(this.prices2)
    }
  }
}
</script>

<style lang="scss" scoped>
.jisuan{
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  // border:1px solid;

  .shou{
    height: 100%;
    height: 300px;
    box-shadow:slategray 0 0 2px;
    background: white;
    margin-bottom:20px;
   &>p{
      height: 50px;
      background: #ECECEC;
      margin-top:0;
      box-shadow: slategray 0 0 2px;
      line-height: 50px;
      padding-left:30px;
    }
    ul{
      display: flex;
      li{
         width: 200px;
         height: 200px;
         margin-right:20px;
         padding-left:20px;
         background: rgba(0,0,0,0.01);
         box-shadow:slategray 0 0 2px;
         &>div{
            display: flex;
            justify-content: space-between;
            align-items: center;
         }
         p{
           overflow:hidden;
           white-space:nowrap;
           text-overflow:ellipsis;
         }
      }
      .js_diz{
        text-align: center;
        p:nth-child(1){
          margin-top:60px;
        }
      }
    }
    .js_fapiao{
     padding-left:30px;
     margin-top:50px;
     p{
       margin: 20px auto;
     }
     span{
       display: block;
       border-top:1px solid slategray;
       height: 50px;
       line-height: 50px;
       font-size: 15px;
       color: slategray;
     }
    }
    .js_nav{
      height: 30px;
      display: flex;
      margin-top:-15px;
      background: slategray;
      align-items: center;
      justify-content: space-around;
      p:nth-child(1){
        width: 60%;
      }
    }
  }
  .shou2{
    @extend .shou;
    height: 500px;
    ol{
      li{
        display: flex;
        justify-content: space-around;
        align-items: center;
        &>div{
          display: flex;
          align-items: center;
          width: 60%;
          p:nth-child(1){
            width: 100px;
            height: 100px;
            margin-right:30px;
            // border: 1px solid slategray;
            box-shadow: slategray 0 0 2px;
            img{
              width: 100px;
            }
          }

        }
      }
    }
    .js_jiage{
      height: 80px;
      box-shadow: slategray 0 0 2px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      p{
        width: 90%;
        text-align: right;
      }
      p:nth-child(2){
        margin-top:-10px;
      }
    }
    .js_tijiao{
      height: 80px;
     &>div{
       margin-left:70%;
       width: 300px;
       display: flex;
       align-items: center;
        justify-content: space-around;
        h2{
          color: red;
        }
     }

    }
  }
  &>.el-button{
    background: #ECECEC;
  }
}

</style>
