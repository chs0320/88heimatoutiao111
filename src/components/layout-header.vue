<template>
  <el-row type="flex" justify="space-between" align="middle">
    <!-- 头部组件 el-row布局 -->
    <!-- // 普通组件一般在这里写 -->
    <!-- :span="6"   为什么要加冒号，加了冒号就是变量 不加冒号就是字符串  在这个里边，后面写的数字，要求必须是number
    类型，加了冒号就是数字，不加冒号就是字符串，所以加冒号-->
    <el-col :span="6" class="left">
      <!-- 左侧 -->
      <i class="el-icon-s-fold"></i>
      <span>江苏省传智播客科技有限公司</span>
    </el-col>
    <el-col :span="3" class="right">
      <!-- 右侧 -->
      <img width="50" :src="user.photo" alt />
      <el-dropdown trigger="click">
        <span style="cursor: pointer;">{{user.name}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <!-- 给组件注册原生点击事件就得加一个修饰符 -->
          <el-dropdown-item @click.native="onlogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '@/utils/event-bus'
export default {
  data () {
    return {
      user: {
        name: '',
        photo: ''
      }
    }
  },
  created () {
    this.loadUser()
    eventBus.$on('update-user', user => {
      this.user.name = user.name
      this.user.photo = user.photo
    })
  },
  methods: {
    loadUser () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        console.log(res)
        this.user = res.data.data
      }).catch(err => {
        console.log(err, '获取数据失败')
        this.$message.error('失败')
      })
    },
    onlogout () {
      // console.log(123)
      this.$confirm('你确定要退出么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '已退出!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
  }
  span {
    margin-left: 4px;
  }
}
.right {
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    margin-right: 6px;
  }
}
</style>
