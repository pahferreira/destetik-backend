import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
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

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => console.log(`Server is running! Port: ${port}`));
