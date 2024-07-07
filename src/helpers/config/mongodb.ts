import { MongoClient } from 'mongodb'


const uri = process.env.MONGO_DB_URL
const environment = process.env.NODE_ENV || 'development'

function getMongoDbClient(
  environment: string,
  uri: string | undefined
): Promise<MongoClient> {
  if (!uri) {
    throw new Error("Please add your MongoDb url to .env file.")
  }

  let client: MongoClient
  let clientPromise: Promise<MongoClient>

  if (environment === "development") {
    const globalWithMongoClientPromise = global as typeof globalThis & {
      _mongoClientPromise: Promise<MongoClient>
    }

    if (!globalWithMongoClientPromise._mongoClientPromise) {
      client = new MongoClient(uri)
      globalWithMongoClientPromise._mongoClientPromise = client.connect()
    }

    clientPromise = globalWithMongoClientPromise._mongoClientPromise
  } else {
    client = new MongoClient(uri)
    clientPromise = client.connect()
  }

  return clientPromise
}

export const clientPromise = getMongoDbClient(environment, uri)
