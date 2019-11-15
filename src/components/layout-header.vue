<template>
  <el-row type="flex" justify="space-between" align="middle">
    <!-- 头部组件 el-row布局 -->
    <!-- // 普通组件一般在这里写 -->
    <!-- :span="6"   为什么要加冒号，加了冒号就是变量 不加冒号就是字符串  在这个里边，后面写的数字，要求必须是number
    类型，加了冒号就是数字，不加冒号就是字符串，所以加冒号  -->
    <el-col :span="6" class="left">
      <!-- 左侧 -->
      <i class="el-icon-s-fold"></i>
      <span>江苏省传智播客科技有限公司</span>
    </el-col>
    <el-col :span="3" class="right">
      <!-- 右侧 -->
      <img src="../assets/img/avatar.jpg" alt="">
      <el-dropdown trigger="click">
         <span style="cursor: pointer;">早晚</span>
         <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
         </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
   .left{
      display: flex;
      align-items: center;
      i{
         font-size: 24px;
      }
      span{
         margin-left: 4px;
      }
   }
   .right{
      display: flex;
      align-items: center;
      img{
      border-radius: 50%;
      margin-right: 6px;
      }
   }
</style>
