<template>
        <!-- 布局 -->
  <el-container>
        <!-- 左右布局 -->
    <el-aside>左侧</el-aside>
        <!-- 右边大容器 -->
   <el-container>
        <!-- 上边 -->
     <el-header>头部</el-header>
        <!-- 底下 -->
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
   </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {

  }
}
</script>
