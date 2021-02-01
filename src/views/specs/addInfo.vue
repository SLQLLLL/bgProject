<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="specsList" :rules="rules" ref="ruleForm">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="specsList.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in attArr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inpClass"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index === 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button @click="delAttr(item)" v-else type="danger"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsList.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd == true" type="primary" @click="add('ruleForm')">确 定</el-button>
        
        <el-button v-else type="primary" @click="update('ruleForm')"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {addSpecs,specsInfo,specsUpdate} from '../../util/axios'
export default {
  data() {
    return {
      attArr: [
        {
          value: "",
        },
      ],
      specsList: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2到 15 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
      ...mapActions({
          getSpecsListAction:"specs/getSpecsListAction",
          getCountAction:"specs/getCountAction",
          changePageAction:"specs/changePageAction"
      }),
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: false,
      });
      this.reset()
    },
    //封装重置的方法
    reset(){
        this.specsList = {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1 //1是正常2禁用
      };
      //重置规则验证
      this.$refs["ruleForm"].resetFields();
      this.attArr = [
        {
          value: ""
        }
      ];
    },
    //封装一个动态添加表单项
    addAttr() {
        console.log('sss');
      //最多只能添加6次
      if (this.attArr.length <= 6) {
        //给attrArr 动态添加数据
        this.attArr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6个输入框");
      }
    },
    //删除动态表单项
    delAttr(item) {
      var index = this.attArr.indexOf(item);
      if (index !== -1) {
        this.attArr.splice(index, 1);
      }
    },
    //封装添加商品规格的方法
     add(formName) {
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate(valid => {
        if (valid) {
          //调取添加接口
          /* 
          attrArr = [{value:'111'},{value:'222'},{value:'333'}]
          先生成新数组，然后转化成字符串
          attrs = '11,222,333'
          */
          this.specsList.attrs = this.attArr.map(item => item.value).join(",");
          console.log(this.specsList, "规则对象");
          addSpecs(this.specsList).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getSpecsListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //封装获取一条商品规格数据的方法
    lookUp(id){
      specsInfo({id}).then(res=>{
        console.log(res);
        if(res.data.code==200){
          this.specsList = res.data.list[0]
          this.specsList.id = id;
          //循环数组取出数据，并设置到input表单中
          this.specsList.attrs.map((item,index)=>{
            if(index==0){
              this.attArr[0].value = item
            }
            else{
              this.attArr.push({value:item})
            }
          })
        }
      })
    },
    //封装修改属性的方法
    update(formName) {
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate(valid => {
        if (valid) {
          //调取添加接口
          /* 
          attrArr = [{value:'111'},{value:'222'},{value:'333'}]
          先生成新数组，然后转化成字符串
          attrs = '11,222,333'
          */
          this.specsList.attrs = this.attArr.map(item => item.value).join(",");
          console.log(this.specsList, "规则对象");
          specsUpdate(this.specsList).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getSpecsListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getCountAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }, 
  },
  mounted() {
      this.getSpecsListAction()
  },
  props: ["addInfo"],
};
</script>

<style lang="stylus" scoped>
    .inpClass
     width 65%
</style>
