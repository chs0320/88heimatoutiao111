<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <el-table
        :data="articles"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          label="评论状态"
          width="180">
          <template slot-scope="scope">
         <el-switch
            @change="onStatusChang(scope.row)"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949">
         </el-switch>
          </template>
        </el-table-column>
         <el-table-column
          label="操作">
            <template>
            <el-button type="primary">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
 <el-pagination
 style="margin-left:280px;margin-top:60px"
 @current-change="onPageChange"
  background
  layout="prev, pager, next"
  :total="totalCount">
</el-pagination>
  </div>
</template>

<script>
export default {
  // 组件的 name 最好起名为两个单词，尽量少用一个单词
  // 为什么？为了避免和原生的 html 标签冲突
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [],
      totalCount: 0,

      page: 1
    }
  },
  computed: {},
  watch: {
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles (page) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment',
          page,
          per_page: 10
        }
      }).then(res => {
        console.log(res)
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    onStatusChang (article) {
      this.$axios({
        method: 'put',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        this.$message({
          type: 'seccess',
          message: `${article.comment_status ? '启用' : '关闭'} 成功`
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('操作失败')
      })
    },
    onPageChange (page) {
      // 发请求接收对应页码数据
      this.loadArticles(page)
      // 把最新页码更新到 data 中
      this.page = page
    }
  }
}
</script>

<style scoped></style>
