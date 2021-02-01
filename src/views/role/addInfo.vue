<template>
  <div>
    <el-dialog
      :title=" addInfo.isAdd ? '添加角色':'编辑角色'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="roleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop='rolename'>
          <el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="getMenuList"
            show-checkbox
            node-key="id"
            :props="{
              children: 'children',
              label: 'title',
            }"
            ref="tree"
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="roleForm.status"
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
        <el-button v-if="addInfo.isAdd==true" type="primary" @click="add('ruleForm')">确 定</el-button>
        <el-button v-else type="primary" @click="update('ruleForm')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRole,roleInfo,roleUpdate } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      roleForm: {
        rolename: "",
        menus: "",
        status: 1, //1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      getMenuList: "menu/getMenuList",
    }),
  },
  mounted() {
    this.getMenuListAction();
  },
  methods: {
    ...mapActions({
      getMenuListAction: "menu/getMenuListAction",
      getRoleListAction: "role/getRoleListAction",
    }),
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    //封装重置方法
    reset() {
      this.roleForm = {
        rolename: "",
        menus: "",
        status: 1, //1正常2禁用
      };
    },
    //封装获取一条数据的方法
    lookUp(id){
      console.log('qqq');
      roleInfo({id}).then(res=>{
        if(res.data.code==200){
          this.roleForm = res.data.list;
          this.roleForm.id = id;
          this.$refs.tree.setCheckedKeys(this.roleForm.menus.split(","));
        }
        else{
          this.$message.error(res.data.msg)
        }
      })
    },
    //封装添加角色的方法
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          addRole(this.roleForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleListAction();
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
    //封装修改角色的方法
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          roleUpdate(this.roleForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleListAction();
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
};
</script>

<style lang="" scoped>
</style>