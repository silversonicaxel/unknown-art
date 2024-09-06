import type { EmptyObject } from 'type-fest'

import { isObjectNull } from './isObjectNull'


export const filterObjectByKeys = <T extends boolean = false>(
  obj: Record<string, string | null | undefined> | EmptyObject,
  keys: string[],
  onlySetValues?: T,
): T extends true
  ? Record<string, string> | EmptyObject
  : Record<string, string | null | undefined> | EmptyObject => {
  if (isObjectNull(obj) || keys.length === 0) {
    return {}
  }

  return Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((filteredObj: Record<string, string | null | undefined>, key: string) => {
      const objValue = (obj as Record<string, string | null | undefined>)[key]
      if (!onlySetValues || (objValue !== null && objValue !== undefined)) {
        filteredObj[key] = objValue
      }
      return filteredObj
    }, {})
}
