const esmImport = require('esm')(module);
const app = esmImport('../src/main').default;
const supertest = require('supertest');
const mongoose = require('mongoose');
const request = supertest(app);

// beforeAll(async done => {
//   try {
//     // const db = await mongoose.connect(
//     //   'mongodb://test_admin:testadmin123qwe@ds217678.mlab.com:17678/destetik-test',
//     //   {
//     //     useNewUrlParser: true
//     //   }
//     // );
//     return done();
//   } catch (error) {
//     console.log(error);
//   }
// });

afterAll(async done => {
  // await mongoose.disconnect();
  done();
});

describe('Services Tests', () => {
  it('Getting All Services', async done => {
    try {
      const res = await request.get('/api/service/');
      // Try it with .end()
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      done();
    } catch (e) {
      done(e);
    }
  });
});
