const express = require('express')
const router = express.Router()

module.exports = (db) => {
  // GET all rates
  router.get('/', async (req, res) => {
    try {
      const rates = await db('rates').select('*')
      res.json({ success: true, data: rates, count: rates.length })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  // GET single rate by ID
  router.get('/:id', async (req, res) => {
    try {
      const rate = await db('rates').where('id', req.params.id).first()
      if (!rate) {
        return res.status(404).json({ success: false, error: 'Rate not found' })
      }
      res.json({ success: true, data: rate })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  // POST create new rate
  router.post('/', async (req, res) => {
    try {
      const { nombre, descripcion } = req.body

      if (!nombre) {
        return res.status(400).json({
          success: false,
          error: 'Missing required field: nombre'
        })
      }

      const newRate = await db('rates').insert({
        nombre,
        descripcion: descripcion || null
      })

      res.status(201).json({
        success: true,
        message: 'Rate created successfully',
        id: newRate[0]
      })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  return router
}
