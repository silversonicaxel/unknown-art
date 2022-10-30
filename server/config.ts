export const dev = process.env.NODE_ENV !== 'production'

export const port = process.env.PORT ? Number(process.env.PORT) : 3000

export const server = dev ? 'http://localhost:3000/' : 'http://unknown-art.com/'
