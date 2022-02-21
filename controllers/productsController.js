// PRODUCTS CRUD.

// Import database
const knex = require('../db')

// GET ALL
exports.productsGetAll = async (req, res) => {
    knex
        .select('*')
        .from('products')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving products: ${err}` })
        })
}

// GET
exports.productsGet = async (req, res) => {
    knex
        .select('*')
        .from('products')
        .where("id", req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving products: ${err}` })
        })
}

// CREATE
exports.productsCreate = async (req, res) => {
    knex('products')
        .insert({
            'name': req.body.name,
            'minimumInvestment': req.body.minimumInvestment,
            'maturityTerm': req.body.maturityTerm,
            'payoutFreq': req.body.payoutFreq,
            'ISIN': req.body.ISIN,
            'maturityDate': req.body.maturityDate,
            'annualReturnRate': req.body.annualReturnRate,
            'available': req.body.available,
            'productLink': req.body.productLink
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: `Product for \'${req.body.name}\' by created.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating deposit for user ${req.body.clientId} : ${err}` })
        })
}

exports.productsUpdate = async (req, res) => {
    knex('products')
        .where('id', req.body.id)
        .update(req.body)
        .then(() => {
            res.json({ message: `Product ${req.body.id} updated.` })
        })
        .catch(err => {
            res.json({ message: `There was an error updating Product ${req.body.id}: ${err}` })
        })
}

// DELETE
exports.productsDelete = async (req, res) => {
    knex('products')
        .where('id', req.body.id)
        .del()
        .then(() => {
            res.json({ message: `Product ${req.body.id} deleted.` })
        })
        .catch(err => {
            res.json({ message: `There was an error deleting Product ${req.body.id}: ${err}` })
        })
} 

exports.productsDropTable = async (req, res) => {
    knex.schema.dropTable('products')
      .then(() => {
        console.log("Deleted products table.")
        res.json({ message: 'Products table dropped!'})
      })
  } 