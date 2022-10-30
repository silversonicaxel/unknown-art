import express, { Request, Response } from 'express'
import next from 'next'
import { dev, port, server } from './config'
import { places } from './api/places'

const app = next({ dev })
const handle = app.getRequestHandler()

;(async () => {
  try {
    await app.prepare()

    const appServer = express()
    
    appServer.all('/api/places', (_: Request, res: Response) => {
      return res.json(places)
    })
    appServer.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    appServer.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`Express server ready on ${server} for the environment ${dev ? 'development' : 'production'}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
