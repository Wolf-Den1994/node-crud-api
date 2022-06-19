import { v4 as uuidv4 } from 'uuid';
import request from 'supertest';
import { server } from '../index';
import { MessageForUser } from '../types/constants';

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

const badDataPostType = {
  username: 'Den',
  age: 27,
  hobbies: [777],
};

const badDataPostWithout = {
  username: 'Den',
  hobbies: ['FE', 'Node'],
};

const notFound = {
  message: MessageForUser.NotFound,
};

const requireBody = {
  message: MessageForUser.RequireBody,
};

const routeNotFound = {
  message: MessageForUser.RouteNotFound,
};

describe('Case 1. Simple testing', () => {
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

describe('Case 2. Testing some errors', () => {
  const anyId = uuidv4();
  let id: string;

  it('GET user by id', async () => {
    await request(server)
      .get(`${API}${anyId}`)
      .expect(404)
      .expect(({ body }) => {
        expect(body).toEqual(notFound);
      });
  });

  it('POST user with wrong type of body', async () => {
    await request(server)
      .post(API)
      .set('Content-type', 'application/json')
      .send(badDataPostType)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual(requireBody);
      });
  });

  it('POST user without a type of body', async () => {
    await request(server)
      .post(API)
      .set('Content-type', 'application/json')
      .send(badDataPostWithout)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual(requireBody);
      });
  });

  it('Create a new object by POST for PUT testing', async () => {
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

  it('PUT user without id', async () => {
    await request(server)
      .put(`${API}`)
      .set('Content-type', 'application/json')
      .send(dataPut)
      .expect(404)
      .expect(({ body }) => {
        expect(body).toEqual(routeNotFound);
      });
  });

  it('PUT user with wrong type of body', async () => {
    await request(server)
      .put(`${API}${id}`)
      .set('Content-type', 'application/json')
      .send(badDataPostType)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual(requireBody);
      });
  });

  it('PUT user without a type of body', async () => {
    await request(server)
      .put(`${API}${id}`)
      .set('Content-type', 'application/json')
      .send(badDataPostWithout)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual(requireBody);
      });
  });

  it('DELETE user without id', async () => {
    await request(server)
      .delete(API)
      .expect(404)
      .expect(({ body }) => {
        expect(body).toEqual(routeNotFound);
      });
  });
});
