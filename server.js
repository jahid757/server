// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
var busboy = require('connect-busboy');
var fs = require('fs');

// Import routes
const userRoute = require('./routes/userRoute')
const depositsRoute = require('./routes/depositsRoute')
const tradesRoute = require('./routes/tradesRoute')
const productsRoutes = require('./routes/productsRoute')
const sentPaymentDetailsRoute = require('./routes/sentPaymentDetailsRoute')
const testRoute = require('./routes/testRoute')
const iposRoute = require('./routes/iposRoute')
const userSharesRoute = require('./routes/userSharesRoute')
const userSharesSalesRoute = require('./routes/userSharesSalesRoute')
const userSalesRoute = require('./routes/userSalesRoute')

// Set default port for express app
const PORT = 4500

console.log("PORT IN SERVER: ", PORT)

// Create express app
const app = express()

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(busboy()); 
app.use(express.static("../public"));

// Implement routes
app.use('/users', userRoute)
app.use('/deposits', depositsRoute)
app.use('/trades', tradesRoute)
app.use('/products', productsRoutes)
app.use('/sentPaymentDetails', sentPaymentDetailsRoute)
app.use('/test', testRoute)
app.use('/ipos', iposRoute)
app.use('/userShares', userSharesRoute)
app.use('/userSharesSales', userSharesSalesRoute)
app.use('/userSales', userSalesRoute);

// Uploading files route.
app.post('/upload', function(req, res) {

  try {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        var randomNumber = Math.floor(Math.random() * 10000000) + 1;
        fstream = fs.createWriteStream('../client/public/documents/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
          res.json({file: `/${filename}`});
        });
    });
  } catch (error) {
    console.log("Error uploading: ", error);
  }
});

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(`Something is broken.  This error ${err.name}: ${err.message}. This is the stack: ${err.stack}`)
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`)
})
