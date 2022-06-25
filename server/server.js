const express = require('express')
const config = require('./config')

const app = express()

const btsql = require('./src/services/BitcoinDb')()
// btsql.autoAdd(); 
//décocher pour auto ajout des prix dans la base toute les 5 minutes


require('./routers/route')(app);
app.listen(config.port)