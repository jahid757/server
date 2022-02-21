// Import express
const express = require('express')

// Import deposits-controller
const depositsRoutes = require('./../controllers/depositsController.js')

// Create router
const router = express.Router()

router.get('/all', depositsRoutes.depositsGetAll)

router.get('/:id/deposit', depositsRoutes.depositsGet)

router.get('/:email/client', depositsRoutes.depositsGetForClient)

router.get('/:email/availableDeposit', depositsRoutes.depositsAvaliableDepositsForClient)

router.post('/create', depositsRoutes.depositsCreate)

router.post('/approve', depositsRoutes.depositsApprove)

router.post('/update', depositsRoutes.depositsUpdate)

router.post('/delete', depositsRoutes.depositsDelete)

router.post('/drop-table', depositsRoutes.depositsDropTable)

// Export router
module.exports = router