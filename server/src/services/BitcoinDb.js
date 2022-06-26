const mysqlModel = require('../models/Mysql')();
const BitcoinApi = require('./BitcoinApi')()



class BitcoinDb {



    async autoAdd(){

        

        
        this.addNewPrice()



    }

    async addNewPrice(){
        
            let now = new Date();
            let lastPrice = (await mysqlModel.selectLastPrice()).date_time;
            let lastPriceFive = new Date(lastPrice.getTime()+300000);
            
            let diffTime = lastPriceFive-now.getTime();
    
            console.log(diffTime);
    
            if(diffTime<=0){
                let bitcoinPrice = await BitcoinApi.valueBitcoinToEurUsd()
                mysqlModel.addPrice(bitcoinPrice)
                setTimeout(() => {
                    this.addNewPrice();
                }, 300000+diffTime);
                
            }
            else{
                setTimeout(() => {
                    this.addNewPrice();
                }, diffTime);
            }
        





    }


    async last24Hours(){


        return (await mysqlModel.selectLast24Hours()).map(price=>{
            price.euro_price/=100;
            price.dollar_price/=100;

            return price


        })

    }


        
};

module.exports = ()=>{
    return new BitcoinDb();
}