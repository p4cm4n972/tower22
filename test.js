var request = require("request");

request.post(
  "http://10.1.1.128:9010/ws/dataticket",
  {
    json: {
      "HostId": "CIEME_01",
      "TicketType": "CBTicket",
      "TicketURL": "/home/aplus/BorneProduit/DataTicket/dataticket.pdf"
    }
  },

  function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.error(error);
    }
  }
);
