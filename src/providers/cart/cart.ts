import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as socketIo from "socket.io-client";
import { Socket } from "../../app/ws";
/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class CartProvider {
  cart: any[] = [];

  private socket: Socket;
  public uri = "http://10.1.1.128:9010/ws/payment";

  constructor(public http: HttpClient) {
    console.log("Hello CartProvider Provider");
  }
  //CHECK OUT AMOUNT
  checkOut(tn, tt) {
    console.log(typeof tn, typeof tt);
    const invoice = { TransactionNumber: tn, total: tt }
    this.socket = socketIo('http://10.1.1.111:5000');
    this.socket.emit('invoice', invoice);
    return this.http
      .post(
        this.uri,
        JSON.stringify({
          AmountToPay: tt.toString(),
          TransactionNumber: tn.toString()
        })
      )
      .subscribe();
  }

  //PRINT CB TICKET
  checkCB() {
    return this.http.post(
      "http://10.1.1.128:9010/ws/dataticket",
      JSON.stringify({
        "HostId": "CIEME_01",
        "TicketType": "CBTicket",
        "TicketURL": "BorneProduit/DataTicket/dataticket.pdf"
      })
    );
  }
  //PRINT RECEIPT
  dataticket() {
    console.log("Print Ticket");
    return this.http
      .post(
        "http://10.1.1.128:9010/ws/dataticket",
        JSON.stringify({
          "HostId": "CIEME_01",
          "TicketType": "AppTicket",
          "TicketURL": "BorneProduit/Receipts/receipt.pdf"
        })
      )
      .subscribe();
  }
}
