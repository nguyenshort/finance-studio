<template>
  <div class="w-full h-full flex items-center justify-center">
    <n-form
        ref="formRef"
        :model="from"
        :rules="rules"
        class="w-[300px]"
    >
      <n-form-item path="email" label="Số Điện Thoại">
        <n-input v-model:value="from.email" />
      </n-form-item>
      <n-form-item path="password" label="Mật Khẩu">
        <n-input
            v-model:value="from.password"
            type="password"
        />
      </n-form-item>
      <div class="flex justify-end">
        <n-button
            round
            type="primary"
            @click="onSubmit"
        >
          Đăng Nhập
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import {FirebaseError} from "@firebase/util"
import {AuthErrorCodes, signInWithEmailAndPassword} from "@firebase/auth"
import {FormRules} from "naive-ui/es/form/src/interface"
import {FormInst} from "naive-ui";

definePageMeta({
  layout: 'blank'
})

/**
 * Section: Form Setup
 */
const formRef = ref<FormInst>()
const message = useMessage()

const from = reactive({
  email: '123456789',
  password: '123456789'
})
// validate email and password
const rules = computed<FormRules>(() => ({
  email: [
    {
      required: true,
      message: 'Vui lòng nhập số điện thoại'
    }
  ],
  password: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu'
    },
    {
      min: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự'
    }
  ]
}))
/**
 * Section: Form Handle
 */
const errorExtracted =  (_e: FirebaseError) => {
  if (_e.code === AuthErrorCodes.USER_DELETED) {
    message.error('Tài khoản không tồn tại')
    //errorMessages.total = 'Tài khoản không tồn tại'
  } else if (_e.code === AuthErrorCodes.USER_DISABLED) {
    //errorMessages.total = 'Tài khoản đã bị khóa'
    message.error('Tài khoản đã bị khóa')
  } else if (_e.code === AuthErrorCodes.INVALID_PASSWORD) {
    //errorMessages.total = 'Mật khẩu không đúng'
    message.error('Mật khẩu không đúng')
  } else if (_e.code === AuthErrorCodes.INVALID_EMAIL) {
    //errorMessages.total = 'Email không hợp lệ'
    message.error('Email không hợp lệ')
  } else {
    // errorMessages.total = 'Đăng nhập thất bại'
    message.error('Đăng nhập thất bại')
  }
}
const register = async () => {
  try {
    await signInWithEmailAndPassword(faAuth(), from.email + '@gmail.com', from.password)
    message.success('Đăng nhập thành công')
  } catch (e) {
    errorExtracted(e as FirebaseError)
  }
}
const onSubmit = async () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      return message.error('Vui lòng nhập đầy đủ thông tin')
    }
    register()
  })
}
</script>

<style scoped></style>
