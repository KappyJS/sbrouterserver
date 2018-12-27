const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  
    ssl:true 
})

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})
module.exports = client
