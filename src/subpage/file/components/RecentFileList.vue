<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FileItem from './FileItem.vue'

const files = ref([])
const MAX_DOCS = 8

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
  <div class="file-list">
    <FileItem v-if="files.length !== 0" v-for="file in files" v-bind="file" />
    <el-empty v-else description="无" />
  </div>
</template>

<style scoped>
.file-list {
  margin-bottom: 20px;
}
</style>
