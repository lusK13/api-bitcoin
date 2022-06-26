const BitcoinApi= require('../services/BitcoinApi')()
const bitcoinBd = require('../services/BitcoinDb')()

module.exports = class Bitcoin {


    print(req, res){
        res.send('no access')
    }

    async last24Hours(req, res) {
        let lastPrices = await bitcoinBd.last24Hours()
        console.log(lastPrices);
        res.json(lastPrices)
    }
    

    //envoi en Json de la valeur du bitcoin actuellement (return : {EUR:20302.97, USD:21401.91})
    async realTime(req, res) {
        
        let valueBitcoin = await BitcoinApi.valueBitcoinToEurUsd()

        if(!valueBitcoin){

            return false;

        }
        else{
            res.json(valueBitcoin);

        }
    
    }

    
};
