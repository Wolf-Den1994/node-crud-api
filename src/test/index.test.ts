import { v4 as uuidv4 } from 'uuid';
import request from 'supertest';
import { server } from '../index';
import {
  API, dataPost, dataPut, badDataPostType, badDataPostWithout, notFound, requireBody, routeNotFound, notValidId,
} from './testValues';

describe('\nCase 1. Simple testing', () => {
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

describe('\nCase 2. Testing some errors', () => {
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
      .put(API)
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

describe('\nCase 3. Bad situation for request', () => {
  const customId = '20354d7ae4fe47af8ff6187bca92f3ff';
  let id: string;

  it('GET user by id with not valid id', async () => {
    await request(server)
      .get(`${API}${customId}`)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual(notValidId);
      });
  });

  it('POST a new object with wrong route', async () => {
    await request(server)
      .post(`${API}${customId}`)
      .set('Content-type', 'application/json')
      .send(dataPost)
      .expect(404)
      .expect(({ body }) => {
        expect(body).toEqual(routeNotFound);
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

  it('PUT user with not valid id', async () => {
    await request(server)
      .put(`${API}${customId}`)
      .set('Content-type', 'application/json')
      .send(dataPut)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual(notValidId);
      });
  });

  it('PUT user with valid id', async () => {
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

  it('DELETE user with not valid id', async () => {
    await request(server)
      .delete(`${API}${customId}`)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual(notValidId);
      });
  });

  it('GET user with valid id', async () => {
    await request(server)
      .get(`${API}${id}`)
      .expect(200)
      .expect(({ body }) => {
        const expectedResult = { ...dataPut, id };
        expect(body).toEqual(expectedResult);
      });
  });

  it('DELETE user with not valid id', async () => {
    await request(server)
      .delete(`${API}${customId}`)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual(notValidId);
      });
  });

  it('DELETE user with valid id', async () => {
    await request(server)
      .delete(`${API}${id}`)
      .expect(204);
  });

  it('GET user with valid id', async () => {
    await request(server)
      .get(`${API}${id}`)
      .expect(404)
      .expect(({ body }) => {
        expect(body).toEqual(notFound);
      });
  });
});
