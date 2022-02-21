// PRODUCTS CRUD.

// Import database
const knex = require('../db');
const nodemailer = require('../nodemailer');

// GET ALL
exports.userSharesGetAll = async (req, res) => {
    knex
        .select('*')               
        .from('userShares')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving user shares: ${err}` })
        })
}

// GET
exports.userSharesGet = async (req, res) => {
    knex
        .select('*')
        .from('userShares')
        .where("id", req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving user shares: ${err}` })
        })
}

// GET FOR CLIENT
exports.userSharesGetForClient = async (req, res) => {
    knex
        .select('*')
        .from('userShares ')
        .where("client", req.params.email)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving userShares: ${err}` })
        })
}

// CREATE
exports.userSharesCreate = async (req, res) => {
    knex('userShares')
        .insert({
            'id': req.body.id,
            'company': req.body.company,
            'client': req.body.client,
            'symbol': req.body.symbol,
            'dateCreated': req.body.dateCreated,
            'amount': req.body.amount,
            'sharesNumber': req.body.sharesNumber,
            'sharePrice': req.body.sharePrice,
            'profitLoss': req.body.profitLoss,
            'lockedPeriod': req.body.lockedPeriod,
            'status': req.body.status
        })
        .then(async () => {
            knex
                .select('firstName')
                .from('users')
                .where('email', req.body.client)
                .then(async (userName) => {

                const tradeDetails = {
                    ...req.body,
                    firstName: userName[0] ? userName[0].firstName : "Sir/Madam",
                };

                await nodemailer.sendNewIposTradeEmail(req.body.client, tradeDetails)
            })

            res.json({ message: `User shares for \'${req.body.name}\' by created.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating user shares for user ${req.body.clientId} : ${err}` })
        })
}

exports.userSharesSale = async (req, res) => {
    const updateBody = {
        id: req.body.id,
        amount: req.body.amount,
        sharesNumber: req.body.sharesNumber,
        profitLoss: req.body.profitLoss,
    }
    
    knex('userShares')
        .where('id', req.body.id)
        .update(updateBody)
        .then((result) => {
            knex('userSales')
                .insert({
                    'amount': req.body.saleAmount,
                    'client': req.body.client,
                    'profitLoss': req.body.saleProfitLoss,
                    'assetType': req.body.assetType,
                    'assetName': req.body.assetName,
                    'dateCreated': req.body.saleDate,
                    'sharesNumber': req.body.soldSharesNumber
                })
                .then(() => {
                    res.json({ message: `User sales for \'${req.body.client}\' by created.` })
                })
                .catch(err => {
                    // Send a error message in response
                    res.json({ message: `There was an error creating user shares for user ${req.body.clientId} : ${err}` })
                })
        })
        .catch(err => {
            res.json({ message: `There was an error updating user shares ${req.body.id}: ${err}` })
        })
}

exports.userSharesUpdate = async (req, res) => {
    knex('userShares')
        .where('id', req.body.id)
        .update(req.body)
        .then((result) => {
            res.json({ message: `User shares and profit/loss updated for \'${req.body.name}\' by created.` })
        })
        .catch(err => {
            res.json({ message: `There was an error updating user shares ${req.body.id}: ${err}` })
        })
}

// DELETE
exports.userSharesDelete = async (req, res) => {
    knex('userShares')
        .where('id', req.body.id)
        .del()
        .then(() => {
            res.json({ message: `User share record ${req.body.id} deleted.` })
        })
        .catch(err => {
            res.json({ message: `There was an error deleting user share record ${req.body.id}: ${err}` })
        })
} 

exports.userSharesDropTable = async (req, res) => {
    knex.schema.dropTable('userShares')
      .then(() => {
        console.log("Deleted user shares table.")
        res.json({ message: 'Usershares table dropped!'})
      })
  } 