const express = require('express')
const router = express.Router()

module.exports = (db) => {
  // GET all usuarios
  router.get('/', async (req, res) => {
    try {
      const usuarios = await db('usuarios').select('*')
      res.json({ success: true, data: usuarios, count: usuarios.length })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  // GET single usuario by ID
  router.get('/:id', async (req, res) => {
    try {
      const usuario = await db('usuarios').where('id', req.params.id).first()
      if (!usuario) {
        return res.status(404).json({ success: false, error: 'Usuario not found' })
      }
      res.json({ success: true, data: usuario })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  // POST create new usuario
  router.post('/', async (req, res) => {
    try {
      const { nombre, email, telefono, contrasena, role, estado } = req.body

      if (!nombre || !email || !telefono || !contrasena) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: nombre, email, telefono, contrasena'
        })
      }

      const newUsuario = await db('usuarios').insert({
        nombre,
        email,
        telefono,
        contrasena,
        role: role || 'usuario',
        estado: estado || 'activo'
      })

      res.status(201).json({
        success: true,
        message: 'Usuario created successfully',
        id: newUsuario[0]
      })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  return router
}
