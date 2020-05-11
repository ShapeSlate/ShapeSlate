import { Component } from '@angular/core';

import { AccountService } from './_services';
import { SlateUser } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    slateUser: SlateUser;

    constructor(private accountService: AccountService) {
        this.accountService.slateUser.subscribe(x => this.slateUser = x);
    }

    logout() {
        this.accountService.logout();
    }
}