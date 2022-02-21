// Import express
const express = require('express')

const iposRoute = require('./../controllers/iposController.js')

// Create router
const router = express.Router()

router.get('/all', iposRoute.iposGetAll)

router.get('/:id/ipo', iposRoute.iposGet)

router.post('/create', iposRoute.iposCreate)

router.post('/changePrice', iposRoute.iposChangePrice)

router.post('/update', iposRoute.iposUpdate)

router.post('/delete', iposRoute.iposDelete)

router.post('/drop-table', iposRoute.iposDropTable)

// Export router
module.exports = router