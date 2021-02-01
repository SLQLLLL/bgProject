<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="menu" :rules="rules" ref="ruleForm">
        <el-form-item
          label="菜单名称:"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="menu.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="上级菜单:"
          :label-width="formLabelWidth"
          prop="pid"
        >
          <el-select v-model="menu.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型:" :label-width="formLabelWidth">
          <el-radio v-model="menu.type" :label="1">目录</el-radio>
          <el-radio v-model="menu.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标:"
          :label-width="formLabelWidth"
          v-if="menu.type == 1"
        >
          <el-select v-model="menu.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址:" :label-width="formLabelWidth" v-else>
          <el-select v-model="menu.url" placeholder="请选择">
            <el-option
              v-for="item in routerList"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="menu.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value='1'
            :inactive-value='2'
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" type="primary" @click="add('ruleForm')">确 定</el-button>
        <el-button v-else type="primary" @click="update('ruleForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { routerList } from "../../router";
import { addInfo, menuInfo ,menuUpdate} from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
  
      iconList: [
        "el-icon-s-tools",
        "el-icon-goods",
        "el-icon-s-custom",
        "el-icon-menu",
      ],
      routerList: routerList,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },

  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    //封装获取一条数据方法
    oneMenu(id) {
      menuInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.menu = res.data.list;
          this.menu.id = id;
        }
      });
    },
    //封装重置事件
    reset() {
      this.menu = {
        pid: "0", //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: "1", //类型1目录2菜单
        url: "", //菜单地址
        status: "1", //状态1正常2禁用
      };
    },
    //封装关闭弹窗
    cancel() {
      this.$emit("cancel", { 
        isShow: false, isAdd: this.addInfo.isAdd });
      this.reset();
    },
    //封装修改菜单事件
    update(formName) {
      this.$refs[formName].validate((vaild) => {
        if (vaild) {
          menuUpdate(this.menu).then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              this.cancel()
              this.getMenuList()
            }
            else{
              this.$message.error(res.data.mag)
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //封装添加菜单事件
    add(formName) {
      this.$refs[formName].validate((vaild) => {
        if (vaild) {
          addInfo(this.menu).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
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
  props: ["addInfo"],
};
</script>

<style lang="" scoped>
</style>
