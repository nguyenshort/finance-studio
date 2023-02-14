//CDN
export enum CDNLocation {
  LOCAL
}

export const $cdn = (path: string, location = CDNLocation.LOCAL) => {
  const runtime = useRuntimeConfig()

  if (!path) {
    return ''
  }

  if (/^http/.test(path)) {
    return path
  }

  let host

  switch (location) {
    default:
    host = runtime.public.cdnEndpoint
  }

  return new URL(path, host).href
}
