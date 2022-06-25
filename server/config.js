module.exports = {

    port : 3000,


    apiBitcoin: {
        siteA : 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR',
        siteB : 'https://api.coinranking.com/v2/coins'
    },

    mysql:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'',
        database:'bitcoin-api'
    }
};