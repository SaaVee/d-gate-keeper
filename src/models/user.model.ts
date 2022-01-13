import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Role} from './role.model';
import {UserCredentials} from './user-credentials.model';

@model({
  name: 'User',
  settings: {
    description: 'User model which hold th user part of the application',
    forceId: true,
    hiddenProperties: ['password']
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  realm?: string;

  @property({
    type: 'string',
  })
  avatar?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
    required: true,
  })
  dateOfBirth: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  username: string;

  @property({
    type: 'string',
    index: {
      unique: true,
    },
  })
  email?: string;

  @property({
    type: 'string',
    index: {
      unique: true,
    },
  })
  phone?: string;

  @property({
    type: 'boolean',
  })
  emailVerified?: boolean;

  @property({
    type: 'boolean',
    default: true,
  })
  isActive?: boolean;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdDate?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  updatedDate?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @belongsTo(() => Role)
  rolesId: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
