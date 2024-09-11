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
    iso: "NL",
    city: "Amsterdam"
  },
  {
    id: "2",
    name: "Place 2",
    address: "Address 2",
    iso: "DE",
    city: "Berlin"
  },
  {
    id: "3",
    name: "Place 3",
    address: "Address 3",
    iso: "IT",
    city: "Milan"
  },
  {
    id: "4",
    name: "Place 4",
    address: "Address 4",
    site: "https://example.com/place4",
    iso: "NL",
    city: "Rotterdam"
  },
  {
    id: "5",
    name: "Place 5",
    address: "Address 5",
    iso: "DE",
    city: "Berlin"
  },
  {
    id: "6",
    name: "Place 6",
    address: "Address 6",
    iso: "IT",
    city: "Reggio Emilia"
  },
  {
    id: "7",
    name: "Place 7",
    address: "Address 7",
    site: "https://example.com/place7",
    iso: "NL",
    city: "Amsterdam"
  },
  {
    id: "8",
    name: "Place 8",
    address: "Address 8",
    iso: "DE",
    city: "Berlin"
  },
  {
    id: "9",
    name: "Place 9",
    address: "Address 9",
    iso: "IT",
    city: "Milan"
  },
  {
    id: "10",
    name: "Place 10",
    address: "Address 10",
    site: "https://example.com/place10",
    iso: "NL",
    city: "Amsterdam"
  },
  {
    id: "11",
    name: "Place 11",
    address: "Address 11",
    site: "https://example.com/place11",
    iso: "NL",
    city: "Amsterdam"
  },
  {
    id: "12",
    name: "Place 12",
    address: "Address 12",
    iso: "DE",
    city: "Berlin"
  },
  {
    id: "13",
    name: "Place 13",
    address: "Address 13",
    iso: "IT",
    city: "Reggio Emilia"
  }
])

db.createCollection('ua-isos')
db['ua-isos'].insert([
  {
    DE: "Germany",
    IT: "Italy",
    NL: "Netherlands"
  }
])
