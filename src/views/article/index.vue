<template>
  <div class="name">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="80px">
        <!-- 文章状态 -->
  <el-form-item label="文章状态">
    <el-radio-group v-model="filterForm.status">
      <el-radio label="全部"></el-radio>
      <el-radio label="草稿"></el-radio>
      <el-radio label="待审核"></el-radio>
      <el-radio label="审核通过"></el-radio>
      <el-radio label="审核失败"></el-radio>
    </el-radio-group>
  </el-form-item>
        <el-form-item label="查询状态">
          <el-select placeholder="请选择" v-model="filterForm.channel_id">
            <el-option label="全部" value="shanghai"></el-option>
            <el-option label="草稿" value="beijing"></el-option>
            <el-option label="待审核" value="beijing"></el-option>
            <el-option label="审核通过" value="beijing"></el-option>
            <el-option label="审核失败" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
            v-model="rangDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      // 因为时间现在只能绑一个，所以就创建了一个新的
      rangDate: ''
    }
  }
}
</script>

<style>
</style>
