import type { EmptyObject } from 'type-fest'


export const isObjectNull = (
  obj: Record<string, string | null | undefined> | EmptyObject
) => {
  return Object.values(obj).every(value => value === '' || value === null || value === undefined)
}
