// Import express
const express = require('express')

// Import deposits-controller
const userSalesRoutes = require('../controllers/userSalesController.js')

// Create router
const router = express.Router()

router.get('/all', userSalesRoutes.userSalesGetAll)

router.get('/:id/userSale', userSalesRoutes.userSalesGet)

router.post('/create', userSalesRoutes.userSalesCreate)

router.get('/:email/client', userSalesRoutes.userSalesGetForClient)

router.post('/update', userSalesRoutes.userSalesUpdate)

router.post('/delete', userSalesRoutes.userSalesDelete)

router.post('/drop-table', userSalesRoutes.userSalesDropTable)

// Export router
module.exports = router