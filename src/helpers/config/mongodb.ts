import type { MongoOptions } from 'mongodb'
import { MongoClient } from 'mongodb'
import { isEnvironmentDevelopment } from '../utils/isEnvironment'


const uri = process.env.NEXT_MONGO_DB_URL
const environment = process.env.NEXT_PUBLIC_NODE_ENV ?? 'development'

function getMongoDbClient(
  environment: string,
  uri: string | undefined
): Promise<MongoClient> {
  if (!uri) {
    throw new Error('Please add your MongoDb url to .env file.')
  }

  let client: MongoClient
  let clientPromise: Promise<MongoClient>

  const options: Partial<MongoOptions> = {
    retryWrites: true
  }

  if (isEnvironmentDevelopment(environment)) {
    const globalWithMongoClientPromise = global as typeof globalThis & {
      _mongoClientPromise: Promise<MongoClient>
    }

    if (!globalWithMongoClientPromise._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongoClientPromise._mongoClientPromise = client.connect()
    }

    clientPromise = globalWithMongoClientPromise._mongoClientPromise
  } else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }

  return clientPromise
}

export const clientPromise = getMongoDbClient(environment, uri)
