// Import express
const express = require('express')

// Import deposits-controller
const userSharesSalesRoutes = require('../controllers/userSharesSalesController.js')

// Create router
const router = express.Router()

router.get('/:id/userSharesSales', userSharesSalesRoutes.userSharesSalesGet)

router.post('/create', userSharesSalesRoutes.userSharesSalesCreate)

router.post('/update', userSharesSalesRoutes.userSharesSalesUpdate)

router.post('/delete', userSharesSalesRoutes.userSharesSalesDelete)

router.post('/drop-table', userSharesSalesRoutes.userSharesSalesDropTable)

// Export router
module.exports = router