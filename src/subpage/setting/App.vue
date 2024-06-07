<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const activeIndex = ref()
const router = useRouter()

electronAPI.onRoute((hashName) => {
  router.push({ name: hashName })
  activeIndex.value = ['general', 'update'].findIndex((item) => item == hashName) + ''
})
</script>

<template>
  <div class="main">
    <el-container>
      <el-container>
        <el-aside>
          <h1 class="title">设置</h1>
          <el-menu :default-active="activeIndex" class="menu">
            <RouterLink to="/">
              <el-menu-item index="0">
                <el-icon><Setting /></el-icon>
                <span>通用</span>
              </el-menu-item>
            </RouterLink>
            <RouterLink to="/update">
              <el-menu-item index="1">
                <el-icon><Box /></el-icon>
                <span>软件更新</span>
              </el-menu-item>
            </RouterLink>
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
.menu {
  border-right: none;
  background-color: transparent;
}
.menu a {
  display: block;
  margin: 5px 0;
}
.el-menu-item {
  height: 40px;
  border-radius: 8px;
}
.el-menu-item:hover {
  background-color: #fff;
  background-color: var(--el-color-info-light-8);
}
.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-8);
}
</style>
