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
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <quill-editor v-model="article.content"></quill-editor>
        </el-form-item>
        <el-form-item label="频道">
          <!-- <el-select v-model="article.channel_id" placeholder="请选择频道">
             <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="channel in channels"
              :key="channel.id"
            ></el-option>
          </el-select>-->
          <channel-select v-model="article.channel_id"></channel-select>
        </el-form-item>
        <el-form-item label="请选择">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type >= 0">
            <el-row :gutter="20">
              <el-col :span="4"
              v-for="(item, index) in article.cover.type"
              :key="item">
                <UploadImages
                v-model="article.cover.images[index]">
                </UploadImages>
              </el-col>
            </el-row>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import channelSelect from '@/components/channel-select'
import UploadImages from './components/upload-image'
export default {
  name: 'PublishArticle',
  components: {
    // 注册局部组件
    quillEditor,
    channelSelect,
    UploadImages
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 1, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片，无图就是空数组即可
        },
        channel_id: ''
      },
      editorOption: ''
      // channels: [],   因为封装到组件里了
    }
  },
  // 生命周期第二步先加载这里边写的内容  然后在加载其他的
  created () {
    // this.loadChannels()
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        // 请求编辑文章
        this.updateArticle(draft)
      } else {
        // 请求添加文章
        this.addArticle(draft)
      }
    },
    // console.log('submit!')
    addArticle (draft) {
      this.$axios({
        method: 'post',
        url: '/articles',
        // 请求头参数  文档需要
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
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
    updateArticle (draft) {
      this.$axios({
        method: 'put',
        url: `/articles/${this.$route.params.articleId}`,
        // 请求头参数  文档需要
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        // query参数必须写到这个调用接口里面
        params: {
          draft
        },
        // body参数
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).catch(err => {
        console.log(err, '保存失败')
        this.$message.error('更新失败')
      })
    },

    loadArticle () {
      this.$axios({
        method: 'get',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      })
    }
    // loadChannels () {
    //   // 调用频道接口
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     this.channels = res.data.data.channels
    //   }).catch(err => {
    //     console.log(err, '获取数据失败')
    //   })
    // }
  }
}
</script>

<style scoped>
</style>
