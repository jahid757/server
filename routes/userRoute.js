// Import express
const express = require('express')

// Import user-controller
const userRoutes = require('./../controllers/userController.js')

// Create router
const router = express.Router()

router.get('/:id/user', userRoutes.usersGet)

router.get('/all', userRoutes.usersGetAll)

router.get('/allClients', userRoutes.usersGetClients)

router.post('/create', userRoutes.usersCreate)

router.post("/createAdmin", userRoutes.usersAdminCreate)

router.post('/update', userRoutes.usersUpdate)

router.post('/delete', userRoutes.usersDelete)

router.post("/verify", userRoutes.userVerify)

router.post('/resetPassword', userRoutes.usersResetPassword)

router.get('/userDetails/all', userRoutes.userDetailsGetAll)

router.get('/userDetails/:email', userRoutes.userDetailsGet)

router.post('/userDetails/create', userRoutes.usersDetailsCreate)

router.post('/userDetails/update', userRoutes.usersDetailsUpdate)

router.post('/userDetails/drop-table', userRoutes.usersDetailsDropTable)

router.post('/drop-table', userRoutes.usersDropTable);

// Export router
module.exports = router