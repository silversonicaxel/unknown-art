// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { MongoClient } from 'mongodb'


const uri = process.env.MONGO_DB_URL || null
const environment = process.env.NODE_ENV || 'development'

export const clientPromise = getMongoDbClient(environment, uri)

function getMongoDbClient(
  environment: string,
  uri: string
): Promise<MongoClient> {
  let client
  let clientPromise: Promise<MongoClient>

  if (!uri) {
    throw new Error('Add Mongo URI to .env.local')
  }

  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }

  if (environment === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }

  return clientPromise
}
