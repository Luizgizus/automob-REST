const MYSQL = require('mysql')
const util = require('util')

function getPool() {
    const connection = MYSQL.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'automob'
    });

    connection.query = util.promisify(connection.query).bind(connection)
    return connection
}

module.exports = {
    getPool: getPool
}