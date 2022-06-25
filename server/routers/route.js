module.exports = (app)=>{
    
    
    app.get('/', (req, res) => {
        const Bitcoin = require('../src/controllers/Bitcoin');
        (new Bitcoin).print(req,res);
    });
    
    app.get('/bitcoin-price-now', (req, res) => {
        const Bitcoin = require('../src/controllers/Bitcoin');
        (new Bitcoin).last24Hours(req,res);
    });
    
    app.get('/bitcoin-price-last24h', (req, res) => {
        const Bitcoin = require('../src/controllers/Bitcoin');
        (new Bitcoin).realTime(req,res);

    });
};