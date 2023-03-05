<template>
  <div class="flex">
    <div class="w-[600px]">

      <div class="mb-5">
        <button
            v-for="item in lists"
            :key="item"
            class="text-white px-3 py-1.5 rounded-md uppercase mr-4"
            :class="{
              'bg-primary-600': activeBank === item,
              'bg-gray-300': activeBank !== item,
            }"
            :disabled="activeBank !== 'vcb'"
            @click="activeBank = item"
        >
          {{ item }}
        </button>
      </div>

      <n-form class="max-w-[400px]">
        <n-form-item label="Số tiền">
          <n-input-number v-model:value="banks[activeBank].config.amount.value" />
        </n-form-item>
        <n-form-item label="Người hưởng thụ">
          <n-input v-model:value="banks[activeBank].config.name.value" />
        </n-form-item>

        <n-form-item label="Số tài khoản">
          <n-input v-model:value="banks[activeBank].config.account.value" />
        </n-form-item>

        <n-form-item label="Ngân hàng hưởng thụ">
          <n-input v-model:value="banks[activeBank].config.bank.value" />
        </n-form-item>

        <n-form-item label="Mã giao dịch">
          <n-input v-model:value="banks[activeBank].config.id.value" />
        </n-form-item>

        <n-form-item label="Người chuyển">
          <n-input v-model:value="banks[activeBank].config.note.value" />
        </n-form-item>
      </n-form>

      <div class="flex">
        <n-button type="info" @click="copyImage">
          Sao Chép
        </n-button>

        <div class="w-3"></div>

        <n-button type="info" @click="exportImage">
          Tải Xuống
        </n-button>
      </div>
    </div>
    <div class="w-[280px]">
      <creator-bill
          ref="billRef"
          :config="config"
          :image="image"
          :class="{
             'text-white': activeBank === 'vcb',
          }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toBlob } from 'html-to-image'
import download from 'downloadjs'
import {BankConfig, BankCreatorProps, BankFields} from "~/entities/creator.entity"

const banks = reactive<Record<string, BankCreatorProps>>({
  vcb: {
    image: '/images/banks/vcb.jpg',
    config: {
      amount: {
        value: 0,
        style: {
          top: '158px',
          right: '0px',
          left: '0px',
          textAlign: 'center',
          color: '#7cc40c',
          fontSize: '13px',
          fontWeight: 500,
        },
      },
      name: {
        value: 'Nguyễn Văn A',
        style: {
          top: '220px',
          right: '10px',
          fontSize: '11px',
          fontWeight: 500,
        },
      },
      account: {
        value: '123456789',
        style: {
          top: '260px',
          right: '10px',
          fontSize: '11px',
          fontWeight: 500,
        },
      },
      bank: {
        value: 'TEACHCOMBANK - Kỹ thuật công nghệ',
        style: {
          top: '301px',
          right: '10px',
          textAlign: 'right',
          fontSize: '11px',
          maxWidth: '120px',
          fontWeight: 500,
          lineHeight: 'normal'
        },
      },
      id: {
        value: '123456789',
        style: {
          top: '350px',
          right: '10px',
          textAlign: 'right',
          fontSize: '11px',
          maxWidth: '120px',
          fontWeight: 500,
        },
      },
      note: {
        value: 'VO VAN NHO',
        style: {
          top: '390px',
          right: '10px',
          textAlign: 'right',
          fontSize: '11px',
          maxWidth: '120px',
          lineHeight: 'normal',
          fontWeight: 500,
        },
      }
    },
  },
  tech: {
    image: '/images/banks/tech.jpg',
    config: {
      amount: {
        value: 0,
        style: {
          top: '158px',
          right: '0px',
          left: '0px',
          textAlign: 'center',
          color: '#7cc40c',
          fontSize: '13px',
          fontWeight: 500,
        },
      },
      name: {
        value: '',
        style: {
          top: '220px',
          right: '10px',
          fontSize: '11px',
          fontWeight: 500,
        },
      },
      account: {
        value: '',
        style: {
          top: '260px',
          right: '10px',
          fontSize: '11px',
          fontWeight: 500,
        },
      },
      bank: {
        value: '',
        style: {
          top: '301px',
          right: '10px',
          textAlign: 'right',
          fontSize: '11px',
          maxWidth: '120px',
          fontWeight: 500,
          lineHeight: 'normal'
        },
      },
      id: {
        value: '',
        style: {
          top: '350px',
          right: '10px',
          textAlign: 'right',
          fontSize: '11px',
          maxWidth: '120px',
          fontWeight: 500,
        },
      },
      note: {
        value: '',
        style: {
          top: '390px',
          right: '10px',
          textAlign: 'right',
          fontSize: '11px',
          maxWidth: '120px',
          lineHeight: 'normal',
          fontWeight: 500,
        },
      }
    },
  }
})

const lists = ref(['vcb'])
const activeBank = ref('vcb')
const { $dayjs, $moneyFormat } = useNuxtApp()

const config = ref<BankConfig>(banks[activeBank.value].config)

watch(() => banks[activeBank.value], (value) => {
  const _config = JSON.parse(JSON.stringify(value.config))
  if(activeBank.value === 'vcb') {
    _config.time = {
      value: $dayjs().format('HH:mm dddd DD/MM/YYYY'),
      style: {
        top: '183px',
        right: '0px',
        left: '0px',
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#8c959b',
        fontSize: '8px',
        fontWeight: 500
      }
    }
    _config.amount.value = $moneyFormat(_config.amount.value || 0) + ' VNĐ'
  }
  config.value = _config
}, { deep: true})

const image = computed(() => banks[activeBank.value].image)


/**
 * Dowloadng image
 */
const billRef = ref()
const { width, height } = useElementSize(billRef)

const copyImage = async () => {
  if(!billRef.value) {
    return
  }

  const _file = await toBlob(billRef.value.$el, {
    canvasWidth: 600,
    canvasHeight: 600 * (height.value / width.value),
  })
  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': _file!
    })
  ]);
}
const exportImage = async () => {
  if(!billRef.value) {
    return
  }

  const _file = await toBlob(billRef.value.$el, {
    canvasWidth: 600,
    canvasHeight: 600 * (height.value / width.value),
  })
  if(_file) {
    download(_file, 'bill.png')
  }
}

</script>

<style scoped>
#name {
  top: 220px;
  right: 10px;
  font-size: 11px;
  font-weight: 500;
}
</style>
