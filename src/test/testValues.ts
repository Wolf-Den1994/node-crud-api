import { MessageForUser } from '../types/constants';

export const API = '/api/users/';

export const dataPost = {
  username: 'Den',
  age: 27,
  hobbies: ['FE', 'Node'],
};

export const dataPut = {
  username: 'Updated name',
  age: 18,
  hobbies: [],
};

export const badDataPostType = {
  username: 'Den',
  age: 27,
  hobbies: [777],
};

export const badDataPostWithout = {
  username: 'Den',
  hobbies: ['FE', 'Node'],
};

export const notFound = {
  message: MessageForUser.NotFound,
};

export const requireBody = {
  message: MessageForUser.RequireBody,
};

export const routeNotFound = {
  message: MessageForUser.RouteNotFound,
};

export const notValidId = {
  message: MessageForUser.NotValidId,
};
