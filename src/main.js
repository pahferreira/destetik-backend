import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';
import Cors from 'cors';
import passport from 'passport';

dotenv.config();
const app = express();

// Database Config
const port = process.env.PORT || 5000;
const databaseUri = `mongodb://${process.env.DATABASE_USER}:${
  process.env.DATABASE_PASSWORD
}@${process.env.DATABASE_URI}`;

mongoose
  .connect(databaseUri, {
    useNewUrlParser: true
  })
  .then(() => console.log('Database Connected.'))
  .catch(err => console.log(err));

require('./config/passport')  

app.use(Cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(passport.initialize())
app.use(passport.session())

app.listen(port, () => console.log(`Server is running! Port: ${port}`));
