const express = require('express')
const app = express()

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

app.listen(80, () => {
    console.log(`Example app listening at localhost`)
})


module.exports = app