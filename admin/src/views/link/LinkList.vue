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
        <a-col :span="4"><a-button type="primary" @click="add">新增</a-button></a-col>
        <a-col :span="4">col-4</a-col>
      </a-row>
    </div>
    <div class="tags-boby">
      <a-table :data-source="LinkList" :pagination="pagination" @change="change($event)">
        <a-table-column key="id" title="ID" data-index="id" />
        <a-table-column key="title" title="标题" data-index="title" />
        <a-table-column key="path" title="网址" data-index="path" />
        <a-table-column key="create_at" title="创建时间" data-index="create_at" />
        <a-table-column key="action" title="操作">
          <template #default="{ record }">
            <span>
              <a-divider type="vertical" />
              <a @click="UpdateLink(record)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确认删除吗，确认后无法返回"
                ok-text="确认"
                cancel-text="取消"
                @confirm="DeleteLink(record.id)"
              >
                <a>删除</a>
              </a-popconfirm>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <div>
      <a-modal
        v-model:visible="visibleCreate"
        title="新增标签"
        okText="确认"
        cancelText="取消"
        @ok="LinksCreate()"
      >
        <a-form-item label="网站名称">
          <a-input v-model:value="LinkValue.title"></a-input>
        </a-form-item>
        <a-form-item label="网站地址">
          <a-input v-model:value="LinkValue.path"></a-input>
        </a-form-item>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ref, reactive, onMounted } from 'vue'
import { LinkFindAll, LinkDelete, LinkUpdate, LinkCreate } from '../../service/Link'
interface Link {
  id?: string
  title: string
  path: string
}
interface Pagination {
  page: string
  total: string
}
const LinkList = ref<Link[]>()
const params = ref()
const visibleCreate = ref<boolean>(false)
const LinkValue = reactive<Link>({
  title: '',
  path: ''
})
const pagination = reactive<Pagination>({
  page: '',
  total: '0'
})

const UpdateLink = async (item: Link) => {
  LinkValue.path = item.path
  LinkValue.title = item.title
  LinkValue.id = item.id
  visibleCreate.value = true
}
const DeleteLink = async (id: string) => {
  const data = await LinkDelete(id)
  if (data.code == 200) {
    message.success('删除成功')
    Fetch()
  }
}

const add = () => {
  visibleCreate.value = true
  LinkValue.path = ''
  LinkValue.title = ''
}

const LinksCreate = async () => {
  let data
  if (LinkValue.id) {
    data = await LinkUpdate(LinkValue)
    delete LinkValue.id
  } else {
    data = await LinkCreate(LinkValue)
  }
  if (data.code == 200) {
    visibleCreate.value = false
    message.success('操作成功')
    Fetch()
  }
}
const Fetch = async () => {
  const data = await LinkFindAll(params.value)
  LinkList.value = data.data
}
const change = (e: { current: any }) => {
  params.value = {
    search: {
      grade: '1'
    },
    page: e.current
  }
  Fetch()
}
onMounted(() => {
  Fetch()
})
</script>
