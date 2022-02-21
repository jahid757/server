// Import express
const express = require('express')

// Import deposits-controller
const productsRoutes = require('./../controllers/productsController.js')

// Create router
const router = express.Router()

router.get('/all', productsRoutes.productsGetAll)

router.get('/:id/product', productsRoutes.productsGet)

router.post('/create', productsRoutes.productsCreate)

router.post('/update', productsRoutes.productsUpdate)

router.post('/delete', productsRoutes.productsDelete)

router.post('/drop-table', productsRoutes.productsDropTable)

// Export router
module.exports = router