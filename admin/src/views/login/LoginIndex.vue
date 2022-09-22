<template>
  <div>
    <div class="cain_login">
      <h4>博客后台管理系统</h4>
      <div>
        <a-form
          ref="formRef"
          name="custom-validation"
          :model="formState"
          :rules="rules"
          v-bind="layout"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
          hideRequiredMark
        >
          <a-form-item has-feedback label="账号" name="adminuser">
            <a-input v-model:value="formState.adminuser" type="text" autocomplete="off" />
          </a-form-item>
          <a-form-item has-feedback label="密码" name="adminpass">
            <a-input v-model:value="formState.adminpass" type="password" autocomplete="off" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" html-type="submit">登录</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">注册</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { login } from '../../service/Login'
interface FormState {
  adminuser: string
  adminpass: string
}
const formRef = ref<FormInstance>()
const formState = reactive<FormState>({
  adminuser: '',
  adminpass: ''
})
let adminuser = async (_rule: Rule, value: string) => {
  if (value.length < 6) {
    return Promise.reject('账号长度不符合')
  }
}
let adminpass = async (_rule: Rule, value: string) => {
  if (value.length < 5) {
    return Promise.reject('密码长度不符合')
  }
}

const rules: Record<string, Rule[]> = {
  adminuser: [{ validator: adminuser, trigger: 'change' }],
  adminpass: [{ validator: adminpass, trigger: 'change' }]
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}
const handleFinish = async (values: FormState) => {
  await login(values)
  console.log(values, formState)
}
const handleFinishFailed = (errors: any) => {
  console.log(errors)
}
const resetForm = () => {
  formRef.value.resetFields()
}
// const handleValidate = (...args) => {
//   console.log(args)
// }
</script>

<style lang="scss">
.cain_login {
  width: 400px;
  margin: 0 auto;
  position: relative;
  top: 200px;
  text-align: center;
  border: 1px black solid;
  h4 {
    font-size: 20px;
  }
}
</style>
