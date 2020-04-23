import { Component, OnInit } from '@angular/core';
import { SlateRoom } from '../slateroom';
import { SlateRoomService } from '../slateroom.service';

@Component({
  selector: 'app-slateroom',
  templateUrl: './slateroom.component.html',
  styleUrls: ['./slateroom.component.css']
})
export class SlateRoomComponent implements OnInit {

  slateRoom = new SlateRoom()

  constructor(private slateroomService: SlateRoomService) { }

  public create(){
    this.slateroomService.create(this.slateRoom)
  }

  public join(){
    this.slateroomService.join(this.slateRoom.roomName)
  }

  ngOnInit(): void {
  }

}
