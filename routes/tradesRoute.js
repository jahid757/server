// Import express
const express = require('express')

// Import deposits-controller
const tradesRoutes = require('./../controllers/tradesController.js')

// Create router
const router = express.Router()

router.get('/all', tradesRoutes.tradesGetAll)

router.get('/:id/trade', tradesRoutes.tradesGet)

router.get('/:email/client', tradesRoutes.tradesGetForClient)

router.post('/sale', tradesRoutes.tradesSale)

router.post('/create', tradesRoutes.tradesCreate)

router.post('/update', tradesRoutes.tradesUpdate)

router.post('/delete', tradesRoutes.tradesDelete)

router.post('/drop-table', tradesRoutes.tradesDropTable)

// Export router
module.exports = router