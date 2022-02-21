// DEPOSIT CRUD.

// Import database
const knex = require('./../db');
const nodemailer = require('../nodemailer');

// GET ALL
exports.tradesGetAll = async (req, res) => {
    knex
        .select('*')
        .from('trades')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving trades: ${err}` })
        })
}

// GET
exports.tradesGet = async (req, res) => {
    knex
        .select('*')
        .from('trades')
        .where("id", req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving trade: ${err}` })
        })
}

exports.tradesGetForClient = async (req, res) => {
    knex
        .select('*')
        .from('trades')
        .where("client", req.params.email)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving trade: ${err}` })
        })
}

// CREATE
exports.tradesCreate = async (req, res) => {
    knex('trades')
        .insert({
            'product': req.body.product,
            'client': req.body.client,
            'dateCreated': req.body.dateCreated,
            'maturityTerm': req.body.maturityTerm,
            'amount': req.body.amount,
            'maturityDate': req.body.maturityDate,
            'payoutFreq': req.body.payoutFreq,
            'annualReturn': req.body.annualReturn,
            'ISIN': req.body.ISIN
        })
        .then(async () => {
            // Send a success message in response

            knex
                .select('firstName')
                .from('users')
                .where('email', req.body.client)
                .then(async (userName) => {

                const tradeDetails = {
                    ...req.body,
                    firstName: userName[0] ? userName[0].firstName : "",
                }

                // This is where you're going to actually send that email as well.
                await nodemailer.sendNewBondTradeEmail(req.body.client, tradeDetails);
            })

            res.json({ message: `Trade for \'${req.body.client}\' by created.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating deposit for user ${req.body.client} : ${err}` })
        })
}

exports.tradesSale = async (req, res) => {
    const updateTrade = {
        id: req.body.id,
        amount: req.body.amount
    }

    knex('trades')
        .where('id', req.body.id)
        .update(updateTrade)
        .then(() => {
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
                    res.json({ message: `User sale for \'${req.body.client}\' by created.` })
                })
                .catch(err => {
                    // Send a error message in response
                    res.json({ message: `There was an error creating user shares for user ${req.body.clientId} : ${err}` })
                })
        })
        .catch(err => {
            res.json({ message: `There was an error updating Trade ${req.body.id}: ${err}` })
        })
}

exports.tradesUpdate = async (req, res) => {
    knex('trades')
        .where('id', req.body.id)
        .update(req.body)
        .then(() => {
            res.json({ message: `Trade ${req.body.id} updated.` })
        })
        .catch(err => {
            res.json({ message: `There was an error updating Trade ${req.body.id}: ${err}` })
        })
}

// DELETE
exports.tradesDelete = async (req, res) => {
    knex('trades')
        .where('id', req.body.id)
        .del()
        .then(() => {
            res.json({ message: `Trade ${req.body.id} deleted.` })
        })
        .catch(err => {
            res.json({ message: `There was an error deleting Trade ${req.body.id}: ${err}` })
        })
}

exports.tradesDropTable = async (req, res) => {
    knex.schema.dropTable('trades')
    .then(() => {
      console.log("Deleted trades table.")
      res.json({ message: 'Trades table dropped!'})
    })
}