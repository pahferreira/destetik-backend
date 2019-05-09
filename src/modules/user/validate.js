import validator from 'validator';
import passwordValidator from 'password-validator';

const isValid = (req, res, next) => {
  const { name, email, password } = req.body;
  let result = {};
  const schema = new passwordValidator();
  schema
    .has()
    .digits()
    .has()
    .symbols()
    .has()
    .letters();
  if (email) {
    if (!validator.isEmail(email)) {
      result = {
        error: 'Formato de email incorreto'
      };
    }
  } else {
    result = {
      error: 'Campo email em branco'
    };
  }

  if (password) {
    if (!schema.validate(password)) {
      result = {
        error: 'A senha necessita ter letras, números e caracteres especiais'
      };
    }
  } else {
    result = {
      error: 'Campo senha em branco'
    };
  }

  if (!name) {
    result = {
      error: 'Campo nome está vazio'
    };
  }
  if (Object.keys(result).length === 0) {
    next();
  } else {
    return res.status(400).json(result);
  }
};

export default isValid;
