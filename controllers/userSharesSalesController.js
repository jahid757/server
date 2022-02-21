// userSharesSales CRUD.

// Import database
const knex = require('../db')

// GET
exports.userSharesSalesGet = async (req, res) => {
    knex
        .select('*')
        .from('userSharesSales')
        .where("id", req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving profit/loss record: ${err}` })
        })
}

// CREATE
exports.userSharesSalesCreate = async (req, res) => {
    knex('userSharesSales')
        .insert({
            'amount': req.body.amount,
            'client': req.body.client,
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: `Profit/loss entry for \'${req.body.name}\' by created.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating profit/loss entry for user ${req.body.clientId} : ${err}` })
        })
}

exports.userSharesSalesUpdate = async (req, res) => {
    knex('userSharesSales')
        .where('id', req.body.id)
        .update(req.body)
        .then(() => {
            res.json({ message: `Profit/loss entry ${req.body.id} updated.` })
        })
        .catch(err => {
            res.json({ message: `There was an error updating profit/loss entry ${req.body.id}: ${err}` })
        })
}

// DELETE
exports.userSharesSalesDelete = async (req, res) => {
    knex('userSharesSales')
        .where('id', req.body.id)
        .del()
        .then(() => {
            res.json({ message: `Profit/loss entry ${req.body.id} deleted.` })
        })
        .catch(err => {
            res.json({ message: `There was an error deleting profit/loss entry ${req.body.id}: ${err}` })
        })
} 

exports.userSharesSalesDropTable = async (req, res) => {
    knex.schema.dropTable('userSharesSales')
      .then(() => {
        console.log("Deleted userSharesSales table.")
        res.json({ message: 'userSharesSales table dropped!'})
      })
  } 