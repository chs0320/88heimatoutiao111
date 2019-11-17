<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
             <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="channel in channels"
              :key="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="封面">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PublishArticle',
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片，无图就是空数组即可
        },
        channel_id: ''
      },
      channels: []
    }
  },
  // 生命周期第二步先加载这里边写的内容  然后在加载其他的
  created () {
    this.loadChannels()
  },
  methods: {
    onSubmit (draft) {
      // console.log('submit!')
      this.$axios({
        method: 'post',
        url: '/articles',
        // 请求头参数  文档需要
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        },
        // query参数必须写到这个调用接口里面
        params: {
          draft
        },
        // body参数
        data: this.article
      }).then(res => {
        alert('发表（存入草稿）成功')
        this.$router.push('/article')
      }).catch(err => {
        console.log(err, '保存失败')
      })
    },
    loadChannels () {
      // 调用频道接口
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    }
  }
}
</script>

<style scoped>
</style>
