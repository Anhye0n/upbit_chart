const express = require('express');
const router = express.Router();

const axios = require("axios")

const candle_url = coin_name => {
    return 'https://api.upbit.com/v1/candles/days?market=' + coin_name + '&count=200'
}

const past_candle_url = (coin_name, last_date) => {
    return 'https://api.upbit.com/v1/candles/days?market=' + coin_name + '&to=' + last_date + '%2009%3A00%3A00&count=200'
}

const last_date_func = date => {
    let first_date = date.split('-');


    let before_date = new Date(first_date[0], first_date[1], first_date[2]);

    console.log('Debug 1: ' + before_date);

    before_date.setDate(before_date.getDate() - 1);

    console.log('Debug 2: ' + before_date);

    // before_date = before_date.toLocaleString().split(',')

    let before_date_hap, before_date_hap_2

    if ((before_date.getDate()) < 10) {
        before_date_hap = '0' + before_date.getDate().toLocaleString()
    } else {
        before_date_hap = before_date.getDate()
    }

    if ((before_date.getMonth()) < 10) {
        before_date_hap_2 = '0' + before_date.getMonth().toLocaleString()
    } else {
        before_date_hap_2 = before_date.getMonth()
    }

    return before_date.getFullYear() + '-' + before_date_hap_2 + '-' + before_date_hap
};

router.get('/', (req, res) => {

    res.render('./index'/*, {'user': user}*/);
})

router.get('/calculator', (req, res) => {

    res.render('./contents/calculator')
})

router.get('/candles', (req, res) => {

    res.render('./contents/candles/all_candles')
})

router.get('/candles/history', (req, res) => {
    let coin_name = req.query.coin_name

    axios.get(candle_url(coin_name)).then((axios_res) => {
        //과거 데이터 요청

        console.log('============================================================')
        console.log('coin_name :', coin_name)

        console.log('---------------------------------------------------')
        console.log('첫번째 :' + JSON.stringify(axios_res.data[0]))
        console.log('마지막 :' + JSON.stringify(axios_res.data[199]))
        console.log('---------------------------------------------------')
        axios.get(past_candle_url(coin_name, last_date_func(axios_res.data[199]['candle_date_time_kst'].substr(0, 10)))).then((axios_past_res) => {

            console.log('첫번째(과거 데이터) :' + JSON.stringify(axios_past_res.data[0]))
            console.log('마지막(과거 데이터) :' + JSON.stringify(axios_past_res.data[axios_past_res.data.length - 1]))
            console.log('---------------------------------------------------')

            for (let i = 0; i < axios_past_res.data.length; i++) {
                axios_res.data.push(axios_past_res.data[i])
            }

            console.log('Data Length :' + axios_res.data.length)
            console.log('============================================================')
            console.log('============================================================')

            let candles_history = axios_res.data.reverse()

            res.render('./contents/candles/candles_history', {
                'market': candles_history[0]['market'],
                'history': candles_history
            })

        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
})


router.get('/candles/custom/history', (req, res) => {
    if (req.query.coin_name !== undefined) {
        let coin_name = req.query.coin_name

        axios.get(candle_url(coin_name)).then((axios_res) => {
            //과거 데이터 요청

            console.log('============================================================')
            console.log('coin_name :', coin_name)

            console.log('---------------------------------------------------')
            console.log('첫번째 :' + JSON.stringify(axios_res.data[0]))
            console.log('마지막 :' + JSON.stringify(axios_res.data[199]))
            console.log('---------------------------------------------------')
            axios.get(past_candle_url(coin_name, last_date_func(axios_res.data[199]['candle_date_time_kst'].substr(0, 10)))).then((axios_past_res) => {

                console.log('첫번째(과거 데이터) :' + JSON.stringify(axios_past_res.data[0]))
                console.log('마지막(과거 데이터) :' + JSON.stringify(axios_past_res.data[axios_past_res.data.length - 1]))
                console.log('---------------------------------------------------')

                for (let i = 0; i < axios_past_res.data.length; i++) {
                    axios_res.data.push(axios_past_res.data[i])
                }

                console.log('Data Length :' + axios_res.data.length)
                console.log('============================================================')
                console.log('============================================================')

                let candles_history = axios_res.data.reverse()

                res.render('./contents/candles/custom_candles_history', {
                    'market': candles_history[0]['market'],
                    'history': candles_history
                })

            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    } else {
        res.render('./contents/candles/custom_candles_history')
    }

})

const custom_candle_url = (coin_name, count) => {
    return 'https://api.upbit.com/v1/candles/days?market=' + coin_name + '&count=' + count
}

const custom_past_candle_url = (coin_name, last_date, count) => {
    return 'https://api.upbit.com/v1/candles/days?market=' + coin_name + '&to=' + last_date + '%2009%3A00%3A00&count=' + count
}
//
// router.get('/candles/history/backtest', (req, res) => {
//     if (req.query.coin_name !== undefined) {
//         let coin_name = req.query.coin_name
//         let count = req.query.count
//         let k = req.query.k
//
//         let target
//         let total = 1
//         axios.get(custom_candle_url(coin_name, count)).then((axios_res) => {
//             //과거 데이터 요청
//
//             console.log('============================================================')
//             console.log('coin_name :', coin_name)
//
//             console.log('---------------------------------------------------')
//             console.log('첫번째 :' + JSON.stringify(axios_res.data[0]))
//             console.log('마지막 :' + JSON.stringify(axios_res.data[count - 1]))
//             console.log('---------------------------------------------------')
//             axios.get(custom_past_candle_url(coin_name, last_date_func(axios_res.data[count - 1]['candle_date_time_kst'].substr(0, 10)), count)).then((axios_past_res) => {
//
//                 console.log('첫번째(과거 데이터) :' + JSON.stringify(axios_past_res.data[0]))
//                 console.log('마지막(과거 데이터) :' + JSON.stringify(axios_past_res.data[axios_past_res.data.length - 1]))
//                 console.log('---------------------------------------------------')
//
//                 for (let i = 0; i < axios_past_res.data.length; i++) {
//                     axios_res.data.push(axios_past_res.data[i])
//                 }
//
//                 console.log('Data Length :' + axios_res.data.length)
//                 console.log('============================================================')
//                 console.log('============================================================')
//
//                 let candles_history = axios_res.data.reverse()
//
//                 //누적 수익률 계산
//                 for (let i = 0; i < candles_history.length; i++) {
//                     let range = Math.round((candles_history[i]['high_price'] - candles_history[i]['low_price']) * k);
//
//                     if (i === 0) {
//                         target = 0
//
//                     }else{
//                         target = Math.round(((candles_history[i - 1]['high_price'] - candles_history[i - 1]['low_price']) * k) + candles_history[i]['opening_price']);
//                     }
//
//                     let ror = (candles_history[i]['high_price'] > target) ? (JSON.stringify((candles_history[i]['trade_price'] / target).toFixed(3)).replace(/"/gi, "")) : 1
//
//                     total *= ror;
//                 }
//
//                 res.render('./contents/candles/backtest', {
//                     'market': candles_history[0]['market'],
//                     'history': candles_history,
//                     'k': k,
//                     'count': count,
//                     'cumulative': total
//                 })
//
//             }).catch((err) => {
//                 console.log(err)
//             })
//         }).catch((err) => {
//             console.log(err)
//         })
//     } else {
//         res.render('./contents/candles/backtest')
//     }
//
// })

router.get('/candles/history/backtest', (req, res) => {
    if (req.query.coin_name !== undefined) {
        let coin_name = req.query.coin_name;
        let count = req.query.count;
        let k = req.query.k;

        let target;
        let ror;
        let total = 1;
        let fee = 0.002 + 0.001;

        axios.get(custom_candle_url(coin_name, count)).then((axios_res) => {
            //과거 데이터 요청
            console.log('============================================================')
            console.log('coin_name :', coin_name)

            console.log('---------------------------------------------------')
            console.log('첫번째 :' + JSON.stringify(axios_res.data[0]))
            console.log('마지막 :' + JSON.stringify(axios_res.data[count - 1]))
            console.log('---------------------------------------------------')

            console.log('Data Length :' + axios_res.data.length)
            console.log('============================================================')
            console.log('============================================================')

            let candles_history = axios_res.data.reverse();

            //누적 수익률 계산
            for (let i = 0; i < candles_history.length; i++) {

                if (i === 0) {
                    target = 0

                } else {
                    target = Math.round(((candles_history[i - 1]['high_price'] - candles_history[i - 1]['low_price']) * k) + candles_history[i]['opening_price']);
                }

                if (i === 0) {

                } else {
                    ror = (candles_history[i]['high_price'] > target) ? (candles_history[i]['trade_price'] / target - fee).toFixed(6) : 1;
                    total *= Number(ror)
                }
            }


            res.render('./contents/candles/backtest', {
                'market': candles_history[0]['market'],
                'history': candles_history,
                'k': k,
                'count': count,
                'cumulative': total,
                'fee': fee
            })

        }).catch((err) => {
            console.log(err)
        })
    } else {
        res.render('./contents/candles/backtest')
    }
})

router.get('/candles/history/backtest/best_k', (req, res) => {
    if (req.query.coin_name !== undefined) {
        let coin_name = req.query.coin_name;
        let count = req.query.count;


        let fee = 0.002 + 0.001;

        axios.get(custom_candle_url(coin_name, count)).then((axios_res) => {
            //과거 데이터 요청
            console.log('============================================================')
            console.log('coin_name :', coin_name)

            console.log('---------------------------------------------------')
            console.log('첫번째 :' + JSON.stringify(axios_res.data[0]))
            console.log('마지막 :' + JSON.stringify(axios_res.data[count - 1]))
            console.log('---------------------------------------------------')

            console.log('Data Length :' + axios_res.data.length)
            console.log('============================================================')
            console.log('============================================================')

            let candles_history = axios_res.data.reverse();

            let k = 0.1
            let k_list = [];
            let max = {'k': 0, 'total': 0}
            //가장 좋은 k값 찾기

            for (let a = 0; a < 9; a++) {

                let target;
                let ror;
                let total = 1;

                //누적 수익률 계산
                for (let i = 0; i < candles_history.length; i++) {
                    if (i === 0) {
                        target = 0

                    } else {
                        target = Math.round(((candles_history[i - 1]['high_price'] - candles_history[i - 1]['low_price']) * k) + candles_history[i]['opening_price']);
                    }

                    if (i === 0) {

                    } else {
                        ror = (candles_history[i]['high_price'] > target) ? (candles_history[i]['trade_price'] / target - fee).toFixed(6) : 1;
                        total *= ror
                    }
                }

                k_list.push({'k': k, 'total': total})
                if (max['total'] < total) {
                    max['k'] = k;
                    max['total'] = total;
                }
                k += 0.1
            }

            console.log('k_list : ' + JSON.stringify(k_list))
            // 얕은 복사, 깊은 복사의 차이
            let total_list = [...k_list];

            total_list.sort(function (a, b) {
                return a.total - b.total;
            });

            console.log('max : ' + JSON.stringify(max))


            res.render('./contents/candles/best_k', {
                'market': candles_history[0]['market'],
                'count': count,
                'fee': fee,
                'k_list': k_list,
                'total_list': total_list,
                'k_max': max
            })

        }).catch((err) => {
            console.log(err)
        })
    } else {
        res.render('./contents/candles/best_k')
    }
})

router.get('/graph/custom/high_low', (req, res) => {
    if (req.query.coin_name !== undefined) {
        let coin_name = req.query.coin_name

        axios.get(candle_url(coin_name)).then((axios_res) => {
            //과거 데이터 요청

            console.log('============================================================')
            console.log('coin_name :', coin_name)

            console.log('---------------------------------------------------')
            console.log('첫번째 :' + JSON.stringify(axios_res.data[0]))
            console.log('마지막 :' + JSON.stringify(axios_res.data[199]))
            console.log('---------------------------------------------------')
            axios.get(past_candle_url(coin_name, last_date_func(axios_res.data[199]['candle_date_time_kst'].substr(0, 10)))).then((axios_past_res) => {

                console.log('첫번째(과거 데이터) :' + JSON.stringify(axios_past_res.data[0]))
                console.log('마지막(과거 데이터) :' + JSON.stringify(axios_past_res.data[axios_past_res.data.length - 1]))
                console.log('---------------------------------------------------')

                for (let i = 0; i < axios_past_res.data.length; i++) {
                    axios_res.data.push(axios_past_res.data[i])
                }

                console.log('Data Length :' + axios_res.data.length)
                console.log('============================================================')
                console.log('============================================================')

                let candles_history = axios_res.data.reverse()

                res.render('./contents/graph/custom_hl', {
                    'market': candles_history[0]['market'],
                    'history': candles_history
                })

            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    } else {
        res.render('./contents/graph/custom_hl')
    }
})

module.exports = router