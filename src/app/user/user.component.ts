import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Message, UserProfile } from './user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userDetails!: UserProfile[];
  showUsers!: UserProfile[];
  sentMessages: Message[] = [];
  message_form!: FormGroup;
  receivedMessages: Message[] = [];
  chatMessages!: Message[];
  selectedUser!: UserProfile;
  currentUser!: UserProfile[];
  mainUsers!: UserProfile[];
  mainUsersChanged = new BehaviorSubject<boolean>(false);
  localStorageEmail!: string | null;

  ngOnInit(): void {
    this.uService.getUsers();
    if (localStorage.getItem('user')) {
      this.localStorageEmail = localStorage.getItem('user');
    }
    console.log(this.localStorageEmail);

    this.mainUsersChanged.subscribe((value) => {
      console.log(value);
    });
    this.uService.users$.subscribe((user) => {
      this.mainUsers = user;
      // console.log(this.mainUsers);
      this.authService.nextUser.subscribe((value) => {
        if (this.authService.nextUser.value || this.localStorageEmail) {
          this.currentUser = this.mainUsers.filter(
            (data) => data.email === value.email
          );
          this.userDetails = this.mainUsers.filter(
            (data) => data.email !== value.email
          );
          this.showUsers = this.communicationHappened(this.userDetails);
        }
      });
    });

    this.message_form = new FormGroup({
      message: new FormControl(null),
    });
    // this.uService.uploadData(this.uService.users).subscribe((data) => {
    //   console.log('uploaded');
    // });
  }

  communicationHappened(user: UserProfile[]) {
    return user.filter((user) => {
      if (!user.sent) user.sent = [];
      const hasSentMessage = user.sent.some(
        (message) => message.email === this.localStorageEmail
      );

      const hasReceivedMessage = user.received?.some(
        (message) => message.email === this.localStorageEmail
      );
      return hasReceivedMessage || hasSentMessage;
    });
  }
  revealDetails(user: UserProfile) {
    if (!this.localStorageEmail) {
      return;
    }
    this.receivedMessages = [];
    this.sentMessages = [];
    this.selectedUser = user;
    console.log(this.selectedUser.sent, this.selectedUser.received);
    if (this.localStorageEmail) {
      user.sent = user.sent || [];
      user.received = user.received || [];
      user.sent.forEach((data) => {
        if (data.email === this.localStorageEmail) {
          data.messageReceived = true;
          data.time = new Date(data.time || Date.now());

          this.receivedMessages.push(data);
        }
      });
      user.received.forEach((data) => {
        data.messageSent = true;
        data.time = new Date(data.time || Date.now());
        if (data.email === this.localStorageEmail) {
          this.sentMessages.push(data);
        }
      });

      this.chatMessages = [...this.sentMessages, ...this.receivedMessages];

      this.chatMessages.sort((a, b) => a.time!.getTime() - b.time!.getTime());
    }
  }

  onSubmit() {
    if (this.message_form && this.selectedUser && this.currentUser) {
      this.appendMessage(this.message_form.value.message);
    }
    this.message_form.reset();
  }
  appendMessage(message: string) {
    if (!this.currentUser || this.currentUser.length === 0) {
      this.currentUser = this.mainUsers.filter(
        (data) => data.email === this.localStorageEmail
      );
    }
    const updatedUsers = this.mainUsers.map((user) => {
      if (user.email === this.currentUser[0].email) {
        user.sent = [
          ...user.sent,
          {
            name: this.selectedUser.name,
            message: message,
            email: this.selectedUser.email,
            time: new Date(),
          },
        ];

        // console.log(user);
      }
      if (user.email === this.selectedUser.email) {
        user.received = [
          ...user.received,
          {
            name: this.currentUser[0].name,
            message: message,
            email: this.currentUser[0].email,
            time: new Date(),
          },
        ];
        // console.log(user);
      }
      return user;
    });
    this.mainUsers = [...updatedUsers];
    this.mainUsersChanged.next(true);

    // Update the data on firebase
    this.uService.updateData(this.mainUsers);
    this.uService.getUsers();
  }
  logout() {
    this.authService.logout();
  }

  constructor(
    private uService: UserService,

    private authService: AuthService
  ) {}
}
