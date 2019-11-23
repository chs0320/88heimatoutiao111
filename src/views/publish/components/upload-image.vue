 <!-- 因为这个功能可能需要其他组件使用所以就写在一个文件夹里，开发的的时候好用 -->
<template>
  <div class="upload-image">
    <div class="preview" @click="onUploadShow">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <!--
      visible 控制对话框的显示和隐藏
     -->
    <el-dialog
      title="请选择文章封面图片"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
       <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="first">
          <!-- 标签内容写到里面来 -->
          <!--
            radio 有个 change 事件
            当选择的 radio 改变的时候会触发
           -->
          <el-radio-group v-model="activeImage" @change="loadImages">
            <el-radio label="all">全部</el-radio>
            <el-radio label="collect">收藏</el-radio>
          </el-radio-group>
          <el-row :gutter="20">
            <el-col :class="{
              'img-item': index === activeIndex
            }" :span="6" v-for="(item,index) in images" :key="item.id"
            @click.native="activeIndex = index"
            >
              <img height="100" :src="item.url">
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="uploadHeaders"
            name="image"
            list-type="picture-card"
            :on-preview="onPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UploadImage',
  components: {},
  props: {
    // props里边只能是value   规定
    value: {
      type: String
    }
  },
  data () {
    const token = window.localStorage.getItem('user-token')
    return {
      centerDialogVisible: false, // 对话框的显示状态
      activeName: 'first', // 激活的标签页
      activeImage: 'all', // 激活图片的筛选
      images: [], //
      activeIndex: null, // 激活的图片的索引
      previewImage: '', //  预览的图片地址
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  computed: {},
  watch: {
  },
  created () {},
  methods: {
    onUploadShow () {
      //  请求加载数据
      this.loadImages()

      // 显示弹窗
      this.centerDialogVisible = true
    },
    loadImages () {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: this.activeImage === 'collect' // 是否获取
        }
      }).then(res => {
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },
    onConfirm () {
      // alert(222)
      if (this.activeName === 'first') {
        const image = this.images[this.activeIndex]
        if (image) {
          // this.previewImage = image.url
          this.$emit('input', image.url)
        }
      } else if (this.activeName === 'second') {
        const previewImage = this.previewImage
        if (previewImage) {
          this.$emit('input', previewImage)
        }
      }
      this.centerDialogVisible = false
    },
    onPreview (file) {
      this.previewImage = file.response.data.url
    }
  }
}
</script>

<style scoped>
.upload-image {
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-image .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.img-item {
  border: 1px solid #000;
}
</style>
