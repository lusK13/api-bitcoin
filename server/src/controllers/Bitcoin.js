const bitcoinPrice = require('../services/BitcoinPrice')()

module.exports = class Bitcoin {


    print(req, res){
        res.send('no access')
    }

    last24Hours(req, res) {
        res.json({})
    }
    

    //envoi en Json de la valeur du bitcoin actuellement (return : {EUR:20302.97, USD:21401.91})
    async realTime(req, res) {
        
        let valueBitcoin = await bitcoinPrice.valueBitcoinToEurUsd()

        if(!valueBitcoin){

            return false;

        }
        else{
            res.json(valueBitcoin);

        }
    
    }

    
};
