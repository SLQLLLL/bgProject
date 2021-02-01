<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
      @opened="creatEditor"
    >
      <el-form :model="goodsList" :rules="rules" ref="ruleForm">
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            v-model="goodsList.first_cateid"
            placeholder="请选择"
            @change="changeCate"
          >
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
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select v-model="goodsList.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.ido"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input v-model="goodsList.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="价格"
          :label-width="formLabelWidth"
          prop="price"
        >
          <el-input v-model.number="goodsList.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          :label-width="formLabelWidth"
          prop="market_price"
        >
          <el-input
            v-model.number="goodsList.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片:" :label-width="formLabelWidth">
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
        <el-form-item
          label="商品规格"
          :label-width="formLabelWidth"
          prop="specsid"
        >
          <el-select
            v-model="goodsList.specsid"
            placeholder="请选择"
            @change="changeSpecs"
          >
            <el-option
              v-for="item in getSpecsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          prop="specsattr"
        >
          <el-select
            v-model="goodsList.specsattr"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in attArr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否新品"
          :label-width="formLabelWidth"
          
        >
          <el-radio v-model="goodsList.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsList.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item
          label="是否热卖"
          :label-width="formLabelWidth"
         
        >
          <el-radio v-model="goodsList.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsList.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsList.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
         <div id="editor"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.isAdd == true"
          type="primary"
          @click="add('ruleForm')"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addGoods, goodsInfo, goodsUpdate } from "../../util/axios";
import ED from 'wangeditor'
export default {
  data() {
    return {
      goodsList: {
        first_cateid: "", //  一级分类编号
        second_cateid: "", // 二级分类编号
        goodsname: "", //商品名称
        price: 0, //商品价格
        market_price: 0, //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      },
      editor:null,
      attArr: [], //规格属性数组
      secondCate: [], //二级分类数组
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList: [], //文件列表
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" }
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" }
        ],
        goodsname: [
          { required: true, message: "请填写商品名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2到 15 个字符", trigger: "blur" }
        ],
        price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" },
          { type:'number'}
        ],
        market_price:[
          { required: true, message: "市场价格不能为空", trigger: "blur" },
          { type:'number' }
        ],
        specsid:[
          { required: true, message: "请选择商品规格", trigger: "change" } 
        ],
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      getCateList: "cate/getCateList",
      getSpecsList: "specs/getSpecsList",
    }),
  },
  methods: {
    creatEditor(){
      this.editor = new ED('#editor'),
      this.editor.create(),
      this.editor.txt.html('')
    },
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getCountAction: "goods/getCountAction",
      changePageAction: "goods/changePageAction",
      getCateListAction: "cate/getCateListAction",
      getSpecsListAction: "specs/getSpecsListAction",
    }),
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: false,
      });
      this.reset();
    },
    //封装重置的方法
    reset() {
      this.goodsList = {
        first_cateid: "", //  一级分类编号
        second_cateid: "", // 二级分类编号
        goodsname: "", //     商品名称
        price: "", //        商品价格
        market_price: "", //  市场价格
        img: "", //       商品图片（文件）
        description: "", //  商品描述
        specsid: "", //       商品规格编号
        specsattr: "", //     商品规格属性
        isnew: 1, //        是否新品
        ishot: 1, //          是否热卖推荐
        status: "", //       状态1正常2禁用
      },
        //重置规则验证
        this.$refs["ruleForm"].resetFields();
        this.fileList=[];
    },
    //改变一级分类的方法
    changeCate() {
      console.log(this.goodsList.first_cateid);
      let index = this.getCateList.findIndex(
        (item) => this.goodsList.first_cateid == item.id
      );
      this.secondCate = this.getCateList[index].children;
      this.goodsList.second_cateid = "";
    },
    //改变商品规格的方法
    changeSpecs() {
      let index = this.getSpecsList.findIndex(
        (item) => this.goodsList.specsid == item.id
      );

      this.attArr = this.getSpecsList[index].attrs;
      this.goodsList.specsattr = "";
    },
    //封装添加商品规格的方法
    add(formName) {
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.goodsList);
          this.goodsList.description = this.editor.txt.html()
          this.goodsList.specsattr = this.goodsList.specsattr?this.goodsList.specsattr.join(','):''
          this.goodsList.img = this.imgUrl
          addGoods(this.goodsList).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getGoodsListAction();
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
    lookUp(id) {
      goodsInfo({id}).then(res => {
        if (res.data.code == 200) {
        this.goodsList.id = id
        console.log(this.goodsList,"idididid");
        this.goodsList = res.data.list;
        this.goodsList.specsattr = this.goodsList.specsattr?this.goodsList.specsattr.split(","):[]
        this.fileList = this.goodsList.img
            ? [{ url: this.$imgUrl + this.goodsList.img }]
            : "";
        // this.editor.txt.html(this.goodsList.description)
        }
      });
    },
    //封装修改属性的方法
    update(formName) {
      console.log(this.goodsList,'bbbb');
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.goodsList.description = this.editor.txt.html()
          // this.goodsList.specsattr = this.goodsList.specsattr?this.goodsList.specsattr.join(','):''
          this.goodsList.img = this.imgUrl
          
          // console.log(file,'上传的数据');
          goodsUpdate(this.goodsList).then(res => {
            console.log(res,"xiugaixiugai");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getGoodsListAction();
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
  },
  mounted() {
    this.getGoodsListAction();
    this.getCateListAction();
    this.getSpecsListAction();
  },
  props: ["addInfo"],
};
</script>

<style lang="stylus" scoped>
.inpClass
  width 65%
</style>
