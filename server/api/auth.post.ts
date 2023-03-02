import { defineEventHandler, readBody, setCookie, createError } from 'h3'
export default defineEventHandler(async (event) => {
  const { token }: { token: string } = await readBody(event)
  if(!token) {
    return createError({
      status: 401,
      message: 'Unauthorized'
    })
  }

  const runtimeConfig = useRuntimeConfig()
  try {
    // verify token
    const res = await $fetch<{ _id: string, role: number }>(new URL('/users/me', runtimeConfig.public.apiBackend).href, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (Number(res.role) === 0) {
        return createError({
            status: 401,
            message: 'Unauthorized'
        })
    }
    setCookie(event, '_token', token)

    return  {
      id: res._id
    }
  } catch (e) {
    //
  }
  return createError({
    status: 401,
    message: 'Unauthorized'
  })
})
