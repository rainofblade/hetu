<script setup lang="ts">
import { ref } from 'vue'
import FileItem from './FileItem.vue'

const files = ref([
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/aaa.hp1' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/bbb.hp1' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/ccc.hp1' },
  { filePath: '/Users/ricky/Documents/河图云平台/项目文件/ddd.hp2' },
  { filePath: 'C:\\Users\\hyena\\Code\\项目文件\\eee.hp2' },
  { filePath: 'C:\\Users\\hyena\\Code\\项目文件\\fff.hp2' },
  { filePath: 'C:\\Users\\hyena\\Code\\项目文件\\ggg.hpb' },
  { filePath: 'C:\\Users\\hyena\\Code\\项目文件\\hhh.hpb' }
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
