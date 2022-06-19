import { IncomingMessage, ServerResponse } from 'http';
import { checkArray, getPostData } from '../utils/common';
import {
  findAll, findById, create, update, remove,
} from '../models/userModel';

// @desc  Handle server error
// @route any
export const handleErrorServer = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Ooops, something wrong! Server is broken' }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Sorry, you broke server! Contact the administrator' }));
  }
};

// @desc  Gets Error with NOT FOUND
// @route GET /api/users/:id
export const errorNotFoundUser = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User Not Found' }));
  } catch (error) {
    handleErrorServer(req, res);
  }
};

// @desc  Gets All Users
// @route GET /api/users
export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    handleErrorServer(req, res);
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
      errorNotFoundUser(req, res);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    errorNotFoundUser(req, res);
  }
};

// @desc  Create a User
// @route POST /api/users
export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getPostData(req);
    const { username, age, hobbies } = JSON.parse(body);

    if (
      typeof username === 'string'
      && typeof age === 'number'
      && checkArray(hobbies)
    ) {
      const user = {
        username,
        age,
        hobbies,
      };

      const newUser = await create(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    }

    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: "Body doen'nt contain required fields" }),
    );
  } catch (error) {
    handleErrorServer(req, res);
  }

  return ServerResponse;
};

// @desc  Update a User
// @route PUT /api/users/:id
export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    const user = await findById(id);

    if (!user) {
      errorNotFoundUser(req, res);
    } else {
      const body = await getPostData(req);
      const { username, age, hobbies } = JSON.parse(body);

      if (
        (typeof username !== 'string' && username)
        || (typeof age !== 'number' && age)
        || (hobbies && !checkArray(hobbies))
      ) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({ message: "Body doen'nt contain required fields" }),
        );
      }

      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const udpUser = await update(id, userData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(udpUser));
    }
  } catch (error) {
    errorNotFoundUser(req, res);
  }

  return ServerResponse;
};

// @desc  Delete User
// @route DELETE /api/users/:id
export const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    const user = await findById(id);

    if (!user) {
      errorNotFoundUser(req, res);
    } else {
      await remove(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    }
  } catch (error) {
    errorNotFoundUser(req, res);
  }
};

// @desc  Gets Error with valid ID
// @route GET /api/users/:id
export const errorNotValidId = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Valid id' }));
  } catch (error) {
    handleErrorServer(req, res);
  }
};

// @desc  Check any routes
// @route any
export const errorRouteNotFound = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  } catch (error) {
    handleErrorServer(req, res);
  }
};
