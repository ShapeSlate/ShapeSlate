
import { SlateUser } from '../_models';
import { AccountService } from '../_services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slateUser: SlateUser;

  constructor(private accountService: AccountService) {
        this.slateUser = this.accountService.slateUserValue;
    }

}
