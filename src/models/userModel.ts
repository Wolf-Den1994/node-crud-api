import { v4 as uuidv4 } from 'uuid';
import { IUser, IUserPost } from '../types/types';

const users: IUser[] = [
  {
    id: 'e2bf8878-104b-4a57-b195-82ba3d8dfddf',
    username: 'name',
    age: 22,
    hobbies: ['hobby1', 'hobby2'],
  },
];

export const findAll = () => new Promise((res, rej) => {
  try {
    res(users);
  } catch (error) {
    rej(error);
  }
});

export const findById = (userId: string): Promise<IUser> => new Promise((res, rej) => {
  try {
    const user = users.find(({ id }) => userId === id);
    if (user) res(user);
  } catch (error) {
    rej(error);
  }
});

export const create = (user: IUserPost) => new Promise((res, rej) => {
  try {
    const newUser: IUser = { id: uuidv4(), ...user };
    users.push(newUser);
    res(newUser);
  } catch (error) {
    rej(error);
  }
});

export const update = (userId: string, user: IUserPost) => new Promise((res, rej) => {
  try {
    const index = users.findIndex(({ id }) => userId === id);
    users[index] = { id: userId, ...user };
    res(users[index]);
  } catch (error) {
    rej(error);
  }
});
