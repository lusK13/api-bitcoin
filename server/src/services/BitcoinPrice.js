const fetch = require('node-fetch');
const config = require('../../config');

class BitcoinPrice {


//Récupération de la valeur du bitcoin sur l'api cryptocompare
    async priceValueA() {

        return fetch(config.apiBitcoin.siteA).then(result=>{
                
            return result.json();                

        }).then(jsonResult=>{
            if(!jsonResult.Response){

                return jsonResult;
            }
            else{
                throw new Error("Path (cryptocompare) does not exist")
            }

        }).catch((error)=>{console.error(error);return false})

    }
        




  //en attente de développement (pas de récup de la valeur en euro sur ce site)
    priceValueB() {
        
        return fetch(config.apiBitcoin.siteB).then(result=>{
            return result.json();                

        }).then(jsonResult=>{
            
            if(jsonResult.status === "success"){
                throw new Error('en cour de dev')
                let result = jsonResult.data.coins.filter(coin=>{

                    return coin.name === "Bitcoin"

                });
                console.log(result);

                return jsonResult;
            }else{
                throw new Error('Path (coinranking) does not exist')
            }


        }).catch((error)=>{console.error(error);return false})
    }

    //récupération de la valeur du bitcoin sur un site "A" et en cas d'échec sur un site B
    async valueBitcoinToEurUsd(){

        let priceA = await this.priceValueA();

        if(priceA){
            return priceA
        }
        else{

            let priceB = await this.priceValueB();

            if(priceB){
                return priceB
            }
            else{
                return false;
            }


        }


        


    }




        
};

module.exports = ()=>{
    return new BitcoinPrice();
}