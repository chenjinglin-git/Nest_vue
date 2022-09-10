<template>
  <div>
    <MdEditor v-model="Blogform.content" @onHtmlChanged="htmlchange" @onUploadImg="onUploadImg" />
    <div class="BlogBottom">
      <a-drawer
        v-model:visible="visible"
        class="custom-class"
        style="color: red"
        title="博客信息"
        placement="right"
      >
        <a-form
          :model="Blogform"
          v-bind="{
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
          }"
          name="nest-messages"
        >
          <a-form-item label="博客标题">
            <a-input v-model:value="Blogform.title" />
          </a-form-item>
          <a-form-item label="Age">
            <a-upload
              v-model:file-list="fileList"
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="http://localhost:3000/upload"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="avatar-uploader" />
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item label="选择标签">
            <a-select
              v-model:value="Blogform.tag"
              :options="options"
              style="width: 200px"
              @change="handleChange"
            ></a-select>
          </a-form-item>
          <a-form-item label="博客介绍">
            <a-textarea v-model:value="Blogform.introduce" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 16, offset: 8 }">
            <a-button type="primary" html-type="submit" @click="submit(false)">Submit</a-button>
          </a-form-item>
        </a-form>
      </a-drawer>
      <a-button @click="submit(true)">草稿</a-button>
      <a-button type="primary" @click="visible = true">提交</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ref, reactive, onMounted } from 'vue'
import { Upload } from '../../service/Utils'
import type { UploadChangeParam, UploadProps, SelectProps } from 'ant-design-vue'
import { TagsFindAll } from '@/service/Tags'
import { BlogCreate, BlogFindAll, BlogUpdate } from '@/service/Blog'
import { useRoute, useRouter } from 'vue-router'
interface Tag {
  name: string
  id: string
  superiors: any[]
  grade: string
  create_at: Date
  update_at: Date
}
interface Blog {
  id?: string
  title: string
  cover: string
  introduce: string
  content: string
  htmlconten: string
  tag: string
  state: boolean
}
const visible = ref<boolean>()
const fileList = ref([])
const route = useRoute()
const router = useRouter()
const loading = ref<boolean>(false)
const imageUrl = ref<string>('')
const options = ref<SelectProps['options']>()
const routeFlag = ref<boolean>(false)
const Blogform = reactive<Blog>({
  title: '',
  cover: '',
  introduce: '',
  content: '',
  htmlconten: '',
  tag: '',
  state: true
})

const routeFuc = async () => {
  const id = route.params.id
  if (id != undefined) {
    const data = await BlogFindAll({
      search: {
        id: id
      }
    })
    const { title, cover, content, introduce, tag } = data.data[0]
    Blogform.id = String(id)
    Blogform.title = title
    Blogform.cover = cover
    Blogform.content = content
    Blogform.introduce = introduce
    Blogform.tag = tag.id
    imageUrl.value = cover
    loading.value = false
    routeFlag.value = true
  }
}

const submit = async (bool: boolean) => {
  if (bool) {
    Blogform.state = false
    Blogform.tag = '2'
  }
  if (routeFlag.value) {
    const data = await BlogUpdate(Blogform)
    if (data.code != 200) {
      message.error('修改失败')
      return false
    }
    message.success('修改成功')
  } else {
    const data = await BlogCreate(Blogform)
    if (data.code != 200) {
      message.error('插入失败')
      return false
    } else {
      message.success('插入成功')
    }
  }
  Blogform.title = ''
  Blogform.cover = ''
  Blogform.introduce = ''
  Blogform.content = ''
  Blogform.htmlconten = ''
  Blogform.tag = ''
  Blogform.state = true
  visible.value = false
  router.push('/blog/list')
}

const Fetch = async () => {
  const data = await TagsFindAll({
    search: {
      grade: '1'
    }
  })
  options.value = data.data.data.map((v: Tag) => ({
    label: v.name,
    options: v.superiors.map((k: Tag) => ({
      label: k.name,
      value: k.id
    }))
  }))
}
//Blob
function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
const handleChange = (info: UploadChangeParam) => {
  if (info.file?.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file?.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url
      Blogform.cover = info.file.response.url
      loading.value = false
    })
  }
  if (info.file?.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}
const htmlchange = (html: string) => {
  Blogform.htmlconten = html
}
const onUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
  const res = await Promise.all(
    files.map(file => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append('file', file)
        Upload(form)
          .then((res: any) => rev(res))
          .catch((error: any) => rej(error))
      })
    })
  )

  callback(res.map((item: any) => item.data.url))
}
const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
onMounted(() => {
  Fetch()
  routeFuc()
})
</script>

<style lang="scss" scoped>
.BlogBottom {
  height: 80px;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 20px;
}
.avatar-uploader {
  width: 128px;
  height: 128px;
}
</style>
