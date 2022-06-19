export const defaultPort = 4000;

export enum Processes {
  Current = 'Current process:',
  Run = 'Server is runnig on port',
  Primary = 'Primary started:',
  CPUs = 'CPUs',
  WorkerExid = 'Worker exided:'
}

export enum ApiRoute {
  Main = '/api/users'
}

export enum RestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum MessageForUser {
  ServerBrake = 'Ooops, something wrong! Server is broken',
  FatalServerBrake = 'Sorry, you broke server! Contact the administrator',
  NotFound = 'User Not Found',
  RequireBody = "Body doen'nt contain required fields",
  NotValidId = 'Not Valid id',
  RouteNotFound = 'Route Not Found'
}
