const esmImport = require('esm')(module);
const app = esmImport('../src/main').default;
const supertest = require('supertest');
const mongoose = require('mongoose');
const request = supertest(app);
const newService = {};

afterAll(async done => {
  done();
});

beforeAll(() => {
  newService.name = 'Test Service';
  newService.description = 'Test description';
});

describe('Services Tests', () => {
  it('Getting All Services', async done => {
    try {
      const res = await request.get('/api/service/');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Create One Service', async done => {
    try {
      const res = await request.post('/api/service/register/').send(newService);
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      expect(res.body.name).toBe(newService.name);
      expect(res.body.description).toBe(newService.description);
      newService.id = res.body._id;
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Getting Service by id', async done => {
    try {
      const res = await request.get(`/api/service/${newService.id}`);
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      expect(res.body.name).toBe(newService.name);
      expect(res.body.description).toBe(newService.description);
      expect(res.body._id).toBe(newService.id);
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Updating Service by id', async done => {
    try {
      const testUpdate = {
        name: 'Test Updated Name'
      };
      const res = await request
        .patch(`/api/service/update/${newService.id}`)
        .send(testUpdate);
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      expect(res.body.name).toBe(testUpdate.name);
      expect(res.body._id).toBe(newService.id);
      done();
    } catch (e) {
      done(e);
    }
  });
  it('Removing Service by id', async done => {
    try {
      const res = await request.delete(`/api/service/${newService.id}`);
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
      expect(res.body.description).toBe(newService.description);
      expect(res.body._id).toBe(newService.id);
      done();
    } catch (e) {
      done(e);
    }
  });
});

describe('Removing Service', () => {});

// serviceRouter.delete('/:id', ServiceController.delete);
