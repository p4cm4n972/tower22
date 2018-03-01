import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as socketIo from "socket.io-client";
import { HttpHeaders } from "@angular/common/http";
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
  public uri = "http://localhost:9010/ws/payment";

  constructor(public http: HttpClient) {
    console.log("Hello CartProvider Provider");
  }
  checkOut(tn, tt) {
    console.log(typeof tn, typeof tt);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http
      .post(
        this.uri,
        JSON.stringify({
          AmountToPay: tt.toString(),
          TransactionNumber: tn.toString()
        })
      )
      .subscribe(response => {
        return this.http.post(
          "http://localhost:9010/ws/dataticket",
          JSON.stringify({
            "HostId": "CIEME_01",
            "TicketTYpe": "AppTicket",
            "TicketURL": "10.1.1.111:/BorneProduit/Receipts/Receipt.pdf"
          })
        );
      });
  }

  dataticket() {
    console.log("Print Ticket");
    return this.http
      .post(
        "http://localhost:9010/ws/dataticket",
        JSON.stringify({
          "HostId": "CIEME_01",
          "TicketType": "CBTicket",
          "TicketURL": "10.1.1.111:/BorneProduit/DataTicket/dataticket.pdf"
        })
      )
      .subscribe();
  }
}
