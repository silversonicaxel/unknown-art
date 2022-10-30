import express, { Request, Response } from 'express'
import next from 'next'
import { dev } from './config'
import { places } from './api/places'

const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

(async () => {
  try {
    await app.prepare()

    const server = express()
    
    server.all('/api/places', (req: Request, res: Response) => {
      return res.json(places)
    })
    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    server.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
