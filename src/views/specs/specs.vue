<template>
  <div>
    <add-bread></add-bread>
    <el-button type="primary" plain size="small" @click="toOpen">添加</el-button>
    <v-table @edit="edit"></v-table>
    <add-info ref="vGet" :addInfo="addInfo" @cancel="cancel" ></add-info>
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
  methods:{
      toOpen(){
          this.addInfo={
              isShow:true,
              isAdd:true
          }
      },
      cancel(e){
          this.addInfo=e
      },
      edit(id){
        this.addInfo.isShow=true,
        this.addInfo.isAdd=false,
        this.$refs.vGet.lookUp(id)
      }
  },
  components:{
      vTable,
      addInfo
  }
};
</script>

<style lang="" scoped>
</style>
