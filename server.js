const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const fs = require("fs");
const PDFDocument = require("pdfkit");

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: "true"
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "DELETE, PUT", "POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static("www"));

//HEARTBEAT
app.post("/ws/heartbeat", function (req, res) {
  console.log("serverSides: " + req.body.Mode);
  io.emit("data", {
    data: req.body.Mode
  });
  res.json("heartbeat");
});
//EXPRESS SERVER
app.set("port", process.env.PORT || 5000);
server.listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

//SOCKET CONNECTION
io.on("connection", function (socket) {
  console.log(`Socket ${socket.id} added`);
  socket.on("invoice", function (data) {
    console.log(data);
    doc = new PDFDocument({
      page_width: 300
    });
    doc.text("TransactionNumber " + data.TransactionNumber, {
      width: 300,
      align: "center"
    });
    doc.text("Amount " + data.total, {
      width: 300,
      align: "center"
    });
    doc.pipe(fs.createWriteStream("../BorneProduit/Receipts/Receipt.pdf"));
    doc.end();
  });
  //STATUS
  app.post("/ws/status", function (req, res) {
    console.log("serverSideSocket: " + JSON.stringify(req.body));
    socket.emit("clientdata", {
      data: req.body
    });
    res.json("STATUS OK");
  });
  //PRINT
  app.post("/ws/cmdack", function (req, res) {
    console.log("serverSideSocket: " + JSON.stringify(req.body));
    //EMIT
    io.emit("receipt", {
      data: "ticket"
    });
    res.json("PRINT CB OK");
  });
  //PAYMENT
  app.post("/ws/receipt", function (req, res) {
    const dataticket = req.body;
    console.log("info paiement: " + dataticket);
    //PRINT TICKET
    doc = new PDFDocument({
      page_width: 300
    });
    doc.text('SBI :' + dataticket.SubContractorId, {
      width: 300,
    });
    doc.text('N° Carte :' + dataticket.NumCarte, {
      width: 300,
    });
    doc.text('ID Carte :' + dataticket.IdCarte, {
      width: 300,

    });
    doc.text('Carte Bancaire :' + dataticket.TypeCarteBancaire, {
      width: 300,
    });
    doc.text('Date :' + dataticket.Date, {
      width: 300,
    });
    doc.text('location :' + dataticket.AdressLine1, {
      width: 300,
    });
    doc.text('Type Transaction :' + dataticket.TypeTransaction, {
      width: 300,
    });
    doc.text('Type ticket :' + dataticket.TypeTicket, {
      width: 300,
    });
    doc.text('Montant :' + dataticket.Montant, {
      width: 300,
    });
    doc.pipe(fs.createWriteStream("../BorneProduit/DataTicket/dataticket.pdf"));
    doc.end();
    
    res.json("info paiement");
  });

  socket.on("disconnect", function () {
    io.emit("user disconnected");
  });
});
