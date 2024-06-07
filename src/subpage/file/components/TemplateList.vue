<script setup lang="ts">
import { ref } from 'vue'
import TemplateItem from './TemplateItem.vue'

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
</script>

<template>
  <TemplateItem v-for="project in projects" v-bind="project" />
</template>
