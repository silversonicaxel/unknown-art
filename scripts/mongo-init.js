db = db.getSiblingDB('ua-db')
db.createUser(
  {
    user: 'myUser',
    pwd: 'myPassword',
    roles: [{ role: 'readWrite', db: 'ua-db' }],
  },
)

db.createCollection('ua-quotes')
db['ua-quotes'].insert({
  message: "This is a sample quote",
  author: "Author Name"
})

db.createCollection('ua-places')
db['ua-places'].insertMany([
  {
    id: "1",
    name: "Place 1",
    address: "Address 1",
    site: "https://example.com/place1",
    iso: "US",
    city: "City 1"
  },
  {
    id: "2",
    name: "Place 2",
    address: "Address 2",
    iso: "DE"
  },
  {
    id: "3",
    name: "Place 3",
    address: "Address 3",
    iso: "IT",
    city: "Milan"
  }
])

db.createCollection('ua-isos')
db['ua-isos'].insertMany([
  {
    DE: "Germany",
  },
  {
    US: "United States",
  },
  {
    IT: "Italy"
  }
])
