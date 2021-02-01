<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="banner" :rules="rules" ref="ruleForm">
        <el-form-item
          label="标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="banner.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="图片:"
          :label-width="formLabelWidth" 
        >
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
            v-model="banner.status"
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
import { addBanner, bannerInfo ,bannerUpdate} from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      banner: {
        id: 0, //分类编号
        title: "", //标题
        img:"",//图片
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象，
      fileList:[],
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ]  
      },
    };
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/getBannerlist",
    }),
  },

  methods: {
    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),
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
    //封装获取一条数据方法
    oneBanner(id) {
      bannerInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.banner = res.data.list;
          this.banner.id = id;
          //当查询数据调取接口，给fileList数组赋值
          this.fileList = this.banner.img
            ? [{ url: this.$imgUrl + this.banner.img }]
            : "";
        }
      });
    },
    //封装重置事件
    reset() {
      this.banner = {
        id: "0", //上级分类编号
        title: "", //标题
        img: "", //图片
        status: "1", //状态1正常2禁用
      };
      this.fileList = []; 
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
          this.banner.img = this.imgUrl ? this.imgUrl : this.banner.img;
          bannerUpdate(this.banner).then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              this.cancel()
              this.getBannerList()
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
          this.banner.img = this.imgUrl
          console.log(this.banner);
          addBanner(this.banner).then((res) => {  
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerList();
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
