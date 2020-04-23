import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = new User()

  constructor(private userService: UserService) { }

  public login() {
    this.userService.login(this.user)
    console.log(this.user);
  }
  ngOnInit(): void {
  }

}
