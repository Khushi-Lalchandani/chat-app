import { Injectable } from '@angular/core';

Injectable({ providedIn: 'root' });

export class UserService {
  users: UserProfile[] = [
    {
      name: 'Khushi',
      email: 'kl@gmail.com',
      sent: [
        {
          name: 'Roshan',
          email: 'rl@gmail.com',
          message: 'Hi',
          time: new Date(),
        },
      ],
      received: [
        {
          name: 'Roshan',
          email: 'rl@gmail.com',
          message: 'Hello',
          time: new Date(),
        },
      ],
      profile_photo:
        'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.avif',
    },
  ];
  constructor() {}
}
