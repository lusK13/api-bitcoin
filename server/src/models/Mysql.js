const config = require('../../config');
const mysql = require('mysql');

class MysqlBitcoin {


    constructor(){
        this.connection = mysql.createConnection(
            config.mysql
          );
          this.addPromiseQuery()                   
          this.connection.connect();

    }

    addPromiseQuery(){
        this.connection.pquery = (query, data)=>{
            return new Promise((resolve, reject) => {
                this.connection.query(query, data, (err, res) => {
                    if (err)
                    {
                        reject(err);
                        console.error(err, query, data);
                    }
                    else
                        resolve(res);
                });
            });
        
      }
    }

    async selectLastPrice(){
        
        let lastPrice = await this.connection.pquery('SELECT * FROM bitcoin_price ORDER BY id DESC LIMIT 1');
 
        if(lastPrice.length >0){
            return lastPrice[0];
        }
        else{
            return false;
        }
                
    }

    async addPrice({EUR:euroPrice, USD:dollarPrice}) {
        
        let insert = await this.connection.pquery(`
            INSERT INTO bitcoin_price(euro_price,dollar_price)
            VALUES ('${euroPrice*100}', '${dollarPrice*100}')`)
 
            console.log(insert);
    }

    async selectLast24Hours(){

        let lastPrice = await this.connection.pquery('SELECT * FROM bitcoin_price WHERE date_time > DATE_SUB(NOW(),INTERVAL 24 HOUR) ');

        return lastPrice
    }

               
};

module.exports = ()=>{
    return new MysqlBitcoin();
}