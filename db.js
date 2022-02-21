// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')
console.log("Database path: ", dbPath);

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})



// CREATE USER TABLE ---------------------------------------------->
knex.schema
  // Check if table exists.
  .hasTable('users')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('users', (table)  => {
          table.increments('id').primary()
          table.string('title')
          table.string('firstName')
          table.string('lastName')
          table.string('phoneNumber')
          table.string('email').unique()
          table.date('dateCreated')
          table.string('password')
          table.string('address')
          table.string('postcode')
          table.string('accountNumber')
          table.string('idFile')
          table.string('addressFile')
          table.boolean('isAdmin')
          table.string("verified")
        })
        .then(() => {
          console.log('Table \'Users\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })

// CREATE USER TABLE ---------------------------------------------->

// CREATE USER DETAILS TABLE ---------------------------------------------->
knex.schema
  // Check if table exists.
  .hasTable('userDetails')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('userDetails', (table)  => {
          table.increments('id').primary()
          table.string('email').unique()
          table.string('accountNumber')
          table.string('accountName')
          table.string('sortCode')
          table.string('currency')
        })
        .then(() => {
          console.log('Table \'Users Details\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table user details: ${error}`)
        })
      }
    })

// CREATE USER DETAILS TABLE ---------------------------------------------->

// CREATE DEPOSITS TABLE ------------------------------------------>
knex.schema
    .hasTable('deposits')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('deposits', (table)  => {
            table.increments('id').primary().unique()
            table.integer('amount')
            table.string('client')
            table.string('currency')
            table.string('status')
            table.date('dateCreated')
          })
          .then(() => {
            console.log('Table \'Deposits\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating Deposits table: ${error}`)
          })
        }
      })

// CREATE DEPOSITS TABLE ------------------------------------------>


// CREATE TRADES TABLE ------------------------------------------>

knex.schema
    .hasTable('trades')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('trades', (table)  => {
            table.increments('id').primary()
            table.string('product')
            table.string('client')
            table.date('dateCreated')
            table.string('maturityTerm')
            table.integer('amount')
            table.date('maturityDate')
            table.string('payoutFreq')
            table.string('annualReturn')
            table.string('ISIN')
          })
          .then(() => {
            console.log('Table \'Trades\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating Trades table: ${error}`)
          })
        }
      })

// CREATE TRADES TABLE ------------------------------------------>


// CREATE PRODUCTS TABLE ------------------------------------------>

knex.schema
    .hasTable('products')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('products', (table)  => {
            table.increments('id').primary()
            table.string('name')
            table.integer('minimumInvestment')
            table.string('maturityTerm')
            table.string('payoutFreq')
            table.integer('ISIN')
            table.date('maturityDate')
            table.string('annualReturnRate')
            table.boolean('available')
            table.string('productLink')
          })
          .then(() => {
            console.log('Table \'Products\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating Products table: ${error}`)
          })
        }
      })

// CREATE PRODUCTS TABLE ------------------------------------------>


// CREATE SENT PAYMENT DETAILS TABLE ------------------------------------------>

knex.schema
    .hasTable('sentPaymentDetails')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('sentPaymentDetails', (table)  => {
            table.increments('id').primary()
            table.string('client')
            table.string('accountName')
            table.bigInteger('accountNumber')
            table.integer('amount')
            table.string('sortCode')
            table.string('IBAN')
            table.string('SWIFT')
            table.string('reference')
          })
          .then(() => {
            console.log('Table \'SentPaymentDetails\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating SentPaymentDetails table: ${error}`)
          })
        }
      })


// CREATE SENT PAYMENT DETAILS TABLE ------------------------------------------>

// CREATE MARKET DATA TABLE ------------------------------------------>

knex.schema
    .hasTable('marketData')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('marketData', (table)  => {
            table.integer('id')
            table.date('date')
            table.string('open')
            table.string('high')
            table.string('low')
            table.string('close')
            table.string('volume')
            table.unique(['date', 'id'])
          })
          .then(() => {
            console.log('Table \'Market Data\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating Market Data table: ${error}`)
          })
        }
      })

// CREATE MARKET DATA TABLE ------------------------------------------>


// CREATE IPOS TABLE ------------------------------------------>

knex.schema
    .hasTable('ipos')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('ipos', (table)  => {
            table.increments('id').primary()
            table.string('logo')
            table.string('company')
            table.string('symbol')
            table.string('manager')
            table.string('totalShares')
            table.string('valuation')
            table.string('listingRange')
            table.string('expectedToTrade')
            table.integer('price')
            table.bool('available')
            table.string('prospectus')
            table.integer('minimumShares')
          })
          .then(() => {
            console.log('Table \'IPOs\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating IPOs table: ${error}`)
          })
        }
      })

// CREATE IPOS DATA TABLE ------------------------------------------>

// CREATE IPOS TABLE ------------------------------------------>

knex.schema
    .hasTable('userShares')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('userShares', (table)  => {
            table.increments('id').primary()
            table.integer('shareId')
            table.string('company')
            table.string('client')
            table.string('symbol')
            table.bigInteger('amount')
            table.string('sharesNumber')
            table.date('dateCreated')
            table.integer('sharePrice')
            table.integer('sharePurchasePrice')
            table.string('profitLoss')
            table.integer('lockedPeriod')
            table.bool('status')
          })
          .then(() => {
            console.log('Table \'User shares\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating user shares table: ${error}`)
          })
        }
      })

// CREATE IPOS DATA TABLE ------------------------------------------>

// CREATE USER SHARES SALES TABLE ------------------------------------------>

knex.schema
    .hasTable('userSharesSales')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('userSharesSales', (table)  => {
            table.increments('id').primary()
            table.integer('amount')
            table.string('client')
          })
          .then(() => {
            console.log('Table \' User Shares sales\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating user shares sales table: ${error}`)
          })
        }
      })

// CREATE USER SHARES SALES DATA TABLE ------------------------------------------>

// CREATE USER SALES TABLE ------------------------------------------>

knex.schema
    .hasTable('userSales')
      .then((exists) => {
        if (!exists) {
          return knex.schema.createTable('userSales', (table)  => {
            table.increments('id').primary()
            table.integer('amount')
            table.string('client')
            table.integer('profitLoss')
            table.string('assetType')
            table.string('assetName')
            table.date('dateCreated')
            table.string('sharesNumber')
          })
          .then(() => {
            console.log('Table \' User Sales\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating user sales table: ${error}`)
          })
        }
      })

// CREATE USERS SALES DATA TABLE ------------------------------------------>


// Export the database
module.exports = knex