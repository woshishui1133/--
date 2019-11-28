<template>
  <div>

     <div class="con">
       <ul>
         <li v-for="(item,index) in listto" :key="index">
            <img class="zhanimg" :src="item.sku_info[0].ali_image" alt="">
             <p>{{item.name}}</p>
             <p>{{item.name_title}}</p>
             <div class="yas" >
               <p v-for="(item2,index2) in item.sku_info" :key="index2">
                 <span @click="haunimg(index,item2.ali_image,index2)">{{item2.spec_json.show_name}}</span>
               </p>
             </div>
             <div  class='ass'>
              <router-link :to="'/xiangqing/' + item.sku_info[0].sku_id" tag="el-button" size="mini">查看详情</router-link>
              <el-button type="primary" size="mini" @click="jia(item.sku_info[indexs],index)">加入购物车</el-button>
            </div>
           </li>
       </ul>
     </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    listto () {
      return this.$store.state.Hello.list
    },
    indexs () {
      return this.$store.state.Hello.indexs
    }
  },
  data () {
    return {

    }
  },
  created () {
    this.axios.get('../static/goods_list.json').then(res => {
      // console.log(res)
      this.$store.state.Hello.list = res.data
      console.log(res.data)
    })
  },
  methods: {
    // 点击颜色切换图片
    haunimg (index2, val2, index) {
      this.$store.commit('haunimg', {index2: index2, val2: val2, index: index})
    },
    jia (item) {
      console.log(item)
      this.$store.commit('jia', item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.con{
  height: 300px;
  &>ul{
    height: 300px;
    width: 1200px;
    display: flex;
    justify-content: left;
    background: white;
    margin: 0 auto;
    li{
      text-align: center;
      height: 300px;
      font-size:10px;
      width: 360px;
      border-right: 1px solid #efefef;
      .title{
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
      }
      .price{
        color: red;
      }
      .zhanimg{
      width: 100px;
      }
      .yas{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .ass{
        display: none;
      }
      .imgcon{
        height: 120px;
      }
    }
    li:hover{
      .ass{
       display: block;
      }
      background: #efefef;
    }
  }
}

</style>
