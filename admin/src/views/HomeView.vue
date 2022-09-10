<template>
  <a-layout class="homepage">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <div v-for="(item, index) in MenuList" :key="'div' + index">
          <a-sub-menu v-if="item.children" :key="'sub' + index">
            <template #title>
              <span>
                <component :is="item.icon"></component>
                <span>{{ item.title }}}</span>
              </span>
            </template>
            <a-menu-item v-for="itemtags in item.children" :key="itemtags.title">
              <router-link :to="itemtags.path">
                {{ itemtags.title }}
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="item.title">
            <router-link :to="item.path"></router-link>
            <component :is="item.icon"></component>
            {{ item.title }}
          </a-menu-item>
        </div>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileTextOutlined
} from '@ant-design/icons-vue'
import { ref } from 'vue'
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)

interface Menu {
  icon?: any
  title: string
  path?: any
  children?: Menu[]
}
const MenuList = ref<Menu[]>([
  {
    icon: UserOutlined,
    title: '控制台',
    path: '/',
    children: [
      {
        title: '数据分析',
        path: '/'
      }
    ]
  },
  {
    icon: FileTextOutlined,
    title: '创建博客',
    path: '/blog/Create'
  },
  {
    icon: VideoCameraOutlined,
    title: '网站管理',
    children: [
      {
        title: '博客管理',
        path: '/blog/list'
      },
      {
        title: '标签管理',
        path: '/tags'
      },
      {
        title: '友链管理',
        path: '/link/list'
      }
    ]
  }
])
</script>
<style lang="scss" scoped>
.homepage {
  height: 100vh;
  overflow: hidden;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout-background {
  background: #fff;
}
</style>
