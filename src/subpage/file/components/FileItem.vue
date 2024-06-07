<script setup lang="ts">
import { computed } from 'vue'
import { getFileName, getFileTag } from '@/util'

const props = defineProps<{
  filePath: string
}>()

const fileName = computed(() => {
  return getFileName(props.filePath)
})

const fileTag = computed(() => {
  return getFileTag(props.filePath)
})

const openFile = (event: Event) => {
  electronAPI.openFile((event.currentTarget as HTMLElement).getAttribute('filePath') as string)
}
</script>

<template>
  <el-link :underline="false" class="file-item" :filePath @click="openFile">
    <el-tag type="info">{{ fileTag }}</el-tag>
    {{ fileName }}
  </el-link>
</template>

<style scoped>
.file-item {
  -webkit-app-region: no-drag;
  display: block;
  padding: 12px;
  border-bottom: 1px solid #ebeef5;
}
.file-item:hover {
  background-color: #f5f7fa;
}
.el-tag {
  margin-right: 10px;
}
</style>
