<template>
  <div class="login">
     <!-- 登录 -->
     <!-- 用了一个elementUI的卡片组件 -->
     <el-card class="login-card">
        <div class="title">
           <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单 -->
        <el-form>
           <el-form-item>
              <el-input placeholder="shenme"></el-input>
           </el-form-item>
           <el-form-item>
              <el-input style="width:280px"></el-input>
               <!-- 提交按钮  float:right  什么东西-->
               <el-button plain style="float:right">发送验证码</el-button>
               <el-checkedbox></el-checkedbox>
           </el-form-item>
        </el-form>
     </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
   .login {
      color: aqua;
      background-size: cover;
      height: 100vh;
      background-image:url('../../assets/img/login_bg.jpg');
      display: flex;
      justify-content: center;    //  这是什么居中
      align-items: center;        //   这又是什么居中
      .login-card {
         width: 440px;
         height: 360px;
         .title {
            text-align: center;
            img {
               height: 45px;
            }
         }
      }
   }
</style>
