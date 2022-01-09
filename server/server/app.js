const helmet = require('helmet');
const express = require('express');
const app = express()
app.use(helmet());
//모듈
const path = require('path'), favicon = require('serve-favicon')

//session
app.use(express.urlencoded({extended: false}))

app.use(express.json())

// favicon 설정
app.use(favicon(path.join(__dirname, '../src/img', 'favicon.ico')));

//src 파일 경로
app.use('/src', express.static(path.join(__dirname, '../src')))

//ejs 사용
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs') //ejs 사용

//views 파일 라우터
const view_router = require('./routes/view_ejs')
app.use('/', view_router)

//api 파일 라우터
// const api_router = require('./api/backtest')
// app.use('/api', api_router)
//
app.listen(80, () => {
    console.log(`Example app listening at 158.247.197.13`)
})

// app.get("*", (req, res, next) => {
//     console.log("req.secure == " + req.secure);
//
//     if (req.secure) {
//         // --- https
//         next();
//     } else {
//         // -- http
//         let to = "https://" + req.headers.host + req.url;
//         console.log("to ==> " + to);
//
//         return res.redirect("https://" + req.headers.host + req.url);
//     }
// })
// const http = require("http")
// const https = require("https")
// const fs = require("fs")
//
// let privateKey = fs.readFileSync("/etc/letsencrypt/live/anhye0n.me/privkey.pem")
// let certificate = fs.readFileSync("/etc/letsencrypt/live/anhye0n.me/cert.pem")
// let ca = fs.readFileSync("/etc/letsencrypt/live/anhye0n.me/chain.pem")
// const credentials = {key: privateKey, cert: certificate, ca: ca}
//
// // Starting both http & https servers
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
//
// httpServer.listen(80, () => {
//     console.log('HTTP Server running on port 80');
// });
//
// httpsServer.listen(443, () => {
//     console.log('HTTPS Server running on port 443');
// });
module.exports = app