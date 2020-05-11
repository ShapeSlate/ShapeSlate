import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService, RoomService } from '../_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private roomService: RoomService
    ) {
        // redirect to room if already logged in
        if (this.accountService.slateUserValue && !this.roomService.roomValue) {
            this.router.navigate(['/room']);
        }
        // redirect to home if already logged in and entered room
        if (this.accountService.slateUserValue && this.roomService.roomValue) {
            this.router.navigate(['/']);
        }
    }
}