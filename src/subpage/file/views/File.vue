<script setup lang="ts">
// import TemplateList from '../components/TemplateList.vue'
import { ref } from 'vue'
import TemplateItem from '../components/TemplateItem.vue'
import RecentFileList from '../components/RecentFileList.vue'

const projects = ref([
  {
    type: 1,
    title: '二维水动力模拟',
    description: '二维水动力模拟，二维水动力模拟，二维水动力模拟'
  },
  {
    type: 2,
    title: '一维水动力模拟',
    description: '一维水动力模拟，一维水动力模拟，一维水动力模拟'
  },
  {
    type: 3,
    title: '水工建筑物计算',
    description: '水工建筑物计算，水工建筑物计算，水工建筑物计算'
  }
])
const drawer = ref(false)
const drawerTitle = ref('')

const openDrawer = (type: number) => {
  drawer.value = true
  drawerTitle.value = projects.value.find((project) => project.type === type)?.title as string
}

const createProject = () => {}

const openDialog = () => {
  electronAPI.openDialog()
}
</script>

<template>
  <div class="file">
    <el-container>
      <el-aside>
        <h1 class="title">新建项目</h1>
        <TemplateItem v-for="project in projects" v-bind="project" @open-drawer="openDrawer" />
      </el-aside>

      <el-main>
        <RecentFileList />
        <el-button type="primary" plain @click="openDialog">打开项目…</el-button>
      </el-main>

      <el-drawer
        v-model="drawer"
        direction="rtl"
        size="480"
        :close-on-click-modal="false"
        :title="`新建项目 - ${drawerTitle}`"
      >
        <template #default>
          <div>content</div>
        </template>
        <template #footer>
          <div>
            <el-button @click="drawer = false">取消</el-button>
            <el-button type="primary" @click="createProject">创建</el-button>
          </div>
        </template>
      </el-drawer>
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
.title {
  margin: 40px 0 20px 0;
  font-size: 20px;
  font-weight: normal;
}
main {
  padding: 0 20px;
}
</style>
