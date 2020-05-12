import { Component, OnDestroy, HostListener } from '@angular/core';

import { AccountService, RoomService } from './_services';
import { SlateUser, SlateRoom } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnDestroy {
    slateUser: SlateUser;
    room: SlateRoom;

    @HostListener('window:unload', [ '$event' ])
    unloadHandler(event) {
      this.ngOnDestroy()
    }

    constructor(private accountService: AccountService, private roomService: RoomService) {
        this.accountService.slateUser.subscribe(x => this.slateUser = x);
        this.roomService.room.subscribe(y => this.room = y);
    }

    exit() {
        this.roomService.exit();
    }

    logout() {
        if (this.roomService.roomValue != null){
            this.roomService.exit();
            this.accountService.logout();
        }
        else {
            this.accountService.logout();
        }
    }

    ngOnDestroy() {
        this.logout();
      }

}
