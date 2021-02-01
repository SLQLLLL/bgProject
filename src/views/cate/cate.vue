<template>
  <div>
      <add-bread></add-bread>
      <el-button type='primary' plain size='small' @click="toOpen">添加</el-button>
      <v-table @edit='edit'></v-table>
      <add-info :addInfo='addInfo' @cancel='cancel'  ref='vGet'></add-info>
  </div>
</template>

<script>
import vTable from './list'
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
    vTable,
    addInfo
   
  },
  methods: {
    toOpen(){
      this.addInfo.isShow = true,
      this.addInfo.isAdd = true
    },
    cancel(e){
    this.addInfo=e;
    },
    edit(e){
      this.addInfo.isShow=true,
      this.addInfo.isAdd=false
      this.$refs.vGet.lookUp(e)
    
    }
  },
};
</script>

<style lang="" scoped>
</style>
