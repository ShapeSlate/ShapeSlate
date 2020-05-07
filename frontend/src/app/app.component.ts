import { Component } from '@angular/core';

import { AccountService, RoomService } from './_services';
import { User, SlateRoom } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;
    room: SlateRoom;

    constructor(private accountService: AccountService, private roomService: RoomService) {
        this.accountService.user.subscribe(x => this.user = x);
        this.roomService.room.subscribe(y => this.room = y);
    }

    exit() {
        this.roomService.exit();
    }
    
    logout() {
        this.accountService.logout();
        this.roomService.exit();
    }
}