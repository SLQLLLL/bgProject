<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="cateForm" :rules="rules" ref="ruleForm">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="cateForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in getCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称:"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input v-model="cateForm.catename"></el-input>
        </el-form-item>
        <el-form-item v-if="cateForm.pid!=0" label="图片:" :label-width="formLabelWidth">
          <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="cateForm.status"
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

        <el-button v-if="addInfo.isAdd" type="primary" @click="add('ruleForm')"
          >确 定</el-button
        >

        <el-button v-else type="primary" @click="update('ruleForm')">修改</el-button>
        
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addCate,cateInfo,cateUpdate } from "../../util/axios";
export default {
  data() {
    return {
      cateForm: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList: [], //文件列表
    };
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
    }),
  },
  computed: {
    ...mapGetters({
      getCateList: "cate/getCateList",
    }),
  },
  methods: {
    //关闭弹窗方法
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    //重置的方法
    reset() {
      this.cateForm = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
    },
    //文件上传的限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择1个文件，本次选择了${files.length}个文件，共选择了${
          files.length + files.length
        } 个文件`
      );
    },
    //当文件改变时，触发的函数方法
    onChange(file) {
      this.imgUrl = file.raw;
    },
    //预览时的删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //方法预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
    }),
    //封装添加分类的方法
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.cateForm.img = this.imgUrl;
          let file = new FormData();
          for(let i in  this.cateForm){
              file.append(i,this.cateForm[i])
          }
        //   file.append('img',this.imgUrl)
          addCate(file).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getCateListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    //封装获取一条数据的方法
    lookUp(id){
        cateInfo({id}).then(res=>{
            if(res.data.code==200){
                this.cateForm = res.data.list
                this.cateForm.id=id
                //当查询数据调取接口，给fileList赋值
                this.fileList = this.cateForm.img
            ? [{ url: this.$imgUrl + this.cateForm.img }]
            : "";
            }
        })
    },
    //封装修改分类的方法
     update(formName) {
      console.log(this.cateForm.id,"vvv"); 
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.cateForm.img = this.imgUrl;
          let file = new FormData();
          for(let i in  this.cateForm){
              file.append(i,this.cateForm[i])
          }
        //   file.append('img',this.imgUrl)
          cateUpdate(file).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getCateListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
