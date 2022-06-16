import { IncomingMessage } from 'http';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const uuidValidateV4 = (uuid: string): boolean => uuidValidate(uuid) && uuidVersion(uuid) === 4;

export const checkArray = (array: string[]) => {
  return Array.isArray(array) && array.every((value) => typeof value === 'string');
};

export const getPostData = (req: IncomingMessage): Promise<string> => new Promise((res, rej) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      res(body);
    });
  } catch (error) {
    rej(error);
  }
});

export const parseUrl = (url: string | undefined) => url?.split('/').reduce((acc, cur, idx) => {
  if (idx < 3) return `${acc + cur}/`;
  return acc;
}, '');
