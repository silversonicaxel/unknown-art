import type { EmptyObject } from 'type-fest'

import { isObjectNull } from './isObjectNull'


export const purgeObjectEmptyValues = (
  obj: Record<string, string | null | undefined> | EmptyObject
) => {
  if (isObjectNull(obj)) {
    return obj
  }

  const purgedObj: Record<string, string> = {}
  Object.entries(obj)
    .forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        purgedObj[key] = value
      }
    })

  return purgedObj
}
