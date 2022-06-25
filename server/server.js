const express = require('express')
const config = require('./config')

const app = express()

const btsql = require('./src/services/BitcoinDb')()
btsql.autoAdd(); 



require('./routers/route')(app);
app.listen(config.port)