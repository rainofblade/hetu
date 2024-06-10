<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { getFileName, getFileTag } from './util'
import CustomTitleBar from './components/CustomTitleBar.vue'

const pageTitle = ref('')

electronAPI.onUpdateTitle((title) => {
  document.title = title
  pageTitle.value = `${getFileName(title)} - ${getFileTag(title)}`
})
</script>

<template>
  <div class="main">
    <el-container>
      <el-header>
        <CustomTitleBar :title="pageTitle" />
      </el-header>
      <el-container>
        <el-aside></el-aside>
        <el-main><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.main {
  height: 100%;
  -webkit-app-region: drag;
}
.main > .el-container {
  height: 100%;
}
.main > .el-container > .el-container {
  -webkit-app-region: no-drag;
}
header {
  height: 32px;
  line-height: 32px;
  background-color: var(--el-color-primary);
  color: #fff;
  display: flex;
  justify-content: space-between;
}
aside {
  width: 200px;
  background-color: var(--el-color-info-light-9);
  border-right: 1px solid var(--el-color-info-light-7);
}
</style>
