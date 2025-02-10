const mysql = require('mysql2/promise')

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'status_user',
  password: process.env.DB_PASSWORD || 'votre_mot_de_passe',
  database: process.env.DB_NAME || 'status_dashboard'
}

const pool = mysql.createPool(dbConfig)

module.exports = pool 