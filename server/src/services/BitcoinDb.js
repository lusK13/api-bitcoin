const mysqlModel = require('../models/Mysql')();
const BitcoinApi = require('./BitcoinApi')()



class BitcoinDb {



    async autoAdd(){

        

        
        this.addNewPrice()



    }

    async addNewPrice(){
        
            let now = new Date();
            let lastPrice = (await mysqlModel.selectLastPrice()).date_time;
            if(lastPrice){

                let lastPriceFive = new Date(lastPrice.getTime()+300000);
                let diffTime = lastPriceFive-now.getTime();

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
            else{
                let bitcoinPrice = await BitcoinApi.valueBitcoinToEurUsd()
                mysqlModel.addPrice(bitcoinPrice)


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