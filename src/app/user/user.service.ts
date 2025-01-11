import { BehaviorSubject } from 'rxjs';
import { UserProfile } from './user.model';

export class UserService {
  users: UserProfile[] = [
    {
      name: 'Khushi',
      email: 'kl@gmail.com',
      password: 'Khushi1234',
      sent: [
        {
          name: 'Roshan',
          email: 'rl@gmail.com',
          message: 'Hi',
          time: new Date(),
        },
        {
          name: 'John',
          email: 'john@gmail.com',
          message: 'Hi',
          time: new Date(),
        },
        {
          name: 'Ria',
          email: 'ria@gmail.com',
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
        {
          name: 'John',
          email: 'jphn@gmail.com',
          message: 'Hi',
          time: new Date(),
        },
      ],
      profile_photo:
        'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.avif',
    },
    {
      name: 'Roshan',
      email: 'rl@gmail.com',
      password: 'Roshan1234',

      sent: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date(),
        },
      ],
      received: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hello',
          time: new Date(),
        },
      ],
      profile_photo:
        'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.avif',
    },
    {
      name: 'Kajal',
      email: 'kj@gmail.com',
      password: 'Kajal1234',

      sent: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date(),
        },
      ],
      received: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hello',
          time: new Date(),
        },
      ],
      profile_photo:
        'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.avif',
    },

    {
      name: 'Ria',
      email: 'ria@gmail.com',
      password: 'Ria1234',

      sent: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date(),
        },
      ],
      received: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hello',
          time: new Date(),
        },
      ],
      profile_photo:
        'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.avif',
    },

    {
      name: 'John',
      email: 'john@gmail.com',
      password: 'John1234',

      sent: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hi',
          time: new Date(),
        },
      ],
      received: [
        {
          name: 'Khushi',
          email: 'kl@gmail.com',
          message: 'Hello',
          time: new Date(),
        },
      ],
      profile_photo:
        'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.avif',
    },
  ];

  nextUser = new BehaviorSubject<any>({
    email: 'kl@gmail.com',
    password: 'Khushi1234',
  });

  setUser() {}
  constructor() {}
}
