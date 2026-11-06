
const database = db.getSiblingDB("myapp");

// Create users collection
database.createCollection("users");

// Create unique email index
database.users.createIndex(
  { email: 1 },
  { unique: true }
);

print("MongoDB initialized successfully!");
