import { clientPromise } from 'src/helpers/config/mongodb'
import type { Quote } from 'types/quote'


export const getRandomQuote = async (): Promise<Quote> => {
  const mongoClient = await clientPromise
  const quotes = await mongoClient
    .db('ua-db')
    .collection('ua-quotes')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()

  return JSON.parse(JSON.stringify(quotes[0]))
}
