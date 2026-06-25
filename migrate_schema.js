const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Change provider
schema = schema.replace('provider = "postgresql"', 'provider = "mongodb"');

// 2. Change all id fields: `id String @id @default(cuid())` -> `id String @id @default(auto()) @map("_id") @db.ObjectId`
schema = schema.replace(/id\s+String\s+@id\s+@default\(cuid\(\)\)/g, 'id String @id @default(auto()) @map("_id") @db.ObjectId');

// 3. Find all relation fields. These are fields that end with `Id` and are of type `String` or `String?`
// E.g., `jobSeekerId  String?` -> `jobSeekerId  String? @db.ObjectId`
// E.g., `userId String @unique` -> `userId String @unique @db.ObjectId`
// Let's use a regex to find fields ending with 'Id' and type 'String' or 'String?'.
// Be careful with unique constraints.
const relationRegex = /([a-zA-Z]+Id\s+String\??)(\s+@unique)?/g;
schema = schema.replace(relationRegex, '$1 @db.ObjectId$2');

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('Schema migrated to MongoDB successfully!');
