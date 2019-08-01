require('dotenv').config();
module.exports = {
    secret: process.env.JWT_SECRET,
    facebook_api_key: process.env.FACEBOOK_API_KEY,
    facebook_api_secret: process.env.FACEBOOK_API_SECRET,
}