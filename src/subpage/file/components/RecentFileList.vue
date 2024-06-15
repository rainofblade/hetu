<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FileItem from './FileItem.vue'

const files = ref<any[]>([])
const MAX_DOCS = 8

const clearRecentDocuments = () => {
  electronAPI.clearRecentDocuments()
}

onMounted(() => {
  const getRecentDocuments = async () => {
    const recentDocuments = await electronAPI.get('recentDocuments')
    if (typeof recentDocuments !== 'undefined') {
      let list = [],
        max = Math.min(recentDocuments.length, MAX_DOCS)
      for (let i = 0; i < max; i++) {
        list.push({ filePath: recentDocuments[i] })
      }
      files.value = list
    } else {
      files.value = []
    }
  }

  getRecentDocuments().catch((err) => {
    ElMessage.error({ message: err })
  })
})
</script>

<template>
  <div class="title-bar">
    <h1 class="title">最近打开的项目</h1>
    <div class="clear" v-if="files.length !== 0">
      <el-popconfirm
        title="是否要清空最近打开的项目？"
        confirm-button-text="清空"
        cancel-button-text="取消"
        @confirm="clearRecentDocuments"
      >
        <template #reference>
          <el-link :underline="false">清空</el-link>
        </template>
      </el-popconfirm>
    </div>
  </div>
  <div class="file-list">
    <FileItem v-if="files.length !== 0" v-for="file in files" v-bind="file" />
    <el-empty v-else description="您没有最近打开的项目" />
  </div>
</template>

<style scoped>
.title-bar {
  display: flex;
  justify-content: space-between;
}
.title {
  margin: 40px 0 20px 0;
  font-size: 20px;
  font-weight: normal;
}
.clear {
  padding-top: 45px;
}
.file-list {
  margin-bottom: 20px;
}
</style>
