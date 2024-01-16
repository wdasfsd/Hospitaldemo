// 在你的 Vue 文件中
<template>
  <div>
    <div ref="editor" class="quill-editor" />
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  data() {
    return {
      quill: null
    }
  },
  mounted() {
    this.initializeQuill()
  },
  methods: {
    initializeQuill() {
      this.quill = new Quill(this.$refs.editor, {
        theme: 'snow'
        // 其他 Quill 配置项
      })
    },
    getContent() {
      const content = this.quill.getContents()
      console.log(content)
    }
  }
}
</script>

<style scoped>
/* 根据需要添加样式 */
.quill-editor {
  height: 300px; /* 设置编辑器高度 */
}
</style>

