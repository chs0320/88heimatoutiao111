<template>
  <div>
     <template>
  <div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false">
          <img width="100" :src="user.photo" class="avatar">
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
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
      const { name, email, intro } = this.user
      // console.log(cc)
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data () {
          return {
            user: {
              name,
              email,
              intro
            }
          }
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(err => {
        console.log(err, '修改失败')
      })
    },
    loadUserProfile () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        console.log(res)
        this.user = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
