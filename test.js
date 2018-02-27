var request = require('request');

request.post(
    'http://10.1.1.128:9010/ws/payment',
    { json: { AmountToPay: '1000', TransactionNumber : '1223444'} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    }
);