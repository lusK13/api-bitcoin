module.exports = (app)=>{
    

    app.get('/bitcoin-price-now', (req, res) => {
        const Bitcoin = require('../src/controllers/Bitcoin');
        (new Bitcoin).realTime(req,res);
    });
    
    app.get('/bitcoin-price-last24h', (req, res) => {
        const Bitcoin = require('../src/controllers/Bitcoin');
        (new Bitcoin).last24Hours(req,res);

    });

    app.get('/test',async (req, res)=>{

        const btsql = require('../src/services/BitcoinDb')()

        btsql.autoAdd();
        res.send('test')

    })
};