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
  private mainUsersSubject = new BehaviorSubject<UserProfile[]>([]); // Initializes the subject with an empty array
  mainUsers$ = this.mainUsersSubject.asObservable();

  ngOnInit(): void {
    this.uService.getUsers();
    // this.mainUsers$.subscribe((data) => {
    //   this.uService.updateData(data);
    // });

    this.uService.users$.subscribe((user) => {
      this.mainUsers = user;
      // console.log(this.mainUsers);
      this.authService.nextUser.subscribe((value) => {
        if (this.authService.nextUser.value) {
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
      const hasSentMessage = user.sent.some(
        (message) => message.email === this.authService.nextUser.value.email
      );

      const hasReceivedMessage = user.received?.some(
        (message) => message.email === this.authService.nextUser.value.email
      );
      return hasReceivedMessage || hasSentMessage;
    });
  }
  revealDetails(user: UserProfile) {
    this.receivedMessages = [];
    this.sentMessages = [];
    this.selectedUser = user;

    user.sent.forEach((data) => {
      if (data.email === this.authService.nextUser.value.email) {
        data.messageReceived = true;
        data.time = new Date(data.time || Date.now());

        this.receivedMessages.push(data);
      }
    });
    user.received.forEach((data) => {
      data.messageSent = true;
      data.time = new Date(data.time || Date.now());
      if (data.email === this.authService.nextUser.value.email) {
        this.sentMessages.push(data);
      }
    });
    this.chatMessages = [...this.sentMessages, ...this.receivedMessages];

    this.chatMessages.sort((a, b) => a.time!.getTime() - b.time!.getTime());
    console.log(this.chatMessages);
  }

  onSubmit() {
    if (this.message_form && this.selectedUser && this.currentUser) {
      console.log(this.message_form.value.message);
      console.log(this.selectedUser);
      this.appendMessage(this.message_form.value.message);
    }
    this.message_form.reset();
  }
  appendMessage(message: string) {
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

        console.log(user);
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
    this.mainUsersSubject.next(this.mainUsers);
  }
  logout() {
    this.authService.logout();
  }

  constructor(
    private uService: UserService,
    private cdrRef: ChangeDetectorRef,
    private authService: AuthService
  ) {}
}
