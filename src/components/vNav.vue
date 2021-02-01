<template>
  <div>
       <el-row class="tac">
            <el-col :span="24">
              <el-menu
                :default-active='defaultActive'
                background-color="#3D5F82"
                text-color="#fff"
                active-text-color="#ffd04b"
                unique-opened
                router
              >
                <el-menu-item index="/home">
                  <i class="el-icon-menu"></i>
                  <span slot="title">首页 </span>
                </el-menu-item>
                <el-submenu v-for="item in getUserInfo.menus" :key='item.id' :index="item.id.toString()">
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span> {{item.title}} </span>
                  </template>
                    <el-menu-item v-for="list in item.children" :key="list.id" :index="list.url">{{list.title}}</el-menu-item>
                    
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
  </div>
</template>

<script>
import{mapGetters} from"vuex"
export default {
  data() {
    return {
        defaultActive:'/home',
      
    };
  },
  mounted() {
      this.defaultActive=this.$route.path
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  }
};
</script>

<style lang="" scoped>
</style>
