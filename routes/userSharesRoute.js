// Import express
const express = require('express')

// Import deposits-controller
const userSharesRoute = require('./../controllers/userSharesController.js')

// Create router
const router = express.Router()

router.get('/all', userSharesRoute.userSharesGetAll)

router.get('/:id/trade', userSharesRoute.userSharesGet)

router.get('/:email/client', userSharesRoute.userSharesGetForClient)

router.post('/create', userSharesRoute.userSharesCreate)

router.post('/sale', userSharesRoute.userSharesSale)

router.post('/update', userSharesRoute.userSharesUpdate)

router.post('/delete', userSharesRoute.userSharesDelete)

router.post('/drop-table', userSharesRoute.userSharesDropTable)

// Export router
module.exports = router