<template>
  <div>
    auth page
  </div>
</template>

<script lang="ts" setup>
import {FirebaseError} from "@firebase/util";
import {AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth"


const from = reactive({
  email: '123456789',
  password: '123456789',
  rePassword: '123456789'
})

const [isLogin, toggleLogin] = useToggle(true)
/**
 * Section: Form Handle
 */
const errorExtracted =  (_e: FirebaseError) => {
  if (_e.code === AuthErrorCodes.USER_DELETED) {
    //errorMessages.total = 'Tài khoản không tồn tại'
  } else if (_e.code === AuthErrorCodes.USER_DISABLED) {
    //errorMessages.total = 'Tài khoản đã bị khóa'
  } else if (_e.code === AuthErrorCodes.INVALID_PASSWORD) {
    //errorMessages.total = 'Mật khẩu không đúng'
  } else if (_e.code === AuthErrorCodes.INVALID_EMAIL) {
    //errorMessages.total = 'Email không hợp lệ'
  } else {
    // errorMessages.total = 'Đăng nhập thất bại'
  }
}
const register = async () =>
{
  try {
    if(isLogin) {
      await signInWithEmailAndPassword(faAuth(), from.email + '@gmail.com', from.password)
    } else {
      await createUserWithEmailAndPassword(faAuth(), from.email + '@gmail.com', from.password)
    }

  } catch (e) {
    console.log(e)
    errorExtracted(e as FirebaseError)
    //
  }
}
const onSubmit = async () => {
  showLoadingToast('')
  await register()
  closeToast()
}


/**
 * Section: Form Validator
 */
const validatorPassword = (val: string) => {
  if(val.length < 6) {
    return 'Mật khẩu phải lớn hơn 6 ký tự'
  }
}
// Repassword
const validatorRePassword = (val: string) => {
  if(val !== from.password) {
    return 'Mật khẩu không khớp'
  }
}
</script>

<style scoped></style>
