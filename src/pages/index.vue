<template>
  <div>
    <el-container>
      <el-header> <div class="title">
        <h1>后台管理系统</h1>
        </div>
         <div class="userInfo">
          <span class="username">你好, {{getUserInfo.username}}</span>
          <el-button @click="logout" type='danger' size='mini'>退出</el-button>
        </div>  </el-header>
      <el-container>
        <el-aside width="200px">
        <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from '../components/vNav';
import {mapGetters,mapActions} from 'vuex'
export default {
  
  data() {
    return {
      defaultActive:'/home'
    };
  },
  mounted(){
     console.log( ...mapGetters)
  },
   methods: {
       ...mapActions(['changeUserInfoAction']),
    //退出事件
    logout(){
      //修改getUserInfo它的仓库状态然后跳转到登录
      this.changeUserInfoAction(null)
      this.$router.push('/login')
    }
  },
   computed:{
    
    ...mapGetters(['getUserInfo'])
  },
  components:{
    vNav
  },
   
  mounted() {
    
  }, 
    
  
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl'
.el-header
  background-color $twobgColor
  text-align center
  
.el-aside
  background-color $threebgColor
  height 100vh
  .tac
    background-color $threebgColor
.el-main
  height 100vh
.title
  float left
.userInfo
  float right
  .username
    padding-right 10px
    line-height 57px
    font-size 16px
    vertical-align middle
</style>
