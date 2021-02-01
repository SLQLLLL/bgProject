<template>
  <div class="login">
    <h1>小U商城后台管理系统</h1>
    <el-form
      :model="loginList"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginList.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginList.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mangerLogin} from '../util/axios'
export default {
  data() {
    return {
      loginList: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 3, max: 25, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          mangerLogin(this.loginList).then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              this.changeUserInfoAction(res.data.list)
              // sessionStorage.setItem('loginInfo',JSON.stringify(res.data.list));
              this.$router.push('/home')
            }
            else {
          this.$message.error(res.data.msg)
        }
          })
        } 
        else{
          console.log('error');
          return false
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl'

h1
  text-align center
  padding-top 50px
.login
  width 100vw
  height 100vh
  background-color $onebgColor
  position relative
  .el-form
    text-align center
    width 500px
    height 300px
    background-color #ffffff
    position absolute
    left 50%
    top 50%
    margin -150px 0 0 -250px
    .el-form-item
      width 80%
      margin-top 55px
</style>
