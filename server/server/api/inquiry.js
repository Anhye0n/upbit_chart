const axios = require('axios')
const uuidv4 = require("uuid/v4")
const sign = require('jsonwebtoken').sign

const access_key = 'Z9VNez8rZbf1FNZkbPa3wFCd890JUevN0i5e6fy3'
const secret_key = '8TDX334sWosobGTNRsvxMp6Pe37QTT92k6lHkazL'
const server_url = "https://api.upbit.com"

const payload = {
    access_key: access_key,
    nonce: uuidv4,
}

const token = sign(payload, secret_key)

const options = {
    method: "GET",
    url: server_url + "/v1/accounts",
    headers: {Authorization: `Bearer ${token}`},
}


// 총 매수 금액 조회
// axios.get(server_url + "/v1/accounts", {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// }).then((axios_res) => {
//
//     console.log(axios_res['data'])
//     let hap = 0
//
//     for (let i = 0; i < axios_res['data'].length; i++){
//         if (Number(axios_res['data'][i]['balance']) < 0){
//             axios_res['data'][i]['balance'] = 0
//
//         } else if (Number(axios_res['data'][i]['locked']) < 0){
//             axios_res['data'][i]['locked'] = 0
//         }
//         hap += (Number(axios_res['data'][i]['balance']) + Number(axios_res['data'][i]['locked'])) * Number(axios_res['data'][i]['avg_buy_price'])
//     }
//     console.log('------------------')
//     console.log('현재 가격 : '+ hap)
//     console.log('------------------')
//
// }).catch((err) => {
//     console.log(err)
// })