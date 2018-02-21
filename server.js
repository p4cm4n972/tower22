const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const fs = require('fs');
const PDFDocument = require('pdfkit');

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

app.use(express.static('www'));

//HEARTBEAT
app.post('/ws/heartbeat', function( req, res) {
  console.log(('serverSides: ' + req.body.Mode));
  io.emit('data',{data : req.body.Mode});
res.json('heartbeat');
})
//EXPRESS SERVER
app.set('port', process.env.PORT || 5000);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
//STATUS
/*app.post('/ws/status', function( req, res) {
  console.log(('serverSides: ' + JSON.stringify(req.body)));
res.json('STATUS OK')
})*/


//SOCKET CONNECTION
io.on('connection', socket => {
  console.log(`Socket ${socket.id} added`);
  socket.on('invoice', data => {
    console.log(data);
    doc = new PDFDocument({page_width: 300});
    doc.text('TransactionNumber ' + data.transaction, {width: 300, align: 'center'});
    doc.text('Amount ' + data.total, {width: 300, align: 'center'});
    doc.pipe(fs.createWriteStream('../../BorneProduit/Receipts/invoice-' + data.transaction + '.pdf'))
    doc.end();
  });
  //STATUS
  app.post('/ws/status', function( req, res) {
    console.log(('serverSideSocket: ' + JSON.stringify(req.body)));
    socket.emit('clientdata',{data : req.body});
  res.json('STATUS OK');
  });
//PAYMENT
app.post('/ws/paiement', function( req, res) {
  console.log(('info paiement: ' + JSON.stringify(req.body)));
  socket.emit('infoPaiement', {
    data : req.body.response
  })
  res.json('info paiement');
});
socket.on('disconnect', function () {
  io.emit('user disconnected');
});

})
