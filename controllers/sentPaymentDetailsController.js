// USER CRUD.

// Import database
const knex = require('./../db')
const nodemailer = require('../nodemailer');
const { first } = require('./../db');

// GET MULTIPLE
exports.sentPaymentDetailsGetAll = async (req, res) => {
  knex
    .select('*')
    .from('sentPaymentDetails')
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving payment details: ${err}` })
    })
}

// TODO: ADD GET SINGLE.
exports.sentPaymentDetailsGet = async (req, res) => {
  knex
    .select('*')
    .from('sentPaymentDetails')
    .where("id", req.params.id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving payment details: ${err}` })
    })
}

// CREATE
exports.sentPaymentDetailsCreate = async (req, res) => {
  knex('sentPaymentDetails')
    .insert({
      'client': req.body.client,
      'accountName': req.body.accountName,
      'accountNumber': req.body.accountNumber,
      'amount': req.body.amount,
      'sortCode': req.body.sortCode,
      'IBAN': req.body.IBAN,
      'SWIFT': req.body.SWIFT,
      'reference': req.body.reference
    })
    .then(async () => {
      // Send a success message in response

      knex
        .select('firstName')
        .from('users')
        .where('email', req.body.client)
        .then(async (userName) => {

          const paymentDetails = {
            ...req.body,
            firstName: userName[0] ? userName[0].firstName : "",
          }

          // This is where you're going to actually send that email as well.
          await nodemailer.sendPaymentDetailsEmail(req.body.client, paymentDetails);
        })

      res.json({ message: `Payment details for \'${req.body.client}\' by created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating payment details for ${req.body.client}: ${err}` })
    })
}

// TODO: ADD UPDATE.
exports.sentPaymentDetailsUpdate = async (req, res) => {
  knex('sentPaymentDetails')
    .where('id', req.body.id)
    .update(req.body)
    .then(() => {
      res.json({ message: `Payment details ${req.body.id} updated.` })
    })
    .catch(err => {
      res.json({ message: `There was an error updating payment details ${req.body.id}: ${err}` })
    })
}

// DELETE
exports.sentPaymentDetailsDelete = async (req, res) => {
  knex('sentPaymentDetails')
    .where('id', req.body.id)
    .del()
    .then(() => {
      res.json({ message: `Payment details ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting payment detail ${req.body.id}: ${err}` })
    })
}