const express = require('express')
const router = express.Router()

module.exports = (db) => {
  // GET all cambios_puestos
  router.get('/', async (req, res) => {
    try {
      const cambios = await db('cambios_puestos').select('*')
      res.json({ success: true, data: cambios, count: cambios.length })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  // GET single cambio by ID
  router.get('/:id', async (req, res) => {
    try {
      const cambio = await db('cambios_puestos').where('id', req.params.id).first()
      if (!cambio) {
        return res.status(404).json({ success: false, error: 'Cambio de puesto not found' })
      }
      res.json({ success: true, data: cambio })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  // POST create new cambio_puesto
  router.post('/', async (req, res) => {
    try {
      const { usuario_id, espacio_id, fecha_de_entrada, fecha_de_salida } = req.body

      if (!usuario_id || !espacio_id || !fecha_de_entrada) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: usuario_id, espacio_id, fecha_de_entrada'
        })
      }

      const newCambio = await db('cambios_puestos').insert({
        usuario_id,
        espacio_id,
        fecha_de_entrada,
        fecha_de_salida: fecha_de_salida || null
      })

      res.status(201).json({
        success: true,
        message: 'Cambio de puesto created successfully',
        id: newCambio[0]
      })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
    }
  })

  return router
}
