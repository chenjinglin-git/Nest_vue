<template>
  <div class="tagspage">
    <div class="tags-header">
      <a-row justify="space-between">
        <a-col :span="4">col-4</a-col>
        <a-col :span="4">col-4</a-col>
        <a-col :span="4">col-4</a-col>
        <a-col :span="4">col-4</a-col>
      </a-row>
      <a-row type="flex" justify="'space-between'">
        <a-col :span="4">col-4</a-col>
      </a-row>
    </div>
    <div class="tags-boby">
      <a-table :data-source="BlogList">
        <a-table-column key="id" title="ID" data-index="id" />
        <a-table-column key="title" title="标题" data-index="title" />
        <a-table-column key="create_at" title="创建时间" data-index="create_at" />
        <a-table-column key="cover" title="封面" data-index="cover">
          <template #default="{ text: cover }">
            <img :src="cover" width="50" height="50" />
          </template>
        </a-table-column>
        <a-table-column key="introduce" title="描述" data-index="introduce" />
        <a-table-column key="tag" title="标签" data-index="tag">
          <template #default="{ text: tag }">
            {{ tag.name }}
          </template>
        </a-table-column>
        <a-table-column key="state" title="是否显示" data-index="state">
          <template #default="{ text: state, record }">
            <a-switch :checked="state" @change="Draft(record.id, state)" />
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作">
          <template #default="{ record }">
            <span>
              <router-link :to="`/blog/update/${record.id}`">编辑</router-link>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确认删除吗，确认后无法返回"
                ok-text="确认"
                cancel-text="取消"
                @confirm="DeleteBlog(record.id)"
              >
                <a>删除</a>
              </a-popconfirm>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlogFindAll, BlogDelete, BlogUpdate } from '@/service/Blog'
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
const params = ref()
const BlogList = ref()

const DeleteBlog = async (id: string) => {
  const data = await BlogDelete(id)
  if (data.code === 200) {
    message.success('删除成功')
  }
  Fetch()
}

const Draft = async (id: string, checked: boolean) => {
  const data = await BlogUpdate({
    id: id,
    state: !checked
  })
  console.log(data)
  Fetch()
}

const Fetch = async () => {
  params.value = {}
  const data = await BlogFindAll(params.value)
  BlogList.value = data.data
}

onMounted(() => {
  Fetch()
})
</script>
