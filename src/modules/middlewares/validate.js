import validator from 'validator';
// import passwordValidator from 'password-validator';

const isValid = (req, res, next) => {
  const { name, email, phone, price, description, address } = req.body;
  let result = { errors: {} };

  // Name
  if ('name' in req.body) {
    if (validator.isEmpty(name)) {
      result.errors.name = 'Campo nome não pode ser vazio';
    }
  }

  // Email
  if ('email' in req.body) {
    if (validator.isEmpty(email)) {
      result.errors.email = 'Campo email não pode ser vazio';
    } else if (!validator.isEmail(email)) {
      result.errors.email = 'Formato de email inválido';
    }
  }

  // Phone
  if ('phone' in req.body) {
    const phoneRegex = /(?=^(\+?5{2}\-?|0)[1-9]{2}\-?\d{4}\-?\d{4}$)(^(\+?5{2}\-?|0)[1-9]{2}\-?[6-9]{1}\d{3}\-?\d{4}$)|(^(\+?5{2}\-?|0)[1-9]{2}\-?9[6-9]{1}\d{3}\-?\d{4}$)/;
    if (!validator.isEmpty(phone)) {
      if (!phoneRegex.test(phone)) {
        result.errors.phone = 'Campo telefone inválido';
      }
    }
  }

  // Price
  if ('price' in req.body) {
    if (validator.isEmpty(price)) {
      result.errors.price = 'Campo preço não pode ser vazio';
    } else if (!validator.isNumeric(price)) {
      result.errors.price = 'Campo preço contem dígito(s) inválido(s)';
    } else if (price < 0) {
      result.errors.price = 'Campo preço contém valor inválido';
    }
  }

  // Description
  if ('description' in req.body) {
    if (validator.isEmpty(description)) {
      result.errors.description = 'Campo descrição não pode ser vazio';
    }
  }

  // Address
  if ('address' in req.body) {
    if (validator.isEmpty(address.street)) {
      result.errors.address = 'Campo rua não pode ser vazio';
    } else if (validator.isEmpty(address.district)) {
      result.errors.address = 'Campo bairro não pode ser vazio';
    } else if (validator.isEmpty(address.houseNumber)) {
      result.errors.address = 'Campo número da casa não pode ser vazio';
    } else if (!validator.isNumeric(address.houseNumber)) {
      result.errors.address = 'Campo número deve conter apenas números';
    }
  }

  if (Object.keys(result.errors).length === 0) {
    next();
  } else {
    return res.status(400).json(result);
  }
};

export default isValid;
