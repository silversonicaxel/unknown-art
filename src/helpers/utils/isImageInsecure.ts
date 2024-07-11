

export const isImageInsecure = (imageUrl: string): boolean => {
  return !imageUrl.toLowerCase().startsWith('https://')
}
