const express = require('express')
const knex = require('knex')
const dbConfig = require('./database/db.config.js')

// Import route handlers
const usuariosRoutes = require('./routes/usuarios')
const espaciosParqueoRoutes = require('./routes/espacios_parqueo')
const vehiculosRoutes = require('./routes/vehiculos')
const ticketsRoutes = require('./routes/tickets')
const notificacionesRoutes = require('./routes/notificaciones')
const cambiosPuestosRoutes = require('./routes/cambios_puestos')
const auditLogsRoutes = require('./routes/audit_logs')
const espaciosDisponiblesRoutes = require('./routes/espacios_disponibles')
const reservacionesRoutes = require('./routes/reservaciones')
const seccionesParqueoRoutes = require('./routes/secciones_parqueo')
const pagosRoutes = require('./routes/pagos')
const ratesRoutes = require('./routes/rates')

const app = express()
const port = 3000

// Initialize database connection
const db = knex({
  client: 'mysql2',
  connection: dbConfig
})

app.use(express.json())

// Home endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AUTOPARK UASD API',
    status: 'running',
    availableEndpoints: {
      usuarios: '/api/usuarios',
      espacios_parqueo: '/api/espacios_parqueo',
      vehiculos: '/api/vehiculos',
      tickets: '/api/tickets',
      notificaciones: '/api/notificaciones',
      cambios_puestos: '/api/cambios_puestos',
      audit_logs: '/api/audit_logs',
      espacios_disponibles: '/api/espacios_disponibles',
      reservaciones: '/api/reservaciones',
      secciones_parqueo: '/api/secciones_parqueo',
      pagos: '/api/pagos',
      rates: '/api/rates'
    }
  })
})

// Register routes
app.use('/api/usuarios', usuariosRoutes(db))
app.use('/api/espacios_parqueo', espaciosParqueoRoutes(db))
app.use('/api/vehiculos', vehiculosRoutes(db))
app.use('/api/tickets', ticketsRoutes(db))
app.use('/api/notificaciones', notificacionesRoutes(db))
app.use('/api/cambios_puestos', cambiosPuestosRoutes(db))
app.use('/api/audit_logs', auditLogsRoutes(db))
app.use('/api/espacios_disponibles', espaciosDisponiblesRoutes(db))
app.use('/api/reservaciones', reservacionesRoutes(db))
app.use('/api/secciones_parqueo', seccionesParqueoRoutes(db))
app.use('/api/pagos', pagosRoutes(db))
app.use('/api/rates', ratesRoutes(db))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ success: false, error: 'Internal Server Error' })
})

app.listen(port, () => {
  console.log(`AUTOPARK API server listening on port ${port}`)
})