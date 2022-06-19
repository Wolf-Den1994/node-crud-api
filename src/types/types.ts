import { v4 as uuidv4 } from 'uuid';

export interface IUserPost {
  username: string;
  age: number;
  hobbies: string[];
}

export interface IUser extends IUserPost {
  id: string | typeof uuidv4;
}
