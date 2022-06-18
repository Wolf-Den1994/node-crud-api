import request from 'supertest';
import { server } from '../index';

const API = '/api/users/';

const dataPost = {
  username: 'Den',
  age: 27,
  hobbies: ['FE', 'Node'],
};

const dataPut = {
  username: 'Updated name',
  age: 18,
  hobbies: [],
};

const notFound = {
  message: 'User Not Found',
};

describe('Case 1', () => {
  let id: string;

  it('GET all records', async () => {
    await request(server)
      .get(API)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveLength(0);
      });
  });

  it('Create a new object by POST', async () => {
    await request(server)
      .post(API)
      .set('Content-type', 'application/json')
      .send(dataPost)
      .expect(201)
      .expect(({ body }) => {
        id = body.id;
        const expectedResult = { ...dataPost, id };
        expect(body).toEqual(expectedResult);
      });
  });

  it('GET the created record by its id', async () => {
    await request(server)
      .get(`${API}${id}`)
      .expect(200)
      .expect(({ body }) => {
        const expectedResult = { ...dataPost, id };
        expect(body).toEqual(expectedResult);
      });
  });

  it('Update the created record with a PUT', async () => {
    await request(server)
      .put(`${API}${id}`)
      .set('Content-type', 'application/json')
      .send(dataPut)
      .expect(200)
      .expect(({ body }) => {
        id = body.id;
        const expectedResult = { ...dataPut, id };
        expect(body).toEqual(expectedResult);
      });
  });

  it('DELETE the created object by id', async () => {
    await request(server)
      .delete(`${API}${id}`)
      .expect(204);
  });

  it('GET a deleted object by id', async () => {
    await request(server)
      .get(`${API}${id}`)
      .expect(404)
      .expect(({ body }) => {
        expect(body).toEqual(notFound);
      });
  });
});
