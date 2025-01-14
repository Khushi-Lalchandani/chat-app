import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';
import { UserProfile } from './user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chat-app';

  user: UserProfile[] = this.uService.users;
  constructor(private uService: UserService) {}
}
