<script setup lang="ts">
import TemplateList from '../components/TemplateList.vue'
import RecentFileList from '../components/RecentFileList.vue'

const openDialog = () => {
  electronAPI.openDialog()
}
</script>

<template>
  <div class="file">
    <el-container>
      <el-aside>
        <h1 class="title">新建项目</h1>
        <TemplateList />
      </el-aside>
      <el-main>
        <h1 class="title">最近的项目</h1>
        <RecentFileList />
        <el-button type="primary" plain @click="openDialog">打开项目…</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.file {
  margin: 0 auto;
  height: 100%;
  -webkit-app-region: drag;
}
.file > .el-container {
  height: 100%;
}
aside {
  width: 320px;
  padding: 0 20px;
  background-color: var(--el-color-info-light-9);
  border-right: 1px solid var(--el-color-info-light-7);
}
main {
  padding: 0 20px;
}
.title {
  margin: 40px 0 20px 0;
  font-size: 20px;
  font-weight: normal;
}
</style>
