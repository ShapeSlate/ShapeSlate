import { Component } from '@angular/core';
import { Message } from '../message';
import EmojiPicker from "vanilla-emoji-picker";
import * as $ from 'jquery';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
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


  constructor() { }

  connect() {
    let socket = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    _this.stompClient.connect({}, function (frame){
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
    document.getElementById("chatlog").scrollIntoView(true);
    
    // $("#chatlog")
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
    $("#chatlog").append("<tr><td>" + message + "</td></tr>");
  }



  ngAfterViewInit(): void {
    this.connect();
  }

}
