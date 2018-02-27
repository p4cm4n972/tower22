var request = require("request");

request.post(
  "http://10.1.1.128:9010/ws/status",
  {
    json: {
      HostId: "CIEME_01",
      TicketType: "CBTicket",
      path: "10.1.1.111:/BorneProduit/DataTicket/dataticket.pdf"
    }
  },

  function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log(error);
    }
  }
);
