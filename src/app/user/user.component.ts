import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Message, UserProfile } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userDetails!: UserProfile[];
  showUsers!: UserProfile[];
  sentMessages: Message[] = [];

  receivedMessages: Message[] = [];
  chatMessages!: Message[];

  ngOnInit(): void {
    this.uService.nextUser.subscribe((value) => {
      // console.log(value);
      if (this.uService.nextUser.value) {
        this.userDetails = this.uService.users.filter(
          (data) => data.email !== value.email
        );
        this.showUsers = this.communicationHappened(this.userDetails);
      }
    });
  }

  communicationHappened(user: UserProfile[]) {
    return user.filter((user) => {
      const hasSentMessage = user.sent.some(
        (message) => message.email === this.uService.nextUser.value.email
      );
      const hasReceivedMessage = user.received.some(
        (message) => message.email === this.uService.nextUser.value.email
      );
      return hasReceivedMessage || hasSentMessage;
    });
  }
  revealDetails(user: UserProfile) {
    this.receivedMessages = [];
    this.sentMessages = [];

    user.sent.forEach((data) => {
      if (data.email === this.uService.nextUser.value.email) {
        data.messageReceived = true;

        this.receivedMessages.push(data);
      }
    });
    user.received.forEach((data) => {
      data.messageSent = true;

      if (data.email === this.uService.nextUser.value.email) {
        this.sentMessages.push(data);
      }
    });
    this.chatMessages = [...this.sentMessages, ...this.receivedMessages];

    this.chatMessages.sort((a, b) => a.time!.getTime() - b.time!.getTime());
    console.log(this.chatMessages);
  }
  constructor(private uService: UserService) {}
}
