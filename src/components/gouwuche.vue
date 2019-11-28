<template>
  <div class="gouwuche">
    <h2>购物清单</h2>
   <ul>
     <li v-for="(item,index) in goulist" :key='index'>
       <input type="checkbox" v-model="item.checked" @click="fuxuan(item)">
       <div class="gouwu_con">
         <p>
           <img :src="item.ali_image" alt="">
          </p>
          <div>
             <h5>{{item.title}}</h5>
             <span>{{item.spec_json.show_name}}</span>
          </div>
       </div>
       <p>{{item.price}}</p>
       <div>
          <el-button icon="el-icon-minus" circle @click="jian(item,index)"></el-button>
          <span>{{item.limit_num}}</span>
          <el-button icon="el-icon-plus" circle @click="jia(item,index)"></el-button>
       </div>
       <h5>￥{{item.price*item.limit_num}}</h5>
        <el-button icon="el-icon-close" circle @click="gouwu_dele(index)"></el-button>
     </li>
   </ul>
    <div class="gouwu_buttom">
       <div>
          <input type="checkbox" v-model="quan">全选
          <span>删除选中的商品</span>
       </div>
       <div class="gou_right">
         <div>
           <p>已选0件商品</p>
           <span>共计{{nums}}件商品</span>
         </div>
         <div>
           <p>应付总额：￥{{prices}}</p>
           <span>应付总额不含运费</span>
         </div>
          <el-button disabled >现在结算</el-button>
          <router-link to="/jisuan" tag="el-button"  v-show="prices>0">现在结算</router-link>
          <!-- <el-button type="primary" v-show="prices>0" >现在结算</el-button> -->
       </div>
     </div>
  </div>
</template>

<script>
export default {
  computed: {
    goulist () {
      return this.$store.state.Xiangq.gouwulist
    },
    // 总数
    nums () {
      return this.$store.getters.nums
    },
    // 总价
    prices () {
      return this.$store.getters.prices
    },
    // 全选
    quan () {
      return this.$store.state.Xiangq.quan
    }
  },
  methods: {
    // 加
    jia (item, index) {
      console.log(item)
      this.$store.commit('jia', item)
      this.goulist[index].limit_num++
      if (this.goulist[index].limit_num >= 5) {
        this.$store.commit('show2')
        this.goulist[index].limit_num = 5
      }
    },
    // 减
    jian (item, index) {
      // this.$store.commit('jian', index)
      this.goulist[index].limit_num--
      this.goulist[index].num--
      if (this.goulist[index].limit_num <= 1) {
        this.goulist[index].limit_num = 1
      }
      console.log(this.goulist)
    },
    // 删除
    gouwu_dele (index) {
      this.$store.commit('dele', index)
    },
    fuxuan (item) {
      this.$store.commit('fuxuan', item)
    }
  },
  watch: {

  }
}
</script>

<style scoped lang='scss'>
.gouwuche{
  width: 1200px;
  height: 500px;
  margin: 0 auto;
  background: white;
  h2{
   height: 60px;
   line-height: 60px;
   box-shadow: #efefef 2px 2px 2px 2px;
   background: #BDC3C3;
  }
  ul{
    li{
      display: flex;
      justify-content: space-around;
      align-items: center;
      .gouwu_con{
        display: flex;
        width: 550px;
        height: 150px;
        // border: 1px solid;
        justify-content: left;
        p{
          width: 120px;
          height: 120px;
          border: 1px solid #efefef;
           img{
              width: 120px;
            }
        }
        &>div{
          margin-left:30px;
          span{
            color:slategray;
          }
        }

      }
    }
  }
  .gouwu_buttom{
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: slategray 0px 0px 2px 0px;
    .gou_right{
      display: flex;
      align-items: center;
      width: 400px;
      justify-content: left;
      position: relative;
      &>div{
        width: 140px;
        text-align: center;
      }
      .el-button{
        position: absolute;
        top:20px;
        right:10px;
      }
    }
  }
}
</style>
