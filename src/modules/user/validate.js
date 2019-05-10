import validator from 'validator';
import passwordValidator from 'password-validator';

const isValid = (req, res, next, phone, price, description, address) => {
  const { name, email, password } = req.body;
  let result = {};
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

  const phoneNumber = new passwordValidator();
  phoneNumber.has(/\(\d{2}\) \d{4,}\-\d{4}/g);

  if (email) {
    if (!validator.isEmail(email)) {
      result = {
        email: 'Formato de email incorreto'
      };
    }
  } else {
    result = {
      email: 'Campo email em branco'
    };
  }

  if (password) {
    if (!schema.validate(password)) {
      result = {
        password: 'A senha necessita ter letras, números e caracteres especiais'
      };
    }
    if (password.length < 8) {
      result = {
        password: 'A senha precisa ter mais de oito letras'
      };
    }
  } else {
    result = {
      password: 'Campo senha em branco'
    };
  }

  if (!name) {
    result = {
      name: 'Campo nome está vazio'
    };
  }

  /*  if (phone) {
    if (!validator.isMobilePhone(phone)) {
      result = {
        phone: 'Telefone inválido'
      };
    }
  } */

  if (price) {
    if (price <= 0) {
      result = {
        price: 'Preço não pode ser menor ou igual que zero'
      };
    }
  } else {
    result = {
      price: 'Campo preço em branco'
    };
  }

  if (!description) {
    result = {
      description: 'Campo descrição em branco'
    };
  }
  if (Object.keys(result).length === 0) {
    next();
  } else {
    return res.status(400).json(result);
  }
};

export default isValid;
