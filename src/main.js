import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes';
import Cors from 'cors';
import passport from 'passport';
require('./config/passport');

dotenv.config({
  path: path.resolve(
    __dirname,
    `../.environments/${process.env.ENVIRONMENT}.env`
  )
});
const app = express();

// Database Config
const port = process.env.PORT || 5000;
const databaseUri = `mongodb://localhost:27017/destetik`;

mongoose.connect(databaseUri, {
  useNewUrlParser: true
});

app.use(Cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.ENVIRONMENT === 'dev') {
  app.listen(port, () => console.log(`Server is running! Port: ${port}`));
}

export default app;
