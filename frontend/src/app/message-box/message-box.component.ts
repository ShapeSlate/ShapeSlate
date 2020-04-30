import { Component, OnInit } from '@angular/core';
import { Message } from '../message';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  message = new Message;

  constructor() { }

  submitMessage(event) {
    this.message.typedtext = this.message.typedtext.slice(0,this.message.typedtext.length-1);
    console.log(this.message);
    this.message.typedtext = "";

  }

  newLineInMessage(event) {
    this.message.typedtext + "\n";
  }



  // keyDownFunction(event) {
  //   if(event.keyCode == 13) {
  //     console.log('you just clicked enter');
  //     // rest of your code
  //   }
  // }

  ngOnInit(): void {
  }

}
