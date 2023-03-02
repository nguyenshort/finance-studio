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
import {FormRules} from "naive-ui/es/form/src/interface"
import {FormInst} from "naive-ui";
import {SignIn, SignInVariables} from "~/apollo/mutates/__generated__/SignIn";
import {SIGN_IN} from "~/apollo/mutates/auth.mutate";
import {SignInInput} from "~/apollo/__generated__/serverTypes";

definePageMeta({
  layout: 'blank'
})

/**
 * Section: Form Setup
 */
const formRef = ref<FormInst>()
const message = useMessage()

const { mutate: signIn, loading: loadingSignIn } = useMutation<SignIn, SignInVariables>(SIGN_IN)
const from = reactive<SignInInput>({
  email: '0396094050',
  password: 'Khoi025'
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

const writeToken = async (token: string, notify: string) => {
  try {
    await $fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        token
      })
    })
    // showNotify({
    //   type: 'success',
    //   message: notify
    // })

    setTimeout(() => {
      window.location.href = '/'
    }, 500)
  } catch (e) {
    //
  }
}
/**
 * Section: Form Handle
 */
const authHandle = async () => {
  try {
    const res = await signIn({
      input: {
        email: from.email,
        password: from.password
      }
    })
    if (res?.data?.signIn) {
      await writeToken(res?.data?.signIn, 'Đăng Nhập Thành Công')
    }
  } catch (e) {
  }
}
const onSubmit = async () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      return message.error('Vui lòng nhập đầy đủ thông tin')
    }
    authHandle()
  })
}
</script>

<style scoped></style>
