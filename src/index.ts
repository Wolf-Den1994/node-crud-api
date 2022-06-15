import { v4 as uuidv4 } from 'uuid';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { IUser } from './types';

const users: IUser[] = [
  {
    id: uuidv4(),
    username: 'name',
    age: 22,
    hobbies: ['hobby1', 'hobby2'],
  },
];

const PORT = process.env.PORT || 4000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const route = req.url?.replace(/\/$|\/*$/g, '');
  const method = req.method || '';

  if (route === '/api/users') {
    switch (method) {
      case 'GET':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
        break;
      default:
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ooops, Something Wrong' }));
        break;
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

server.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
