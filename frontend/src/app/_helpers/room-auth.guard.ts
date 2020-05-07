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
            return true;
        }
        // not logged in so redirect to enter page with the return url
        this.router.navigate(['/room/enter'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
