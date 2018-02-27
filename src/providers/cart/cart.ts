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
  public uri = "http://10.1.1.128:9010/ws/payment";

  constructor(public http: HttpClient) {
    console.log("Hello CartProvider Provider");
  }
  checkOut(tn, tt) {
    console.log(typeof(tn), typeof(tt));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    };
    return this.http.post(
      this.uri,
      ({
        AmountToPay: tt.toString(),
        TransactionNumber: tn.toString()
      })
    ).subscribe();
  }



  dataticket() {
    console.log("Print Ticket");
    return this.http.post("http://10.1.1.128:9010/ws/dataticket", {
      HostId: "CIEME_01",
      TicketType: "AppTicket"
    });
  }
  
}
