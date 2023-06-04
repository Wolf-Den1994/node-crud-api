import { createServer, IncomingMessage, ServerResponse } from 'http';
import { uuidValidateV4, parseUrl } from './utils/common';
import {
  getUsers, getUser, errorRouteNotFound, errorNotValidId, createUser, updateUser, deleteUser, handleErrorServer,
} from './controllers/userController';
import { createProcesses } from './cluster';
import {
  defaultPort, Processes, ApiRoute, RestMethod,
} from './types/constants';

const PORT = process.env.NODE_TEST ? 5000 : (process.env.PORT || defaultPort);

export const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    const route = req.url?.replace(/\/$|\/*$/g, '');
    const parseRoute = parseUrl(route)?.replace(/\/$|\/*$/g, '');
    const routeId = req.url?.split('/')[3];
    const method = req.method || '';

    console.log(Processes.Current, process.pid);

    if (route === ApiRoute.Main && !routeId && method === RestMethod.GET) {
      getUsers(req, res);
    } else if (parseRoute === ApiRoute.Main && routeId && method === RestMethod.GET) {
      const valide = uuidValidateV4(routeId);
      if (valide) {
        getUser(req, res, routeId);
      } else {
        errorNotValidId(req, res);
      }
    } else if (route === ApiRoute.Main && method === RestMethod.POST) {
      createUser(req, res);
    } else if (parseRoute === ApiRoute.Main && routeId && method === RestMethod.PUT) {
      const valide = uuidValidateV4(routeId);
      if (valide) {
        updateUser(req, res, routeId);
      } else {
        errorNotValidId(req, res);
      }
    } else if (parseRoute === ApiRoute.Main && routeId && method === RestMethod.DELETE) {
      const valide = uuidValidateV4(routeId);
      if (valide) {
        deleteUser(req, res, routeId);
      } else {
        errorNotValidId(req, res);
      }
    } else {
      errorRouteNotFound(req, res);
    }
  } catch (error) {
    handleErrorServer(req, res);
  }
});

if (process.env.NODE_MULTI) {
  createProcesses(() => {
    server.listen(PORT, () => {
      console.log(`${Processes.Run} ${PORT}`);
      console.log(Processes.Current, process.pid);
    });
  });
} else {
  server.listen(PORT, () => console.log(`${Processes.Run} ${PORT}`));
}
