<script setup lang="ts">
import { isMac, isWindows } from '../util'

const props = defineProps<{
  title: string
}>()

const handleMenuClick = (command: string) => {
  electronAPI.menuClick(command)
}
</script>

<template>
  <div v-if="isWindows" class="windows-menu-bar">
    <span class="logo"></span>
    <el-dropdown
      placement="bottom-start"
      size="small"
      trigger="click"
      popper-class="windows-popper"
      @command="handleMenuClick"
    >
      <el-button type="primary">Hetu</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="about"><span>关于 Hetu</span></el-dropdown-item>
          <el-dropdown-item command="setting">
            <span>设置…</span>
            <span class="shotcut">Ctrl+逗号</span>
          </el-dropdown-item>
          <el-dropdown-item command="update"><span>检查更新…</span></el-dropdown-item>
          <el-dropdown-item command="switch" divided>切换账号</el-dropdown-item>
          <el-dropdown-item command="quit"><span>退出 Hetu</span></el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown
      placement="bottom-start"
      size="small"
      trigger="click"
      popper-class="windows-popper"
      @command="handleMenuClick"
    >
      <el-button type="primary">文件</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="new">
            <span>新建项目…</span>
            <span class="shotcut">Ctrl+N</span>
          </el-dropdown-item>
          <el-dropdown-item command="open" divided>
            <span>打开项目…</span>
            <span class="shotcut">Ctrl+O</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown
      placement="bottom-start"
      size="small"
      trigger="click"
      popper-class="windows-popper"
      @command="handleMenuClick"
    >
      <el-button type="primary">窗口</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="minimize">
            <span>最小化</span>
            <span class="shotcut">Ctrl+M</span>
          </el-dropdown-item>
          <el-dropdown-item command="close">
            <span>关闭</span>
            <span class="shotcut">Ctrl+W</span>
          </el-dropdown-item>
          <el-dropdown-item command="toggle" divided>
            <span>切换全屏</span>
            <span class="shotcut">F11</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown
      placement="bottom-start"
      size="small"
      trigger="click"
      popper-class="windows-popper"
      @command="handleMenuClick"
    >
      <el-button type="primary"><span>帮助</span></el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="help">帮助文档</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div v-if="isMac"></div>
  <div>{{ title }}</div>
  <div v-if="isWindows" class="windows-placeholder"></div>
  <div v-if="isMac"></div>
</template>

<style>
.windows-menu-bar .logo {
  display: inline-block;
  width: 24px;
  height: 32px;
  background: url('@/assets/title-logo.png') no-repeat;
  background-size: 20px 20px;
  background-position: 0 6px;
}
.windows-popper ul {
  width: 150px;
}
.windows-popper .el-dropdown-menu__item {
  padding: 3px 10px;
  justify-content: space-between;
}
.windows-popper .shotcut {
  color: var(--el-color-info-light-3);
}
.windows-placeholder {
  width: 265px;
}
</style>
