<template>
  <div class="xq_box">
   <ul>
     <li v-for="(item,index) in datelist" :key="index">
         <div class="leftnav" >
           <p v-for="(item2,index2) in item.ali_images" :key="index2">
             <img @click="nav_img(item2)" :src="item2" alt="">
           </p>
         </div>
         <img :src="item.ali_image" alt="">
         <div class="rightnav">
           <div class="right_header">
            <p>{{item.title}}</p>
            <p>
              <span>{{item.sub_title}}</span>
              <span>￥{{item.price}}</span>
            </p>
           </div>
           <div class="right_tips">
              <div>
                <span>颜色</span>
                 <p v-for="(item3,index3) in item.sku_list" :key="index3">
                      <!-- <span @click="qieimg(index2,item2.image)">{{item2.color}}</span> -->
                      <router-link :to="'/xiangqing/'+item3.id" tag="span">{{item3.color}}</router-link>
                 </p>
                <!-- <span>{{item.sku_list[0].color}}</span> -->
              </div>
              <span>数目</span>
              <el-button icon="el-icon-minus" circle @click="jiannum()"></el-button>
              <span>{{nums}}</span>
              <el-button icon="el-icon-plus" circle @click="jianum()"></el-button>
           </div>
            <el-button type="primary" size="mini"  @click="jia(item,index)">加入购物车</el-button>
            <!-- <el-button size="mini" @click="jiesuanm">现在购买</el-button> -->
          <router-link to="/jisuan" > <el-button size="mini"  @click="jia(item,index)">现在购买</el-button></router-link>
         </div>
     </li>
   </ul>

  </div>
</template>

<script>
export default {

  computed: {
    show () {
      return this.$store.state.Xiangq.show
    }
  },
  data () {
    return {
      ss: '',
      datelist: [],
      nums: 1
    }
  },
  created () {
    this.shuju()
  },
  methods: {
    shuju () {
      this.ss = this.$route.params.xqingId
      console.log(this.ss)
      this.axios.get('../static/goods_detail.json').then(res => {
        console.log(res.data)
        this.datelist = res.data.filter(item => {
        // console.log(item.sku_id)
          return String(item.sku_id) === this.ss
        })
        console.log(this.datelist)
      })
    },
    // 加
    jia (item, index) {
      console.log(item)
      this.$store.commit('jia', item)
    },
    jianum () {
      this.nums++
      if (this.nums >= 5) {
        this.$store.commit('show2')
        this.nums = 5
      }
    },
    // 减
    jian (item, index) {
      this.$store.commit('jian', index)
    },
    jiannum () {
      this.nums--
      if (this.nums <= 1) {
        this.nums = 1
      }
    },
    // 警告框
    tips () {
      this.$store.commit('show3')
    },
    nav_img (item) {
      this.datelist[0].ali_image = item
    }
  },
  // 监听
  watch: {
    $route () {
      this.shuju()
    }
  }
}
</script>

<style scoped lang="scss">
.xq_box{
  width: 1200px;
  height: 550px;
  // border: 1px solid;
  margin: 0 auto;
  background: white;
  ul{
  li{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .leftnav{
       p{
         img{
           width: 80px;
         }
       }
    }
    &>img{
      width: 400px;
      height: 400px;
    }
    .rightnav{
      height: 500px;
      width: 550px;
      .right_header{
        p{
          font-size: 30px;
          display: flex;
          justify-content: space-between;
          span{
            font-size:20px;
            color: #BDC3C3;
          }
          span:nth-child(2){
            color:red;
          }
        }
      }
      .right_tips{
        height: 180px;
        border-top:1px solid #BDC3C3;
        border-bottom:1px solid #BDC3C3;
        margin-bottom:30px;
        &>div{
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
}

}

</style>
