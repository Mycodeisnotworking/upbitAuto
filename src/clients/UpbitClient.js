const request = require('request-promise-native')
const uuidv4 = require('uuid').v4
const crypto = require('crypto')
const sign = require('jsonwebtoken').sign
const queryEncode = require("querystring").encode
const server_url="https://api.upbit.com";



// 조회
const getUpbit = async function (access_key, secret_key, uri) {
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
    }
    
    const token = sign(payload, secret_key)

    const options = {
        method: "GET",
        url: server_url + uri,
        headers: {Authorization: `Bearer ${token}`},
    }

    return request(options)
}

const getMyOrder = async function (access_key, secret_key, uri) {
    const body = {
        identifier: 'test1'
    }
    
    const query = queryEncode(body)
    
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
    
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
    
    const token = sign(payload, secret_key)
    
    const options = {
        method: "GET",
        url: server_url + "/v1/order?" + query,
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }

    return request(options)
}
// 주문
const GiveOrder = async function(access_key, secret_key, uri) {
    const body = {
        market: 'KRW-BTC',
        side: 'bid',
        volume: '1',
        price: '5000',
        ord_type: 'limit',
        identifier: 'test2'
    }
    /*

    market *	마켓 ID (필수)	String
    side *	주문 종류 (필수)
    - bid : 매수
    - ask : 매도	String
    
    volume *	주문량 (지정가, 시장가 매도 시 필수)	NumberString
    price *	주문 가격. (지정가, 시장가 매수 시 필수)
    ex) KRW-BTC 마켓에서 1BTC당 1,000 KRW로 거래할 경우, 값은 1000 이 된다.
    ex) KRW-BTC 마켓에서 1BTC당 매도 1호가가 500 KRW 인 경우, 시장가 매수 시 값을 1000으로 세팅하면 2BTC가 매수된다.
    (수수료가 존재하거나 매도 1호가의 수량에 따라 상이할 수 있음)	NumberString
    ord_type *	주문 타입 (필수)
    - limit : 지정가 주문
    - price : 시장가 주문(매수)
    - market : 시장가 주문(매도)	String

    identifier	조회용 사용자 지정값 (선택)	String (Uniq 값 사용)
    ord_type
        limit : 지정가 주문
        price : 시장가 주문(매수)
        market : 시장가 주문(매도)
    */
    
    const query = queryEncode(body)
    
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
    
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
    
    const token = sign(payload, secret_key)
    
    const options = {
        method: "POST",
        url: server_url + "/v1/orders",
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }
    
    return request(options);
}

const cancelOrder = async function(access_key, secret_key, uri) {
    const body = {
        uuid: '1f509e46-52f6-402e-b197-d93426ce288e'
    }
    
    const query = queryEncode(body)
    
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
    
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
    
    const token = sign(payload, secret_key)
    
    const options = {
        method: "DELETE",
        url: server_url + "/v1/order?" + query,
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }
        
    return request(options);
}

const accounts = async function(access_key, secret_key) {
    try {
        const result = await getUpbit(access_key, secret_key, "/v1/accounts");
        return result
    } catch(error) {
        console.error(error)
    }
}

const myOrders = async function(access_key, secret_key){
    try{
        const result = await getMyOrder(access_key, secret_key, "/v1/order");
        return result
    }catch(error) {
        console.error(error)
    }
}

const giveOrder = async function(access_key, secret_key){
    try{
        const result = await GiveOrder(access_key, secret_key, "/v1/orders");
        return result
    }catch(error) {
        console.error(error)
    }
}

module.exports = {accounts, myOrders, giveOrder, cancelOrder}