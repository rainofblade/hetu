<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { Setting, Box } from '@element-plus/icons-vue'

const activeIndex = ref()
const router = useRouter()

const setAvtive = (index: string) => {
  activeIndex.value = index
}

electronAPI.onRoute((path) => {
  activeIndex.value = path
  router.push({ path })
})
</script>

<template>
  <div class="main">
    <el-container>
      <el-container>
        <el-aside>
          <h1 class="title">设置</h1>
          <el-menu
            :default-active="activeIndex"
            @select="setAvtive"
            background-color="transparent"
            router
          >
            <el-menu-item index="/">
              <el-icon><Setting /></el-icon>
              <span>通用</span>
            </el-menu-item>
            <el-menu-item index="/update">
              <el-icon><Box /></el-icon>
              <span>软件更新</span>
            </el-menu-item>
          </el-menu>
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
aside {
  width: 200px;
  padding: 0 10px;
  background-color: var(--el-color-info-light-9);
  border-right: 1px solid var(--el-color-info-light-7);
}
.title {
  margin: 40px 0 20px 0;
  padding-left: 20px;
  font-size: 20px;
  font-weight: normal;
}
.el-menu {
  border-right: none;
  -webkit-app-region: no-drag;
}
.el-menu-item {
  height: 40px;
  border-radius: 8px;
  margin-bottom: 5px;
}
.el-menu-item:hover {
  background-color: var(--el-color-info-light-8);
}
.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-8);
}
</style>
