<script setup lang="ts">
import { ref } from 'vue'
import FileItem from './FileItem.vue'

const files = ref([
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/aaa.hp2' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/bbb.hp2' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/ccc.hp2' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/ddd.hp1' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/eee.hp1' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/fff.hp1' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/ggg.hpb' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/hhh.hpb' }
])
</script>

<template>
  <div class="file-list">
    <FileItem v-for="file in files" v-bind="file" />
  </div>
</template>

<style scoped>
.file-list {
  margin-bottom: 20px;
}
</style>
