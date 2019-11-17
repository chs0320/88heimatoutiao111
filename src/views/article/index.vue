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
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="查询状态">
          <!-- 下拉列表会把选中的option的value值传到数据中 -->
          <el-select placeholder="请选择" v-model="filterForm.channel_id">
            <el-option label="所有频道" :value="null"></el-option>
            <!-- value="null"  故意的  不传就是所有  默认的 -->
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="channel in channels"
              :key="channel.id"
            ></el-option>
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
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <!-- 后面加括号默认从第一页开始查 -->
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{totalCount}}条符合条件的内容</span>
      </div>
      <el-table :data="articles" style="width: 100%" v-loading="loading">
        <el-table-column prop="date" label="日期" width="180">
          <template slot-scope="scope">
            <img width="50px" :src="scope.row.cover.images[0]" alt />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <!-- 简单方法 -->
            <!-- <span v-show="scope.row.status===0">草稿</span>
          <span v-show="scope.row.status===1">待审核</span>
          <span v-show="scope.row.status===2">审核失败</span>
          <span v-show="scope.row.status===3">审核成功</span>
            <span v-show="scope.row.status===4">已删除</span>-->
            <!-- 定义数组的方法 -->
            <!-- <span>{{articleStatus[scope.row.status].label}}</span> -->
            <!-- 引入标签的方法 -->
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{articleStatus[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column prop="address" label="操作">
          <!-- slot-scope="scope"相当于v-for  后面传id就是通过每项的id删除 -->
          <template slot-scope="scope">
            <el-button type="primary" round size="mini">编辑</el-button>
            <el-button type="danger" round size="mini" @click="onDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
          <!--current-change 这是组件给我们的 我们需要在删除之后重载当前页码的文章列表，所以需要把页码记录起来-->
    <el-pagination
      :disabled="loading"
      style="margin-left:280px;margin-top:60px"
      @current-change="onPageChange"
      background
      layout="prev, pager, next"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  // 建议给每个数组都起一个名字，有利于在网页的vue查找   建议有意义
  name: 'cc',
  data () {
    return {
      filterForm: {
        status: null,
        channel_id: null
        // begin_pubdate: '',
        // end_pubdate: ''
      },
      // 因为时间现在只能绑一个，所以(必须)就创建了一个新的
      rangDate: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      // 因为打印出来的是一个数组，所以先定义一个空数组   存储文章数据库列表
      articles: [],
      articleStatus: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },

        {
          type: 'success',
          label: '审核成功'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      totalCount: 0,
      loading: true,
      page: 0, // 在data中添加数据成员存储当前页码
      channels: [],
      rangeDate: []
    }
  },
  created () {
    // 建议不在这个里面写大量逻辑，所以就写在方法里，封装一个函数
    this.loadArticles()
    // 加载频道列表
    this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      // 加载loading
      this.loading = true
      // 加载所有文章数据
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'get',
        url: '/articles',
        headers: {
          // 添加请求头
          Authorization: `Bearer ${token}`
        },
        params: {
          page,
          per_page: 10,
          status: this.filterForm.status, // 文章状态
          channel_id: this.filterForm.channel_id, // 频道id
          // begin_pubdate, //   开始时间
          // end_pubdate //  结束时间
          begin_pubdate: this.rangDate ? this.rangDate[0] : null,
          end_pubdate: this.rangDate ? this.rangDate[1] : null
        }
      })
        .then(res => {
          // console.log(res)
          this.articles = res.data.data.results
          this.totalCount = res.data.data.total_count
        })
        .catch(err => {
          console.log(err, '请求失败')
        })
        .finally(() => {
          // 这个函数无论成功或者失败都会执行、在写loading的时候必须得写
          this.loading = false
        })
    },
    onPageChange (page) {
      // 发请求接收对应页码数据
      this.loadArticles(page)
      // 把最新页码更新到 data 中
      this.page = page
    },
    // 在处理函数中请求删除文章，删除成功，重载当前页文章列表
    onDelete (articleId) {
      // 调接口
      this.$axios({
        method: 'DELETE',
        // 任何数据和字符串相加都会tostring
        url: `/articles/${articleId}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        }
      }).then(res => {
        console.log(res)
        // 当删除成功的时候重新加载数据列表  删除那一页哪一页刷新
        this.loadArticles(this.page)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    },
    loadChannels () {
      // 请求频道接口
      this.$axios({
        method: 'get',
        url: '/channels'
      })
        .then(res => {
          // console.log(res)
          this.channels = res.data.data.channels
        })
        .catch(err => {
          console.log(err, '获取数据失败')
        })
    }

    // onDelete () {
    //   // 请求删除
    //   // 删除成功，重载当前页数据
    //   this.loadArticles(this.page)
    //   // 思路：所有方法都可以访问 this，共享 Vue 实例
    // }
  }
}
</script>

<style>
</style>
