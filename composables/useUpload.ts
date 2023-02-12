export const useUpload = () => {
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()

  const upload = async (doc: Blob, group: 'image' | 'document', endpoint: string) => {
    const formData = new FormData()
    formData.append(group, doc)
    formData.append('endpoint', endpoint)
    const data = await $fetch<{
      file: string
    }>(new URL(`/upload/${group}`, runtimeConfig.public.apiBackend).href, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    return data.file
  }

  const document = async (doc: Blob, endpoint: string) => upload(doc, 'document', endpoint)
  const image = async (doc: Blob, endpoint: string) => upload(doc, 'image', endpoint)

  return {
    document,
    image
  }
}
