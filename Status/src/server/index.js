require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('./config/database')

const app = express()
app.use(express.json())

// Middleware d'authentification
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    return res.sendStatus(403)
  }
}

// Vérifier s'il existe déjà un administrateur
app.get('/api/admin/check', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM administrators')
    res.json({ hasAdmin: rows[0].count > 0 })
  } catch (error) {
    console.error('Erreur lors de la vérification des administrateurs:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Configuration initiale - Création du premier administrateur
app.post('/api/admin/setup', async (req, res) => {
  try {
    // Vérifier s'il existe déjà un administrateur
    const [admins] = await db.query('SELECT COUNT(*) as count FROM administrators')
    if (admins[0].count > 0) {
      return res.status(403).json({ message: 'Un administrateur existe déjà' })
    }

    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.query(
      'INSERT INTO administrators (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    )

    res.status(201).json({ message: 'Administrateur créé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la création de l\'administrateur:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Connexion administrateur
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const [rows] = await db.query('SELECT * FROM administrators WHERE email = ?', [email])

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    const admin = rows[0]
    const validPassword = await bcrypt.compare(password, admin.password_hash)

    if (!validPassword) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token })
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Routes protégées pour les serveurs
app.get('/api/admin/servers', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM servers')
    res.json(rows)
  } catch (error) {
    console.error('Erreur lors de la récupération des serveurs:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

app.post('/api/admin/servers', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body
    const [result] = await db.query('INSERT INTO servers (name) VALUES (?)', [name])
    res.status(201).json({ id: result.insertId, name })
  } catch (error) {
    console.error('Erreur lors de l\'ajout du serveur:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

app.delete('/api/admin/servers/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM servers WHERE id = ?', [req.params.id])
    res.sendStatus(204)
  } catch (error) {
    console.error('Erreur lors de la suppression du serveur:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
}) 