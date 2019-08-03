import User from './model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import cloudinary from 'cloudinary';
import passwordValidator from 'password-validator';
import { RSA_NO_PADDING } from 'constants';
import nodeGeocoder from 'node-geocoder';
import { constants } from 'zlib';
import config from '../../config/config';

const cloudinary_v2 = cloudinary.v2;
const schema = new passwordValidator();
schema
  .is()
  .min(8)
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .letters();

dotenv.config();

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: `${process.env.GOOGLE_GEOCOORDS_API_KEY}`,
  formatter: null
};

const geocoder = nodeGeocoder(options);

const signToken = user => {
  return jwt.sign(
    {
      iss: 'CodeWorkr',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    config.secret
  );
};

class UserController {
  async store(req, res) {
    try {
      if (req.body.password.length < 8) {
        return res
          .status(400)
          .json({ password: 'A senha precisa ter mais de oito dígitos' });
      } else if (!schema.validate(req.body.password)) {
        return res.status(400).json({
          password: 'A senha precisa ter letras, números e caracteres especiais'
        });
      }
      if (req.body.password !== req.body.password2) {
        return res.status(400).json({ password2: 'As senhas não coincidem.' });
      }
      const { name, email, password } = req.body;
      const checkUser = await User.find({ email });
      if (checkUser.length > 0) {
        return res
          .status(400)
          .json({ email: 'Este e-mail já foi cadastrado.' });
      }
      const newUser = { name, email, password };
      const salts = 10;
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(newUser.password, salts, function(err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
      newUser.password = hashedPassword;
      const user = await User.create(newUser);
      return res.json(user);
    } catch (err) {
      console.log(err);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(404).json({ email: 'Usuário não encontrado.' });
      }
      const passwordMatch = await bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ password: 'Senha incorreta.' });
      }
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600
      });
      return res.json({
        success: true,
        token: `Bearer ${token}`
      });
    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    try {
      if ('email' in req.body) {
        const { email } = req.body;
        const checkUser = await User.find({ email });
        if (checkUser.length == 1 && checkUser[0].id != req.user.id)
          return res
            .status(400)
            .json({ email: 'Este e-mail já foi registrado.' });
      }

      if ('address' in req.body) {
        let { address } = req.body;
        const formatedAddress = `${address.street} - ${address.houseNumber}, ${
          address.city
        }, ${address.district}`;
        await geocoder.geocode(formatedAddress, (err, data) => {
          address['geoLocation'] = {};
          address.geoLocation.lat = data[0].latitude;
          address.geoLocation.lng = data[0].longitude;
          req.body.address = address;
        });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: req.body },
        { useFindAndModify: false, new: true }
      ).select('-password');
      return res.json(user);
    } catch (err) {
      console.log(err);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate({
          path: 'services',
          populate: [
            {
              path: 'serviceId',
              model: 'service'
            }
          ]
        })
        .select('-password');
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ name: 'Usuário não encontrado' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async showAll(req, res) {
    try {
      const users = await User.find()
        .populate({
          path: 'services',
          populate: [
            {
              path: 'serviceId',
              model: 'service'
            }
          ]
        })
        .select('-password');
      return res.json(users);
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.user.id
      }).select('-password');
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ name: 'Usuário não encontrado' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async update_photo_profile(req, res) {
    try {
      const path = req.file.path;
      const uniqueFilename = new Date().toISOString();

      cloudinary_v2.config({
        cloud_name: `${process.env.CLOUDINARY_NAME}`,
        api_key: `${process.env.CLOUDINARY_API_KEY}`,
        api_secret: `${process.env.CLOUDINARY_API_SECRET}`
      });

      cloudinary_v2.uploader.upload(
        path,
        { public_id: `profile/${uniqueFilename}`, tags: `profile` },
        async (err, image) => {
          if (err) {
            return res.send(err);
          }
          // remove file from server
          fs.unlinkSync(path);

          const update = { profileImg: image.url };
          const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: update },
            { useFindAndModify: false, new: true }
          ).select('-password');
          return res.json(user);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async current(req, res, next) {
    try {
      const user = await User.findById({ _id: req.user.id }).populate({
        path: 'services',
        populate: [
          {
            path: 'serviceId',
            model: 'service'
          }
        ]
      });
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ name: 'Usuário não encontrado' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async facebookOAuth(req, res, next) {
    // Generate token
    const payload = {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600
    });
    return res.json({
      success: true,
      token: `Bearer ${token}`
    });
  }

  async googleOAuth(req, res, next) {
    const payload = {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600
    });
    return res.json({
      success: true,
      token: `Bearer ${token}`
    });
  }
}

const userController = new UserController();
export default userController;
