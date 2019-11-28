<template>
  <div id="app">
     <div class="header">
       <img src="@/assets/666.png" alt="">
       <ul>
         <li @mouseover="hove1(index)" @mouseout="hove3(index)"  v-for="(item,index) in biaoti" :key="index" :class="{col:item.hove===true}">{{item.biao}}</li>
       </ul>
       <div>
         <router-link to="/denglu" tag="p" ><img  @mouseover="denglu1" @mouseout="denglu2" src="@/assets/xxi.png" alt="" ></router-link>
         <i class="el-icon-shopping-cart-full"  @mouseover="gou_biao" @mouseout="gou_biao2"></i>
           <span>{{nums}}</span>
       </div>
       <div class="zuc" v-show="denglushow"  @mouseover="denglu1" @mouseout="denglu2">
          <img src="@/assets/xxi.png" alt="" >
          <router-link to="/denglu" tag='p'> <el-button @click="dingshow">我的订单</el-button></router-link>
          <router-link to="/denglu" tag='p'> <el-button @click="dingshow2">我的地址</el-button></router-link>
       </div>
     </div>
     <div class="gouwu" v-show="gou_show"  @mouseover="gou_biao"  @mouseout="gou_biao2">
         <div class="gou_kong" v-show="gouwu2.length<=0">
           <i class="el-icon-shopping-cart-full"></i>
           <h3>购物车为空</h3>
           <span>您还没有选购任何商品，请到商城去选购</span>
         </div>
         <ul v-show="gouwu2.length>=0">
            <li v-for="(item,index) in gouwu2" :key="index">
               <div class="gou_top">
                  <p>
                      <img :src="item.ali_image" alt="" class="gou_img">
                  </p>
                  <div>
                    <h3 :title="item.title">{{item.title}}</h3>
                    <p>{{item.spec_json.show_name}}</p>
                    <span>￥{{item.price}}x{{item.limit_num}}</span>
                  </div>
               </div>
            </li>
            <div class="gou_bottom" v-show="gouwu2.length>0">
                 <div>
                   <p>共{{nums}}件商品</p>
                  <h2>合计<span>￥{{prices}}</span></h2>
                 </div>
                 <router-link to="/gouwuche" tag="el-button"  size="mini">去购物车</router-link>
              </div>
         </ul>
     </div>
     <div class="nav">
        <ul>
          <li>首页</li>
          <li>•</li>
          <li>手机</li>
          <li>•</li>
          <li>“足迹系列”手感膜</li>
          <li>•</li>
          <router-link to='/' tag="li">官方配件</router-link>
           <li>•</li>
          <li>周边产品</li>
          <li>•</li>
          <li>第三方配件</li>
          <li>•</li>
          <li>全部商品</li>
          <li>•</li>
          <li>服务</li>
        </ul>
        <ol>
          <li>综合排序</li>
          <li>•</li>
          <li>销量排序</li>
          <li>•</li>
          <li>价格低到高</li>
          <li>•</li>
          <li>价格高到低</li>
        </ol>
     </div>
     <div class="jiang" v-show="show">
       <div>
         <div>
           <span>提示</span>
           <button class="butt" @click="tips">X</button>
        </div>
        <p>商品已达到最大购买数量,无法继续添加</p>
        <p>
          <el-button type="primary" size='mini' class="but" @click="tips">确定</el-button>
         </p>
     </div>
   </div>
   <div class="dd" v-show="dd_show">
      <div class="ddcon">
        <div class="dd_top">
          <span>管理收货地址</span>
          <span @click="dd_show2">X</span>
        </div>
        <div class="dd_xin">
          <input type="text" placeholder="收货人姓名" v-model="dd_dizhi.dd_name">
          <input type="text" placeholder="手机号" v-model="dd_dizhi.dd_phone">
          <input type="text" placeholder="区号（可选）" v-model="dd_dizhi.dd_quphone">
          <input type="text" placeholder="固定电话（可选）" v-model="dd_dizhi.dd_guphone">
        </div>
        <div class="dd_diqu">
          <select @change="dd_sheng(dd_dizhi.dval)" v-model="dd_dizhi.dval" >
              <option disabled value="">请选择省</option>
              <option v-for="(item,index) in dzxinxi" :key='index' :v-model="item.area_name">{{item.area_name}}</option>
          </select>
          <select @change="dd_qu(dd_dizhi.dqu)"   v-model="dd_dizhi.dqu">
              <option disabled value="">请选择市县</option>
            <option v-for="(item,index) in dd_shiji" :key="index" :v-model="item.area_name">{{item.area_name}}</option>
          </select>
          <select v-model="dd_dizhi.dxian">
              <option disabled value="">请选择区</option>
            <option v-for="(item,index) in dd_diqu" :key="index" :model="item.area_name">{{item.area_name}}</option>
          </select>
        </div>
        <input type="text" class="dd_xq" v-model="dd_dizhi.dd_xq" placeholder="详细地址，如街道名称，楼层，门牌号等">
         <p><input type="checkbox" v-model="dd_dizhi.dd_moren">默认地址</p>
          <el-button type="primary" @click="dizhilist(dd_dizhi)">保存</el-button>
      </div>
   </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      gou_show: false,
      denglushow: false,
      dzxinxi: [],
      dd_shiji: [],
      dd_diqu: [],
      dxian: '',
      dd_id: 1,
      getdizhi: []
    }
  },
  computed: {
    // 头部
    biaoti () {
      return this.$store.state.Hello.biaoti
    },
    hove2 () {
      return this.$store.state.Hello.hove2
    },
    listto () {
      return this.$store.state.Hello.list
    },
    gouwu2 () {
      return this.$store.state.Xiangq.gouwulist
    },
    show () {
      return this.$store.state.Xiangq.show
    },
    // 显示隐藏地址
    dd_show () {
      return this.$store.state.dd_show
    },
    // 添加地址的对象
    dd_dizhi () {
      return this.$store.state.dd_dizhi
    },
    // 购物车总价
    prices () {
      return this.$store.getters.prices
    },
    // 购物车总数
    nums () {
      return this.$store.getters.nums
    }
  },
  created () {
    this.axios.get('../static/address.json').then(res => {
      this.dzxinxi = res.data
      console.log(this.dzxinxi)
    })
    // 地址数据
    let data = JSON.parse(localStorage.getItem('key')) || []
    this.$store.commit('createLo', data)
  },
  methods: {
    // 标题
    hove1 (index) {
      this.$store.commit('hove1', index)
    },
    hove3 (index) {
      this.$store.commit('hove3', index)
    },
    gou_biao () {
      this.gou_show = true
    },
    gou_biao2 () {
      this.gou_show = false
    },
    // 警告框
    tips () {
      this.$store.commit('show3')
    },
    // 三级联动
    dd_sheng (val) {
      console.log(val)
      this.dzxinxi.map(item => {
        if (item.area_name === val) {
          this.dd_shiji = item.city_list
        }
        // console.log(this.dd_shiji)
      })
    },
    dd_qu (val) {
      console.log(val)
      this.dd_shiji.map(item => {
        if (item.area_name === val) {
          this.dd_diqu = item.county_list
        }
        // console.log(this.dd_diqu)
      })
    },
    // 保存地址
    dizhilist (val) {
      console.log(val)
      this.$store.commit('getdizhi', val)
    },
    // 隐藏地址
    dd_show2 () {
      this.$store.commit('dd_dzyin')
    },
    // 显示订单
    dingshow () {
      this.$store.commit('dingshow1')
    },
    // 显示订单
    dingshow2 () {
      this.$store.commit('dingshow2')
    },
    denglu1 () {
      this.denglushow = true
    },
    denglu2 () {
      this.denglushow = false
    }
  },
  watch: {
    dizhilist: {
      handler: function () {
        localStorage.setItem('key', JSON.stringify(this.$store.state.dizhilist))
      },
      deep: true
    }
  }
}

</script>

<style lang='scss'>
*{
  font-size:16px;
}
#app{
   background: #ECECEC;
  //  min-height: 1200px;
  min-height: 1300px;
  position: relative;
}
ul,ol{
 list-style: none;
}
.header{
  width: 1200px;
  margin: 0 auto;
   display: flex;
   height: 150px;
   background: black;
   justify-content: space-around;
   align-items: center;
   color: white;
   position: relative;
   &>img{
     width: 50px;
     border-radius: 50%;
   }
   &>ul{
     display: flex;
     width: 840px;
     justify-content: space-around;
     color: silver;
   }
   .zuc{
      width: 230px;
      height: 200px;
      color: #000;
      background: white;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      position: absolute;
      top:90px;
      left:950px;
      border-radius: 10px;
      &>p{
        width: 100%;
        text-align: center;
        .el-button{
          width: 100%;
          text-align: center;
          padding-left:35%;
        }
      }
      &>p:nth-child(3){
        margin-top:-36px;
      }
    }
   &>div{
     width: 150px;
     display: flex;
     align-items: center;
     justify-content: space-around;
    img{
      width: 40px;
      height: 40px;
    }
    .el-icon-shopping-cart-full{
      font-size:30px;
    }
    &>p{
      span{
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 45%;
      // background: slategray;
      text-align: center;
      }
    }

   }
}
.nav{
  width: 1200px;
  margin: 0 auto;
  height: 150px;

  &>ul{
     display: flex;
     justify-content: space-around;
     height: 80px;
     line-height: 80px;
     border-bottom:1px solid;
  }
  &>ol{
    width: 50%;
    height: 150px;
    display: flex;
    justify-content: space-around;
  }
}
.col{
 color: white;
}
.gouwu{
  width: 400px;
  min-height: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: #efefef 2px 2px 2px 2px;
  position: absolute;
  top:90px;
  left:65%;
  // right:20px;
  .gou_kong{
    .el-icon-shopping-cart-full{
      font-size: 180px;
    }
    text-align: center;
  }
  &>ul{
    li{
     .gou_top{
       display: flex;
       border-bottom:1px solid #000;
        &>p{
          width: 80px;
          height: 80px;
          border: 1px solid #efefef;
           .gou_img{
             width: 80px;
          }
        }
        &>div{
          margin-left:10px;
          h3{
            width: 240px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          p{
            color: slategray;
            margin-top:-10px;
          }
          span{
            font-size: 12px;
            color: slategray;
          }
        }

      }
    }
     .gou_bottom{
        display: flex;
        justify-content: space-around;
        align-items: center;
        p{
          font-size:16px;
          color:slategray;
        }
        h2{
           span{
             color:red;
             font-size:25px;
           }
        }
      }
  }

}
.jiang{
  width: 100%;
  height: 200%;
  position: absolute;
  top:0;
  left:0;
  z-index: 3;
  background: rgba(0,0,0,0.2);
  &>div{
    width: 300px;
    height: 200px;
    // border: 1px solid;
    margin: 30% auto;
    background: white;
    .butt{
      border:none;
      border-radius: 50%;
      background: #BDC3C3;
    }
   &>div{
     display: flex;
     height: 50px;
     justify-content: space-between;
     align-items: center;
     background: #BDC3C3;
     span{
       width: 50px;
       text-align: center;
     }
   }
   p:nth-child(2){
     height: 80px;
     text-align: center;
     line-height: 80px;
    box-shadow: #BDC3C3 1px 1px 1px;
   }
   p:nth-child(3){
     margin-top:-15px;
     height: 55px;
     background: #BDC3C3;
    .but{
        float:right;
        margin-top:10px;
      }
   }

  }
}
.dd{
  width: 100%;
  height: 120%;
  background: rgba(0,0,0,0.2);
  position: absolute;
  top:0;
  left:0;
  .ddcon{
    width: 300px;
    height: 450px;
    background:white;
    margin: 20% auto;
    box-shadow:slategrey 0 0 2px;
    border-radius: 5px;
    text-align: center;
    .dd_top{
      height: 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #ECECEC;
      color: slategrey;
      box-shadow:slategrey 0 1px 0px;
    }
    .dd_xin{
      text-align: center;
      input{
        margin:10px auto;
        height: 30px;
        width: 80%;
        box-shadow: slategrey 0 0 2px;
        border:none;
      }
      input:nth-child(3){
        width: 100px;
      }
      input:nth-child(4){
        width: 140px;
      }
    }
    .dd_diqu{
      text-align: center;
      select{
        width: 40%;
        height: 35px;
        box-shadow:slategrey 0 0 2px;
        margin: 5px auto;
      }
      select:nth-child(1){
        width: 80%;
      }
    }
    .dd_xq{
      width: 80%;
      height: 35px;
      box-shadow: slategrey  0 0 2px;
    }
    p{
      width: 80%;
      height: 30px;
      text-align: left;
      margin-left:30px;
    }
    &>.el-button{
      width: 90%;
    }
  }
}

</style>
