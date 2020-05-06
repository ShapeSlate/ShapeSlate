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

  message = new Message;
  stompClient = null;


  constructor() { }

  submitMessage(event) {
    // Removes the last newline character that is added by the enter.
    this.message.typedtext = this.message.typedtext.slice(0,this.message.typedtext.length-1);
    console.log(this.message);
    this.sendUserMessage(this.stompClient)
    this.message.typedtext = "";

  }

  newLineInMessage(event) {
    this.message.typedtext + "\n";
  }

  displayReceivedMessage(message) {
    $("#chatlog").append("<tr><td>" + message + "</td></tr>");
  }

  connect(stompClient) {
      var socket = new SockJS('/gs-guide-websocket');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
          // Send data to the server.
          stompClient.subscribe('/topic/chatlog', function (outputMessage) {
              this.displayReceivedMessage(JSON.parse(outputMessage.body).receivedTextMessage);
          });
      });
  }

ngAfterViewInit():void{
  this.connect(this.stompClient);
}

//   sendUserMessage(stompClient) {
//     stompClient.send("/app/hello", {}, JSON.stringify({'userTypedTextMessage': $("[name=textareamessage]").val()}));
// }

sendUserMessage(stompClient) {
  stompClient.send("/app/hello", {}, JSON.stringify({'userTypedTextMessage': this.message.typedtext}));
}





  // keyDownFunction(event) {
  //   if(event.keyCode == 13) {
  //     console.log('you just clicked enter');
  //     // rest of your code
  //   }
  // }

  // ngOnInit(): void {
    
  //   window.onload: () => 
  // }

  
  

}
