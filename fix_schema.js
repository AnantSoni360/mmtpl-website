const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// Remove @db.Text and @db.Date
schema = schema.replace(/@db\.Text/g, '');
schema = schema.replace(/@db\.Date/g, '');

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('Removed @db.Text and @db.Date');
