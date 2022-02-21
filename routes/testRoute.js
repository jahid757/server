// Import express
const express = require('express')

const router = express.Router()

router.get("/", (req, res) => {
    res.send("You're reaching the end point!");
})

// Export router
module.exports = router