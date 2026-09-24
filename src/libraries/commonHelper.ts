const isObject = (value: unknown): value is Record<string, unknown> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof FormData)
  )
}
const trimStrings = (obj: unknown): unknown => {
  if (typeof obj === 'string') {
    return obj.trim()
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => trimStrings(item))
  }

  if (isObject(obj)) {
    const trimmedObj: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      trimmedObj[key] = trimStrings(value)
    }
    return trimmedObj
  }

  return obj
}
export default {
  trimStrings,
  isObject,
}
