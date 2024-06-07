<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getFileName, getFileTag } from './util'

const pageTitle = ref('')

electronAPI.onUpdateTitle((title) => {
  document.title = title
  pageTitle.value = `[${getFileTag(title)}] ${getFileName(title)}`
})
</script>

<template>
  <div class="main">
    <el-container>
      <el-header>{{ pageTitle }}</el-header>
      <el-container>
        <el-aside>
          <!-- <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/setting">Setting</RouterLink>
          </nav> -->
        </el-aside>
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
  height: 40px;
  line-height: 40px;
  background-color: var(--el-color-primary);
  text-align: center;
  color: #fff;
  font-weight: bold;
}
aside {
  width: 200px;
  background-color: var(--el-color-info-light-9);
  border-right: 1px solid var(--el-color-info-light-7);
}
</style>
