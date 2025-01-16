import { BehaviorSubject } from 'rxjs';
import { UserProfile } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  url: string =
    'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.avif';

  users: UserProfile[] = [
    {
      name: 'Khushi',
      email: 'kl@gmail.com',

      sent: [
        {
          name: 'Roshan',
          email: 'rl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:00:00'),
        },

        {
          name: 'John',
          email: 'john@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:05:00'),
        },
        {
          name: 'Ria',
          email: 'ria@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:10:00'),
        },
        {
          name: 'Manthan',
          email: 'manthan@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:05:00'),
        },
      ],
      received: [
        {
          name: 'Roshan',
          email: 'rl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 09:50:30'),
        },
        {
          name: 'Roshan',
          email: 'rl@gmail.com',
          message: 'How are you doing?',
          time: new Date('January 10, 2025 10:02:30'),
        },
        {
          name: 'Kajal',
          email: 'kj@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:03:00'),
        },
        {
          name: 'Ria',
          email: 'ria@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:04:00'),
        },
        {
          name: 'John',
          email: 'john@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:04:30'),
        },
        {
          name: 'Manthan',
          email: 'manthan@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:04:30'),
        },
      ],
      profile_photo: this.url,
    },
    {
      name: 'Roshan',
      email: 'rl@gmail.com',

      sent: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 09:50:30'),
        },
        {
          name: 'John',
          email: 'john@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:05:30'),
        },
        {
          name: 'Ria',
          email: 'ria@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:08:30'),
        },
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'How are you doing?',
          time: new Date('January 10, 2025 10:02:30'),
        },
      ],
      received: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:00:00'),
        },
      ],
      profile_photo: this.url,
    },
    {
      name: 'Kajal',
      email: 'kj@gmail.com',

      sent: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:03:00'),
        },
      ],
      received: [],
      profile_photo: this.url,
    },
    {
      name: 'Ria',
      email: 'ria@gmail.com',

      sent: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:04:00'),
        },
      ],
      received: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:10:00'),
        },
        {
          name: 'Roshan',
          email: 'rl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:08:30'),
        },
      ],
      profile_photo: this.url,
    },
    {
      name: 'John',
      email: 'john@gmail.com',

      sent: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:04:30'),
        },
      ],
      received: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:05:00'),
        },
        {
          name: 'Roshan',
          email: 'rl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:05:30'),
        },
      ],
      profile_photo: this.url,
    },
    {
      name: 'Manthan',
      email: 'manthan@gmail.com',

      sent: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:04:30'),
        },
      ],
      received: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date('January 10, 2025 10:05:00'),
        },
      ],
      profile_photo: this.url,
    },
  ];

  nextUser = new BehaviorSubject<any>({
    email: 'kl@gmail.com',
  });

  setUser(value: any) {
    this.nextUser.next(value);
  }

  uploadData(user: UserProfile[]) {
    return this.http.post(
      'https://chitchat-28450-default-rtdb.firebaseio.com/.json',
      user
    );
  }

  constructor(private http: HttpClient) {}
}
