import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
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

  constructor(public http: HttpClient) {
    console.log("Hello CartProvider Provider");
  }

  checkOut(invoice) {
    console.log(invoice);
    return this.http
      .post("http://localhost:9010/ws/payment", invoice);
  }
  dataticket() {
    console.log("Print Ticket");
    return this.http.post("http://10.1.1.128:9010/ws/dataticket", {
      HostId: "CIEME_01",
      TicketType: "AppTicket"
    });
  }
}
