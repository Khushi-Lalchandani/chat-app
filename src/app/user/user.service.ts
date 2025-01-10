import { UserProfile } from './user.model';

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
    {
      name: 'Roshan',
      email: 'rl@gmail.com',
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
  constructor() {}
}
