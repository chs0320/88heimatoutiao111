<template>
  <div class="channel-select">

    <!--
      element 的下拉列表组件
      它这个组件要求 v-model 绑定数据   input  是人家自带的
    -->
    <el-select placeholder="请选择频道"
    :value="value"
    @input="$emit('input',$event)"
    >
      <el-option
        :label="channel.name"
        :value="channel.id"
        v-for="channel in channels"
        :key="channel.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  components: {},
  props: ['value'],
  data () {
    return {
      channels: [] // 存储频道列表
    }
  },
  computed: {},
  watch: {
  },
  created () {
    this.loadChannels()
  },
  methods: {
    loadChannels () {
      // 有些接口需要 token，有些接口不需要 token
      // 是否需要，应该由接口文档指示
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
