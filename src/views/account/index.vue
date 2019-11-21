<template>
  <div>
     <template>
  <div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户头像">
        <el-upload
          class="avatar-uploader"
          :http-request="onUpload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false">
          <img width="100" v-if="user.photo" :src="user.photo" class="avatar">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input type="textarea" v-model="user.intro"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

  </div>
</template>

<script>
import eventBus from '@/utils/event-bus'
export default {
  name: 'AccountIndex',
  data () {
    return {
      user: {
        id: '',
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    onSubmit () {
      // es6对象结构语法
      // const name = this.user.name
      // const email = this.user.email
      // const intro = this.user.intro
      const { name, email, intro } = this.user
      // 等同于上面那三句代码
      // console.log(cc)
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          email,
          intro
        }
      }).then(res => {
        eventBus.$emit('update-user', this.user)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(err => {
        // console.log(err, '修改失败')
        alert(err)
      })
    },
    loadUserProfile () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        // console.log(res)
        this.user = res.data.data
      }).catch(err => {
        // console.log(err)
        alert(err)
      })
    },
    onUpload (config) {
      console.log(config)
      const fd = new FormData()
      fd.append('photo', config.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        // 注意：因为这个是formdata创建的，必须得有这个才能用，因为上传
        // 的文件比较特殊所以data里面的数据就得用new出来的实例对象等于这个data
        // 因为接口不一样，所以才用的formdata
        data: fd
      }).then(res => {
        this.user.photo = res.data.data.photo
        eventBus.$emit('update-user', this.user)
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    }
  }
}
</script>

<style>

</style>
