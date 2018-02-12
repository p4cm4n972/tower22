const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
//WEBSOCKET SOCKET.IO
const io = require('socket.io');
const ioClient = require('socket.io-client');


function emitMessage(socket) {
  socket.emit('my other event', { my: 'data' });
  setTimeout(function () { emitMessage(socket) }, 1000);
}

const socket = ioClient.connect('http://10.1.1.77:9010');
emitMessage(socket);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.post('/api/OutOfServicePage', function( req, res) {
  console.log((req.body.response));
res.send({response: req.body.response})
})

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
