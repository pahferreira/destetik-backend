import path from 'path';

require('dotenv').config({
  path: path.resolve(
    __dirname,
    `../../.environments/${process.env.ENVIRONMENT}.env`
  )
});

export default {
  secret: process.env.JWT_SECRET,
  facebook_api_key: process.env.FACEBOOK_API_KEY,
  facebook_api_secret: process.env.FACEBOOK_API_SECRET
};
