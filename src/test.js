const request = require('request')
const uuidV4 = require('uuid').v4
const sign = require('jsonwebtoken').sign
const UpbitClient = require('./clients/UpbitClient')
const options = {method: 'GET'};

fetch('https://api.upbit.com/v1/market/all?isDetails=false', options)
  .then(response => console.log(response))
  .catch(err => console.error(err));

const server_url = 'https://api.upbit.com';
/*
UpbitClient.accounts(access_key, secret_key).then(aa => {
    console.log(aa)
})
*/

/*UpbitClient.giveOrder(access_key, secret_key).then(result => {
    console.log(result);
});*/

/*UpbitClient.myOrders(access_key, secret_key).then(result =>{
    console.log(result);
})*/

UpbitClient.cancelOrder(access_key, secret_key).then(result=>{
    console.log(result);
})