const esmImport = require('esm')(module);
const app = esmImport('../src/main').default;
const supertest = require('supertest');
const mongoose = require('mongoose');
const request = supertest(app);
const faker = require('faker')
const newUser = {};

afterAll(async done => {
  done();
});

beforeAll(() => {
  newUser.name = faker.name.findName();
  newUser.email = faker.internet.email();
  newUser.password = 'asjdfaMKINJH345#$%#';
  newUser.password2 = newUser.password
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
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Updating User by id', async done => {
    try {
      newUser.name = faker.name.findName()
      const res = await request
        .patch(`/api/user/update/`)
        .set('Authorization', newUser.token)
        .send(newUser);
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      expect(res.body.name).toBe(newUser.name);
      expect(res.body._id).toBe(newUser.id);
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Get Current User', async done => {
    try {
      const res = await request.get('/api/user/current/')
        .set('Authorization', newUser.token)
        .send(newUser);
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      expect(res.body._id).toBe(newUser.id);
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Get Specific User', async done => {
    try {
      const res = await request.get(`/api/user/show/${newUser.id}`)
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      expect(res.body._id).toBe(newUser.id);
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
