import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class MessageBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
