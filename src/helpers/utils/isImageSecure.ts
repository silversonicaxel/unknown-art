export const isImageSecure = (imageUrl: string): boolean => {
  return imageUrl.toLowerCase().startsWith('https://')
}
