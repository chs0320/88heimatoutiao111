<template>
  <div class="login">
     <!-- 登录 -->
     <!-- 用了一个elementUI的卡片组件 -->
     <el-card class="login-card">
        <div class="title">
           <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单 -->
        <el-form ref="formObj" :model="loginForm" :rules="loginRules">
           <el-form-item prop="mobile">
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
           </el-form-item>
           <el-form-item prop="code">
              <el-input v-model="loginForm.code" style="width:280px" placeholder="请输入您的验证码"></el-input>
               <!-- 提交按钮  float:right  什么东西-->
               <el-button style="float:right" plain>发送验证码</el-button>
           </el-form-item>
            <el-form-item prop="checked">
                  <!-- 勾选同意框 -->
            <el-checkbox v-model="loginForm.checked" style="margin-bottom:40px">我已阅读并同意用户协议及条款</el-checkbox>
            </el-form-item>
            <el-form-item>
               <el-button style="width:100%" type='primary' @click="cc">登录</el-button>
            </el-form-item>
        </el-form>
     </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否勾选协议
      },
      // 校验规则对象
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'
        }],
        code: [{ required: true, message: '请输入您的验证码' }, {
          pattern: /^\d{6}$/, message: '请输入六位数字'
        }],
        checked: [{ validator: function (rule, value, callback) {
          //   rule代表当前的规则   没啥用
          // value代表当前的值   表单字段checked的值
          //  callback回调函数   是用来执行的
          if (value) {
            callback() // 如果是true的话 就选中了 通过校验  直接执行callback 表示直接通过
          } else {
            callback(new Error('你必须无条件执行')) // 要自己定义一个错误出来
          }
        } }]
      }
    }
  },
  methods: {
    cc () {
      // this.$refs.formObj    获取el-form的dom对象实例
      this.$refs.formObj.validate((isOK) => {
        if (isOK) {
          // 如果为true的话直接继续下一步  调用接口   登录
          // 调用接口
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            // 请求类型
            method: 'post'
          }).then(res => {
            // console.log(res.data.data.token)
            // 存到本地   将信息存到本地
            window.localStorage.setItem('user-token', res.data.data.token)
            // 跳转到主页
            // 编程式导航
            this.$router.push('/')
          }).catch((Err) => {
            // 提示登录失败
            this.$message({
              type: 'warning',
              message: '手机号或者验证码错误'
            })
          })
        }
      })
    }
  }
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
         opacity: 0.7;
         .title {
            text-align: center;
            img {
               height: 45px;
            }
         }
      }
   }
</style>
