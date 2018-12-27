const { Client } = require('pg');
const client = new Client({
    user: 'whoigvgbozbtli',
    host: 'ec2-46-137-99-175.eu-west-1.compute.amazonaws.com',
    database: 'd6kqrlrip5n24n',
    password: '701568d08b10dcf8daded3e9b6a639fcb096b302dd90324722ad9666edaaaf79',
    port: 5432,
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
