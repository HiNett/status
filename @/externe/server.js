require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

// Middleware
app.use(cors({
  origin: 'http://status.fpht.eu',
  credentials: true
}))
app.use(express.json())

// Configuration de la base de données
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'fpht_admin',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'fpht_status_db'
})

// Vérification de l'existence d'un admin
app.get('/api/admin/check', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM administrators')
    res.json({ hasAdmin: rows[0].count > 0 })
  } catch (error) {
    console.error('Erreur lors de la vérification admin:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Inscription admin
app.post('/api/admin/register', async (req, res) => {
  try {
    // Vérifier s'il existe déjà un admin
    const [admins] = await pool.query('SELECT COUNT(*) as count FROM administrators')
    if (admins[0].count > 0) {
      return res.status(403).json({ message: 'Un administrateur existe déjà' })
    }

    const { username, email, password } = req.body

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insertion de l'admin
    await pool.query(
      'INSERT INTO administrators (username, email, password, is_first_admin) VALUES (?, ?, ?, true)',
      [username, email, hashedPassword]
    )

    // Génération du token JWT
    const token = jwt.sign(
      { username, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token })
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    res.status(500).json({ message: 'Erreur lors de l\'inscription' })
  }
})

// Connexion admin
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Recherche de l'administrateur
    const [rows] = await pool.query(
      'SELECT * FROM administrators WHERE username = ?',
      [username]
    )

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Identifiants incorrects' })
    }

    const admin = rows[0]

    // Vérification du mot de passe
    const validPassword = await bcrypt.compare(password, admin.password)
    if (!validPassword) {
      return res.status(401).json({ message: 'Identifiants incorrects' })
    }

    // Génération du token JWT
    const token = jwt.sign(
      { username: admin.username, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token })
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    res.status(500).json({ message: 'Erreur lors de la connexion' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
}) 