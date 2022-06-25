const config = require('../../config');
const mysql = require('mysql');

class MysqlBitcoin {


    constructor(){
        this.connection = mysql.createConnection(
            config.mysql
          );
          this.addPromiseQuery()                   

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






        
};

module.exports = ()=>{
    return new MysqlBitcoin();
}