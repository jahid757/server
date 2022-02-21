// Import express
const express = require('express')

// Import deposits-controller
const sentPaymentDetailsRoute = require('./../controllers/sentPaymentDetailsController.js')

// Create router
const router = express.Router()

router.get('/all', sentPaymentDetailsRoute.sentPaymentDetailsGetAll)

router.get('/:id/sentPaymentDetail', sentPaymentDetailsRoute.sentPaymentDetailsGet)

router.post('/create', sentPaymentDetailsRoute.sentPaymentDetailsCreate)

router.post('/update', sentPaymentDetailsRoute.sentPaymentDetailsUpdate)

router.post('/delete', sentPaymentDetailsRoute.sentPaymentDetailsDelete)

// Export router
module.exports = router