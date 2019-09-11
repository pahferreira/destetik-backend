const esmImport = require('esm')(module);
const app = esmImport('../src/main').default;
const supertest = require('supertest');
const mongoose = require('mongoose');
const request = supertest(app);
const newUser = {};

afterAll(async done => {
  done();
});

beforeAll(() => {
  newUser.name = 'Fulano de Tal';
  newUser.email = 'fulando@tal.com';
  newUser.password = 'superseguro123#$%'
  newUser.password2 = 'superseguro123#$%'
});

describe('Users Tests', () => {
  it('Getting All Users', async done => {
    try {
      const res = await request.get('/api/user/all');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Create One User', async done => {
    try {
      const res = await request.post('/api/user/register/').send(newUser);
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      expect(res.body.name).toBe(newUser.name);
      expect(res.body.email).toBe(newUser.email);
      expect(res.body.password).toBe(undefined);
      newUser.id = res.body._id;
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Login User', async done => {
    try {
      const res = await request.post('/api/user/login/').send(newUser);
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      expect(res.body.token).not.toBeNull();
      newUser.token = res.body.token
      console.log(newUser.token);
      
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Removing User by Token', async done => {
    try {
      const res = await request.delete(`/api/user/delete/`).set('Authorization', newUser.token);
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      done();
    } catch (e) {
      done(e);
    }
  });
});

describe('Removing User', () => { });

// serviceRouter.delete('/:id', ServiceController.delete);
