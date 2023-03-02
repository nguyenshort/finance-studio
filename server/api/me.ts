import { defineEventHandler, getHeader, createError, deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  try {
    const token = getHeader(event, 'Authorization')

    if (!token) {
      return createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    const user = await $fetch<{ _id: string, role: number }>(new URL('/auth', runtimeConfig.public.apiBackend).href, {
      headers: {
        Authorization: token
      }
    })
    // @ts-ignore
    if (Number(user?.role) === 0) {
        return createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    return {
        user
    }

  } catch (e) {
    // removeAll()
    //
  }
  return createError({
    statusCode: 401,
    message: 'Unauthorized'
  })
})
