// USER CRUD.

// Import database
const knex = require('./../db')
const nodemailer = require('../nodemailer');
const path = require('path');
var multer = require('multer');

const documentPath = path.resolve(__dirname, '..', '..', 'documents')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, documentPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage }).array('file');

// GET MULTIPLE
exports.usersGetAll = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving users: ${err}` })
    })
}

// GET
exports.usersGet = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .where("id", req.params.id)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving user: ${err}` })
    })
}

// GET DETAILS
exports.userDetailsGet = async (req, res) => {
  knex
    .select('*')
    .from('userDetails')
    .where("email", req.params.email)
    .then(userDetailsData => {
      res.json(userDetailsData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving user: ${err}` })
    })
}

// GET DETAILS
exports.userDetailsGetAll = async (req, res) => {
  knex
    .select('*')
    .from('userDetails')
    .then(userDetailsData => {
      res.json(userDetailsData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving user: ${err}` })
    })
}

// GET CLIENTS (NON-ADMINS)
exports.usersGetClients = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .where("isAdmin", false)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving user: ${err}` })
    })
}

// CREATE
exports.usersCreate = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .where("email", req.body.email)
    .then(userData => {
      if (userData.length > 0) {
        throw new Error("User already exists in database!")
      } else {
        knex('users')
          .insert({
            'title': req.body.title,
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'phoneNumber': req.body.phoneNumber,
            'email': req.body.email,
            'password': req.body.password,
            'address': req.body.address,
            'postcode': req.body.postcode,
            'accountNumber': req.body.accountNumber,
            'idFile': req.body.idFile,
            'addressFile': req.body.addressFile,
            'isAdmin': req.body.isAdmin,
            'dateCreated': new Date().toISOString().slice(0, 10),
            'verified': req.body.verified
          })
          .then(async () => {
            // Send a success message in response
            await nodemailer.sendNewSignupEmail(req.body.email, req.body.password, req.body.firstName);
            res.json({ message: `User \'${req.body.firstName} ${req.body.lastName}\' by created.` })
          })
          .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating user ${req.body.name}: ${err}` })
          })
      }
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving user: ${err}` })
    });
}

// CREATE
exports.usersDetailsCreate = async (req, res) => {
  knex
    .select('*')
    .from('userDetails')
    .where("email", req.body.email)
    .then(userDetailsData => {
      console.log("userData in usersCreate: ", userDetailsData);
      if (userDetailsData.length > 0) {
        throw new Error("User already exists in database!")
      } else {
        knex('userDetails')
          .insert({
            'accountName': req.body.accountName,
            'accountNumber': req.body.accountNumber,
            'sortCode': req.body.sortCode,
            'currency': req.body.currency,
            'email': req.body.email
          })
          .then(() => {
            // Send a success message in response
            res.json({ message: `User Details \'${req.body.firstName} ${req.body.lastName}\' by created.` })
          })
          .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating ${req.body.name} book: ${err}` })
          })
      }
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving user: ${err}` })
    });
}

// CREATE ADMIN 
exports.usersAdminCreate = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .where("email", req.body.email)
    .then(userData => {
      console.log("userData in usersCreate: ", userData);
      if (userData.length > 0) {
        res.json({ message: "User already exists!" });
      } else {
        knex('users')
          .insert({
            'title': req.body.title,
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'phoneNumber': req.body.phoneNumber,
            'email': req.body.email,
            'password': req.body.password,
            'address': req.body.address,
            'postcode': req.body.postcode,
            'accountNumber': req.body.accountNumber,
            'idFile': null,
            'addressFile': null,
            'isAdmin': true
          })
          .then(async () => {
            // Send a success message in response
            res.json({ message: `User \'${req.body.firstName} ${req.body.lastName}\' by created.` })
          })
          .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating ${req.body.name} book: ${err}` })
          })
      }
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving user: ${err}` })
    });
}

exports.usersResetPassword = async (req, res) => {
  knex('users')
    .where('email', req.body.email)
    .update(req.body)
    .then(async () => {

      await nodemailer.sendResetPasswordEmail(req.body.email, req.body.password)
      res.json({ message: `Password for ${req.body.email} updated.` })
    })
    .catch(err => {
      res.json({ message: `There was an error updating ${req.body.email} user: ${err}` })
    })
}

// UPDATE
exports.usersUpdate = async (req, res) => {
  knex('users')
    .where('id', req.body.id)
    .update(req.body)
    .then(() => {
      res.json({ message: `User ${req.body.id} updated.` })
    })
    .catch(err => {
      res.json({ message: `There was an error updating ${req.body.id} user: ${err}` })
    })
}

// VERIFY
exports.userVerify = async (req, res) => {
  knex('users')
    .where('id', req.body.id)
    .update(req.body)
    .then(async () => {

      knex
        .select('*')
        .from('users')
        .where('id', req.body.id)
        .then(async (userData) => {
          await nodemailer.sendVerificationEmail(req.body.email, userData[0].firstName);
        })
        .catch(err => {
          // Send a error message in response
          res.json({ message: `There was an error retrieving user: ${err}` })
        })

      res.json({ message: `User verification email has been sent for ${req.body.email}.` })

    })
    .catch(err => {
      res.json({ message: `There was an error updating ${req.body.id} user: ${err}` })
    })
}

// UPDATE DETAILS
exports.usersDetailsUpdate = async (req, res) => {
  knex('userDetails')
    .where('id', req.body.id)
    .update(req.body)
    .then(async () => {

      knex
        .select('*')
        .from('users')
        .where('email', req.body.email)
        .then(async (userDetails) => {
          await nodemailer.sendAccountBankDetailsUpdated(userDetails[0].email, userDetails[0].firstName);
        })
        .catch(err => {
          // Send a error message in response
          res.json({ message: `There was an error retrieving user: ${err}` })
        })
        
      res.json({ message: `User ${req.body.id} updated.` })
    })
    .catch(err => {
      res.json({ message: `There was an error updating ${req.body.id} user: ${err}` })
    })
}

// DELETE
exports.usersDelete = async (req, res) => {
  knex('users')
    .where('id', req.body.id)
    .del()
    .then(() => {
      res.json({ message: `User ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} user: ${err}` })
    })
}

exports.usersDropTable = async (req, res) => {
  knex.schema.dropTable('users')
    .then(() => {
      console.log("Deleted users table.")
      res.json({ message: 'User table dropped!' })
    })
}

exports.usersDetailsDropTable = async (req, res) => {
  knex.schema.dropTable('userDetails')
    .then(() => {
      console.log("Deleted users details table.")
      res.json({ message: 'User details table dropped!' })
    })
}