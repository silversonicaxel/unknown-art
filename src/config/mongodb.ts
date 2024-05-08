// @ts-nocheck
import { MongoClient } from 'mongodb'


const uri = process.env.MONGO_DB_URL || null
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise: Promise<MongoClient>

if (!uri) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
