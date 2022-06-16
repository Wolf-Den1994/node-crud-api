import { IncomingMessage, ServerResponse } from 'http';
import { checkArray, getPostData } from '../utils/common';
import { findAll, findById, create } from '../models/userModel';

// @desc  Gets All Users
// @route GET /api/users
export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

// @desc  Gets Single User
// @route GET /api/users/:id
export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc  Create a User
// @route POST /api/users
export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getPostData(req);
    const { username, age, hobbies } = JSON.parse(body);

    if (typeof username === 'string' && typeof age === 'number' && checkArray(hobbies)) {
      const user = {
        username,
        age,
        hobbies,
      };

      const newUser = await create(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Body doen\'nt contain required fields' }));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc  Gets Single User
// @route GET /api/users/:id
export const errorNotValidId = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Valid id' }));
  } catch (error) {
    console.log(error);
  }
};

// @desc  Check any routes
// @route any
export const errorRouteNotFound = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  } catch (error) {
    console.log(error);
  }
};
