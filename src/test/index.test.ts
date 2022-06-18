import request from 'supertest';
import { server } from '../index';

const API = '/api/users/';

describe('Case 1', () => {
  it('GET users', async () => {
    const { body } = await request(server).get(API).expect(200);
    expect(body).toHaveLength(0);
  });
});
