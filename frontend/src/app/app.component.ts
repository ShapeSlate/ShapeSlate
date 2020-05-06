import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import * as EmojiPicker from "vanilla-emoji-picker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  ngOnInit():void{
    new EmojiPicker;
  }

  
}
