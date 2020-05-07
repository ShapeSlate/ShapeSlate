
import { User } from '../_models';
import { AccountService } from '../_services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User;
  // TODO place at an init;
  

  constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

}
