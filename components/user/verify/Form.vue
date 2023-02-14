<template>
  <div>
    <layout-teleport to="#actions">
      <n-button type="primary" @click="submit" :loading="loading">
        <Icon name="ic:twotone-plus" class="mr-1"/>
        Cập Nhật
      </n-button>
    </layout-teleport>

    <div class="mx-auto w-[640px]">
      <n-spin :show="loading">
        <n-form
            ref="formRef"
            :model="form"
            :rules="rules"
            :label-width="160"
        >
          <n-form-item label="Tên" path="name">
            <n-input v-model:value="form.name" placeholder="Tên người vay"/>
          </n-form-item>

          <div class="flex">
            <n-form-item label="Ngày Sinh" path="born">
              <n-date-picker v-model:value="born" type="date" format="dd/MM/yyyy" />
            </n-form-item>

            <n-form-item label="CCCD/CMND" path="cccd" class="ml-11">
              <n-input v-model:value="form.cccd" placeholder="Mã số định danh người vay"/>
            </n-form-item>
          </div>

          <n-form-item label="Địa Chỉ" path="address">
            <n-input v-model:value="form.address" placeholder="Địa chỉ người vay"/>
          </n-form-item>

          <n-form-item label="Trình Độ Học Vấn" path="education">
            <n-select v-model:value="form.education" :options="educationColumes" placeholder="Trình độ học vấn" />
          </n-form-item>

          <n-form-item label="Công Việc" path="job">
            <n-input v-model:value="form.job" placeholder="Công việc người vay"/>
          </n-form-item>

          <n-form-item label="Thu Nhập Hằng Tháng" path="income">
            <n-select v-model:value="form.income" :options="inComeColumes" placeholder="Thu nhập hằng tháng" />
          </n-form-item>

          <n-form-item label="Tình Trạng Hôn Nhân" path="marriage">
            <n-select v-model:value="form.marriage" :options="marriageColumes" placeholder="Tình trạng hôn nhân" />
          </n-form-item>

          <n-form-item label="Mục Đích Vay Vốn" path="purpose">
            <n-input
                v-model:value="form.purpose"
                type="textarea"
                placeholder=""
            />
          </n-form-item>
        </n-form>
      </n-spin>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {SelectMixedOption} from "naive-ui/es/select/src/interface"
import {AdminInfo_adminInfo} from "~/apollo/queries/__generated__/AdminInfo"
import {FormRules} from "naive-ui/es/form/src/interface";
import {FormInst} from "naive-ui";
import {AdminUpdateInfo, AdminUpdateInfoVariables} from "~/apollo/mutates/__generated__/AdminUpdateInfo"

const props = defineProps<{
  initData: AdminInfo_adminInfo
}>()

const { $dayjs } = useNuxtApp()
const message = useMessage()

/**
 * Section: Get contract data
 */
const route = useRoute()
const form = ref<Partial<AdminInfo_adminInfo>>(toRaw(props.initData))

/**
 * Section: Getter fields
 */
const born = computed<number>({
  get() {
    return $dayjs(form.value.born!.join('/'), 'D/M/YYYY').valueOf()
  },
  set(value) {
    form.value.born = $dayjs(value).format('DD/M/YYYY').split('/').map(Number)
  }
})
const educationColumes: SelectMixedOption[] = [
  { label: 'Trung học cơ sở', value: 'Trung học cơ sở' },
  { label: 'Trung học phổ thông', value: 'Trung học phổ thông' },
  { label: 'Trung cấp', value: 'Trung cấp' },
  { label: 'Cao đẳng', value: 'Cao đẳng' },
  { label: 'Đại học', value: 'Đại học' },
  { label: 'Sau đại học', value: 'Sau đại học' }
]
const inComeColumes: SelectMixedOption[] = [
  { label: 'Dưới 5.000.000', value: 'Dưới 5.000.000' },
  { label: 'Từ 5.000.000 - 10.000.000', value: 'Từ 5.000.000 - 10.000.000' },
  { label: 'Từ 10.000.000 - 30.000.000', value: 'Từ 10.000.000 - 30.000.000' },
  { label: 'Trên 30.000.000', value: 'Trên 30.000.000' }
]
const marriageColumes: SelectMixedOption[] = [
  { label: 'Độc Thân', value: 'Độc Thân' },
  { label: 'Kết Hôn', value: 'Kết Hôn' },
  { label: 'Ly Hôn', value: 'Ly Hôn' }
]
// Form validate
const rules = computed<FormRules>(() => ({
  name: [
    { required: true, message: 'Tên không được để trống' },
    { min: 3, message: 'Tên phải có ít nhất 3 ký tự' },
    { max: 50, message: 'Tên không được quá 50 ký tự' }
  ],
  born: [
    { required: true, message: 'Ngày sinh không được để trống' }
  ],
  cccd: [
    { required: true, message: 'CCCD/CMND không được để trống' },
    { min: 9, message: 'CCCD/CMND phải có ít nhất 9 ký tự' },
    { max: 12, message: 'CCCD/CMND không được quá 12 ký tự' }
  ],
  address: [
    { required: true, message: 'Địa chỉ không được để trống' },
    { min: 3, message: 'Địa chỉ phải có ít nhất 3 ký tự' },
    { max: 255, message: 'Địa chỉ không được quá 255 ký tự' }
  ],
  education: [
    { required: true, message: 'Trình độ học vấn không được để trống' }
  ],
  job: [
    { required: true, message: 'Công việc không được để trống' },
    { min: 3, message: 'Công việc phải có ít nhất 3 ký tự' },
    { max: 255, message: 'Công việc không được quá 255 ký tự' }
  ],
  income: [
    { required: true, message: 'Thu nhập hằng tháng không được để trống' }
  ],
  marriage: [
    { required: true, message: 'Tình trạng hôn nhân không được để trống' }
  ],
  purpose: [
    { required: true, message: 'Mục đích vay vốn không được để trống' },
    { min: 3, message: 'Mục đích vay vốn phải có ít nhất 3 k' },
    { max: 255, message: 'Mục đích vay vốn không được quá 255 ký tự' }
  ]
}))
const formRef = ref<FormInst>()

const { mutate, loading } = useMutation<AdminUpdateInfo, AdminUpdateInfoVariables>(UPDATE_INFO)
const submit = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      return message.success('Vui lòng nhập đầy đủ thông tin')
    }
    const { __typename, id, ...data } = toRaw(form.value)
    mutate({
      input: {
        ...toRaw(data),
        user: String(route.params.id)
      }
    })
  })
}
</script>

<style scoped></style>
