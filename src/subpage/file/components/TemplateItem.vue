<script setup lang="ts">
defineProps<{
  type: number
  title: string
  description: string
}>()
</script>

<template>
  <el-card shadow="hover">
    <span class="p-type" :class="`p-type-${type}`"></span>
    <span class="title">{{ title }}</span>
    <p>{{ description }}</p>
  </el-card>
</template>

<style scoped>
.el-card {
  -webkit-app-region: no-drag;
  margin-bottom: 10px;
  cursor: pointer;
}
.el-card:hover {
  border-color: var(--el-color-primary-light-3);
  background-color: var(--el-color-primary-light-9);
}
.el-card .p-type {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  vertical-align: middle;
}
.el-card .p-type-1 {
  background: url(@/assets/p-type-1.svg);
  background-size: contain;
}
.el-card .p-type-2 {
  background: url(@/assets/p-type-2.svg);
  background-size: contain;
}
.el-card .p-type-3 {
  background: url(@/assets/p-type-3.svg);
  background-size: contain;
}
.el-card .title {
  font-weight: bold;
}
.el-card p {
  margin: 10px 0 0;
  color: var(--el-color-info);
}
</style>
