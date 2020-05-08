import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RoomService } from '../_services';

@Injectable({ providedIn: 'root' })
export class RoomAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private roomService: RoomService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const room = this.roomService.roomValue;
        if (room) {
            // authorised so return true
            this.setRoomText()
            return true;
        }
        // not logged in so redirect to enter page with the return url
        this.router.navigate(['/room/enter'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    setRoomText(){
        document.getElementById("roomdID").innerHTML = "Room: " + this.roomService.roomValue.roomname;
        // document.write(this.roomService.roomValue.roomname);
    }
}
