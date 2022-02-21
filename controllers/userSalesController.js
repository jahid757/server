// userSales CRUD.

// Import database
const knex = require('../db')

// GET ALL
exports.userSalesGetAll = async (req, res) => {
    knex
        .select('*')               
        .from('userSales')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving user shares: ${err}` })
        })
}

// GET
exports.userSalesGet = async (req, res) => {
    knex
        .select('*')
        .from('userSales')
        .where("id", req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving user sales: ${err}` })
        })
}

exports.userSalesGetForClient = async (req, res) => {
    knex
        .select('*')
        .from('userSales')
        .where("client", req.params.email)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving user sales: ${err}` })
        })
}

// CREATE
exports.userSalesCreate = async (req, res) => {
    knex('userSales')
        .insert({
            'amount': req.body.amount,
            'client': req.body.client,
            'profitLoss': req.body.profitLoss,
            'assetType': req.body.assetType,
            'assetName': req.body.assetName,
            'dateCreated': req.body.dateCreated,
            'sharesNumber': req.body.sharesNumber
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: `User sale for \'${req.body.name}\' by created.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating user sale for user ${req.body.client} : ${err}` })
        })
}

exports.userSalesUpdate = async (req, res) => {
    knex('userSales')
        .where('id', req.body.id)
        .update(req.body)
        .then(() => {
            res.json({ message: `user sale ${req.body.id} updated.` })
        })
        .catch(err => {
            res.json({ message: `There was an error updating user sale ${req.body.id}: ${err}` })
        })
}

// DELETE
exports.userSalesDelete = async (req, res) => {
    knex('userSales')
        .where('id', req.body.id)
        .del()
        .then(() => {
            res.json({ message: `user sale ${req.body.id} deleted.` })
        })
        .catch(err => {
            res.json({ message: `There was an error deleting user sale ${req.body.id}: ${err}` })
        })
} 

exports.userSalesDropTable = async (req, res) => {
    knex.schema.dropTable('userSales')
      .then(() => {
        console.log("Deleted userSales table.")
        res.json({ message: 'userSales table dropped!'})
      })
  } 