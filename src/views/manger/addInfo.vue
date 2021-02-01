<template>
  <div>
    <el-dialog
      center
      :title="addInfo.isAdd? '添加管理员':'编辑管理员'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
    >
      <el-form :model="mangerForm" ref="ruleForm" :rules="rules">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="mangerForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="mangerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="mangerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="mangerForm.status"
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
        <el-button v-if="addInfo.isAdd" type="primary" @click="add('ruleForm')">确 定</el-button>
        <el-button v-else type="primary" @click="update('ruleForm')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addManger,mangerInfo ,mangerUpdate} from "../../util/axios";
export default {
  data() {
    return {
      mangerForm: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      },

      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
    getRoleListAction: "role/getRoleListAction",
    getMangerListAction: "manger/getMangerListAction",
    getCountNum: "manger/getMangerCountAction",
    }),
    //封装取消事件
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset()
    },
    //封装重置事件
    reset() {
      this.mangerForm = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
    },
    //封装添加事件
    add(formName) {
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取添加接口
          addManger(this.mangerForm).then((res) => {
            if (res.data.code == 200) {
              console.log(res, "哈哈哈");
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getMangerListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getCountNum();
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
    //封装获取一条信息
    lookUp(id){
        mangerInfo( {uid:id} ).then(res=>{
            if(res.data.code==200){
                this.mangerForm = res.data.list,
                this.mangerForm.uid=id
            }else{
                this.$message.error(res.data.msg)
            }
        })
    },
    //封装更新接口
     update(formName) {
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取添加接口
          mangerUpdate(this.mangerForm).then((res) => {
            if (res.data.code == 200) {
              console.log(res, "哈哈哈");
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getMangerListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getCountNum();
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
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList",
    }),
  },
  mounted() {
    this.getRoleListAction()
  },
};
</script>

<style lang="" scoped>
</style>
