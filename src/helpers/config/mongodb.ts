import type { MongoClientOptions } from 'mongodb'
import { MongoClient } from 'mongodb'
import { isEnvironmentDevelopment } from '../utils/isEnvironment'


const MONGODB_URI = process.env.NEXT_MONGO_DB_URL ?? ''
const MONGODB_ENV = process.env.NEXT_PUBLIC_NODE_ENV ?? 'development'

type MongoClientFactoryParams = {
  uri: string | undefined,
  environment: string,
}

type MongoClientFactoryResult = Promise<MongoClient>

type MongoClientFactoryFunction = (params: MongoClientFactoryParams) => MongoClientFactoryResult

const getMongoDbClient: MongoClientFactoryFunction = async ({ uri, environment }) => {
  if (!uri) {
    throw new Error('MongoDB connection URI is missing in .env file.')
  }

  const options: MongoClientOptions = {
    retryWrites: true,
  }

  let globalClientPromise!: MongoClientFactoryResult

  try {
    if (isEnvironmentDevelopment(environment)) {
      if (!globalClientPromise) {
        const client = new MongoClient(uri, options)
        globalClientPromise = client.connect()
      }
      return globalClientPromise
    } else {
      const client = new MongoClient(uri, options)
      return client.connect()
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    throw error
  }
}

export const mongoDbPromise = getMongoDbClient({ uri: MONGODB_URI, environment: MONGODB_ENV })
