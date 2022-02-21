// DEPOSIT CRUD.

// Import database
const knex = require('./../db')

// GET ALL
exports.iposGetAll = async (req, res) => {
    knex
        .select('*')
        .from('ipos')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving ipos: ${err}` })
        })
}

// GET
exports.iposGet = async (req, res) => {
    knex
        .select('*')
        .from('ipos')
        .where("id", req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving ipos: ${err}` })
        })
}


// CREATE
exports.iposCreate = async (req, res) => {
    knex('ipos')
        .insert({
            'logo': req.body.logo,
            'company': req.body.company,
            'symbol': req.body.symbol,
            'manager': req.body.manager,
            'totalShares': req.body.totalShares,
            'listingRange': req.body.listingRange,
            'expectedToTrade': req.body.expectedToTrade,
            'price': req.body.price,
            'available': req.body.available,
            'prospectus': req.body.prospectus,
            'valuation': req.body.valuation,
            'minimumShares': req.body.minimumShares
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: `IPO for \'${req.body.company}\' by created.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating ipo for user ${req.body.company} : ${err}` })
        })
}

exports.iposChangePrice = async (req, res) => {
    const updateShare = {
        id: req.body.id,
        price: req.body.price
    }

    console.log("Reached the change price function");

    knex('ipos')
        .where('id', req.body.id)
        .update(updateShare)
        .then(async () => {
            knex
                .select('*')
                .from('userShares')
                .where('shareId', req.body.id)
                .then(async (userShares) => {
                    console.log("Corresponding userShares: ", userShares);

                    return knex.transaction(trx => {
                        const queries = [];
                        userShares.forEach(userShare => {
                            const query = knex('userShares')
                                .where('id', userShare.id)
                                .update({
                                    sharePrice: req.body.price,
                                    profitLoss: knex.raw(`?? + (${req.body.shareProfitLoss} * ??)`, ['profitLoss', 'sharesNumber'])
                                })
                                .transacting(trx); // This makes every update be in the same transaction
                            queries.push(query);
                        });
                    
                        Promise.all(queries) // Once every query is written
                            .then(trx.commit) // We try to execute all of them
                            .catch(trx.rollback); // And rollback in case any of them goes wrong
                    });
                })
                .catch(err => {
                    // Send a error message in response
                    res.json({ message: `There was an error retrieving userShares: ${err}` })
                })
        })
        .catch(err => {
            res.json({ message: `There was an error updating ${req.body.id} deposit: ${err}` })
        })
}

exports.iposUpdate = async (req, res) => {
    knex('ipos')
        .where('id', req.body.id)
        .update(req.body)
        .then(() => {
            res.json({ message: `IPO ${req.body.id} updated.` })
        })
        .catch(err => {
            res.json({ message: `There was an error updating ${req.body.id} deposit: ${err}` })
        })
}

// DELETE
exports.iposDelete = async (req, res) => {
    knex('ipos')
        .where('id', req.body.id)
        .del()
        .then(() => {
            res.json({ message: `IPOs ${req.body.id} deleted.` })
        })
        .catch(err => {
            res.json({ message: `There was an error deleting ${req.body.id} IPO: ${err}` })
        })
}

exports.iposDropTable = async (req, res) => {
    knex.schema.dropTable('ipos')
        .then(() => {
            console.log("Deleted IPOs table.")
            res.json({ message: 'IPO table dropped!' })
        })
}