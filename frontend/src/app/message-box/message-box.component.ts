import { Component } from '@angular/core';
import EmojiPicker from "vanilla-emoji-picker";
import * as $ from 'jquery';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Message } from '../_models/message';
import { AccountService } from '../_services';
new EmojiPicker();

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {

  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/chatlog";
  stompClient: any;
  message = new Message;


  constructor(
    private accountService: AccountService
  ) { }

  connect() {
    let socket = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (outputMessage) {
        _this.displayReceivedMessage(JSON.parse(outputMessage.body).receivedTextMessage);
      });
    }, this.errorCallBack);
  }


  sendUserMessage(event) {
    // Removes the last newline character that is added by the enter.
    this.message.typedtext = this.message.typedtext.slice(0, this.message.typedtext.length - 1);
    console.log(this.message);
    this.stompClient.send("/app/hello", {}, JSON.stringify({ 'userTypedTextMessage': this.message.typedtext }));
    this.message.typedtext = "";
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  newLineInMessage(event) {
    this.message.typedtext + "\n";
  }

  displayReceivedMessage(message) {
    console.log(message);
    // if
    // class="table-active" for active user otherwise
    var date = new Date();
    $("#chatlog").append("<tr><td>" + this.accountService.userValue + ":<br>" + message + "<br><sub>" + new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().replace(/T/, " ").replace(/\..*/, "") + "</sub>" + "</td></tr>");
    document.getElementById("chatlog").scrollIntoView(false);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }


  ngAfterViewInit(): void {
    this.connect();
  }

  ngOnDestroy() {
    this._disconnect();
  }

}
