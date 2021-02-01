<template>
  <div>
     <add-bread></add-bread>
      <el-button type="primary" plain size='small' @click="toOpen">添加</el-button>
      <add-info ref="vDel" @cancel='cancel' :addInfo="addInfo"></add-info>
     <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vList from './list'
import addInfo from './addInfo'
export default {
  
  data() {
    return {
      addInfo:{
        isShow:false,
        isAdd:true
      }
      
    };
  },
  components:{
    vList,
    addInfo
  },
  methods: {
    toOpen(){
      this.addInfo.isShow=true
      this.addInfo.isAdd=true
    },
    cancel(e){
      this.addInfo=e
    },
    edit(e){
      this.addInfo.isShow =true
      //告诉弹框你是编辑
      this.addInfo.isAdd = false
      this.$refs.vDel.oneMenu(e)
    }
  },
};
</script>

<style lang="stylus" scoped>
.el-button
    margin-bottom 10px
</style>
