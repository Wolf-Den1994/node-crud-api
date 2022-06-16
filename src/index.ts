import { createServer, IncomingMessage, ServerResponse } from 'http';
import { uuidValidateV4 } from './utils/common';
import {
  getUsers, getUser, errorRouteNotFound, errorNotValidId,
} from './controllers/userController';

const PORT = process.env.PORT || 4000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const route = req.url?.replace(/\/$|\/*$/g, '');
  const routeId = req.url?.split('/')[3];
  const method = req.method || '';

  if (route === '/api/users' && method === 'GET') {
    getUsers(req, res);
  } else if (routeId && method === 'GET') {
    const valide = uuidValidateV4(routeId);
    console.log('valide', valide);
    if (valide) {
      getUser(req, res, routeId);
    } else {
      errorNotValidId(req, res);
    }
  } else {
    errorRouteNotFound(req, res);
  }
});

server.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
