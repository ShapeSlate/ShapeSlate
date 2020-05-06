import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import * as EmojiPicker from "vanilla-emoji-picker";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit():void{
    new EmojiPicker;
  }

  
}
