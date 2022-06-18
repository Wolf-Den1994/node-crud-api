import { createServer, IncomingMessage, ServerResponse } from 'http';
import { uuidValidateV4, parseUrl } from './utils/common';
import {
  getUsers, getUser, errorRouteNotFound, errorNotValidId, createUser, updateUser, deleteUser,
} from './controllers/userController';
import { createProcesses } from './cluster';

const PORT = process.env.PORT || 4000;

export const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const route = req.url?.replace(/\/$|\/*$/g, '');
  const parseRoute = parseUrl(route)?.replace(/\/$|\/*$/g, '');
  const routeId = req.url?.split('/')[3];
  const method = req.method || '';

  console.log('Current process:', process.pid);

  if (route === '/api/users' && !routeId && method === 'GET') {
    getUsers(req, res);
  } else if (parseRoute === '/api/users' && routeId && method === 'GET') {
    const valide = uuidValidateV4(routeId);
    if (valide) {
      getUser(req, res, routeId);
    } else {
      errorNotValidId(req, res);
    }
  } else if (route === '/api/users' && method === 'POST') {
    createUser(req, res);
  } else if (parseRoute === '/api/users' && routeId && method === 'PUT') {
    const valide = uuidValidateV4(routeId);
    if (valide) {
      updateUser(req, res, routeId);
    } else {
      errorNotValidId(req, res);
    }
  } else if (parseRoute === '/api/users' && routeId && method === 'DELETE') {
    const valide = uuidValidateV4(routeId);
    if (valide) {
      deleteUser(req, res, routeId);
    } else {
      errorNotValidId(req, res);
    }
  } else {
    errorRouteNotFound(req, res);
  }
});

if (process.env.NODE_MULTI) {
  createProcesses(() => {
    server.listen(PORT, () => {
      console.log(`Server is runnig on port ${PORT}`);
      console.log('Current process:', process.pid);
    });
  });
} else {
  server.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
}
