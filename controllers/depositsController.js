// DEPOSIT CRUD.

// Import database
const knex = require('./../db')
const nodemailer = require('../nodemailer');

// GET ALL
exports.depositsGetAll = async (req, res) => {
    knex
        .select('*')
        .from('deposits')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving deposits: ${err}` })
        })
}

// GET
exports.depositsGet = async (req, res) => {
    knex
        .select('*')
        .from('deposits')
        .where("id", req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving deposits: ${err}` })
        })
}

// GET FOR CLIENT
exports.depositsGetForClient = async (req, res) => {
    knex
        .select('*')
        .from('deposits')
        .where("client", req.params.email)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving deposits: ${err}` })
        })
}

// GET AVAILABLE DEPOSIT FOR CLIENT (TOTAL DEPOSIT - MINUS TOTAL TRADES)
exports.depositsAvaliableDepositsForClient = async (req, res) => {
    knex
        .select('*')
        .from('deposits')
        .where("client", req.params.email)
        .where("status", "Successful")
        .then(data => {
            const totalDeposit = data.reduce(function (acc, obj) {
                return acc + obj.amount;
            }, 0);

            let totalTrades = 0;

            knex
                .select('*')
                .from('trades')
                .where("client", req.params.email)
                .then(tradesData => {
                    totalTrades = tradesData.reduce(function (acc, obj) {
                        return acc + obj.amount;
                    }, 0);

                    let totalUserShares = 0;

                    knex
                        .select('*')
                        .from('userShares')
                        .where("client", req.params.email)
                        .then(userShareData => {
                            totalUserShares = userShareData.reduce(function (acc, obj) {
                                return Number(acc) + Number(obj.amount);
                            }, 0);

                            const totalInvestments = totalUserShares + totalTrades;

                            const balance = totalDeposit - totalInvestments < 0 ? 0 : totalDeposit - totalInvestments;

                            knex
                                .select('*')
                                .from('userSales')
                                .where("client", req.params.email)
                                .then(userShareSalesData => {
                                    totalProfitLoss = userShareSalesData.reduce(function (acc, obj) {
                                        return Number(acc) + Number(obj.profitLoss);
                                    }, 0);

                                    console.log(totalProfitLoss);

                                    const balanceWithProfitLoss = balance + totalProfitLoss

                                    res.json(balanceWithProfitLoss);
                                })
                        })
                })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving deposits: ${err}` })
        })
}


// CREATE
exports.depositsCreate = async (req, res) => {
    knex('deposits')
        .insert({
            'amount': req.body.amount,
            'client': req.body.client,
            'currency': req.body.currency,
            'status': req.body.status,
            'dateCreated': req.body.dateCreated
        })
        .then(async () => {
            const firstName = req.body.name ? req.body.name.split(" ")[0] : "Sir/Madam"

            await nodemailer.sendClientDepositNotification(req.body.client, firstName, req.body.amount);
            await nodemailer.sendAdminDepositNotification(req.body.amount, req.body.name, req.body.client, req.body.phoneNumber)
            res.json({ message: `Deposit for \'${req.body.client}\' by created.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating deposit for user ${req.body.client} : ${err}` })
        })
}

exports.depositsUpdate = async (req, res) => {
    knex('deposits')
        .where('id', req.body.id)
        .update(req.body)
        .then(() => {
            res.json({ message: `Deposit ${req.body.id} updated.` })
        })
        .catch(err => {
            res.json({ message: `There was an error updating ${req.body.id} deposit: ${err}` })
        })
}

exports.depositsApprove = async (req, res) => {
    knex('deposits')
        .where('id', req.body.id)
        .update({
            'status': "Successful"
        })
        .then(async () => {
            knex
                .select('firstName')
                .from('users')
                .where('email', req.body.client)
                .then(async (userName) => {

                const firstName = userName[0] ? userName[0].firstName : "Sir/Madam";

                // This is where you're going to actually send that email as well.
                await nodemailer.sendConfirmedDepositEmail(req.body.client, firstName);
                res.json({ message: `Deposit ${req.body.id} updated.` })
            })
        })
        .catch(err => {
            res.json({ message: `There was an error updating ${req.body.id} deposit: ${err}` })
        })
}

// DELETE
exports.depositsDelete = async (req, res) => {
    knex('deposits')
        .where('id', req.body.id)
        .del()
        .then(() => {
            res.json({ message: `Deposit ${req.body.id} deleted.` })
        })
        .catch(err => {
            res.json({ message: `There was an error deleting ${req.body.id} deposit: ${err}` })
        })
}

exports.depositsDropTable = async (req, res) => {
    knex.schema.dropTable('deposits')
        .then(() => {
            console.log("Deleted deposits table.")
            res.json({ message: 'deposits table dropped!' })
        })
}