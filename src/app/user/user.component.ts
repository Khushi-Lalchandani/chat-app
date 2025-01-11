import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserProfile } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userDetails: UserProfile[] = this.uService.users;
  ngOnInit(): void {
    console.log(this.uService.nextUser.value);
    console.log(this.userDetails);
  }
  constructor(private uService: UserService) {}
}
