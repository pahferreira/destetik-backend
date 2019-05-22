import validator from 'validator';

const isValid = (req, res, next) => {
  const { name, email, phone, price, description, address } = req.body;
  let errors = {};

  // Name
  if ('name' in req.body) {
    if (validator.isEmpty(name)) {
      errors.name = 'Campo nome não pode ser vazio';
    }
  }

  // Email
  if ('email' in req.body) {
    if (!validator.isEmail(email)) {
      errors.email = 'Formato de email inválido';
    } else if (validator.isEmpty(email)) {
      errors.email = 'Campo email não pode ser vazio';
    }
  }

  // Phone
  if ('phone' in req.body) {
    const phoneRegex = /(?=^(\+?5{2}\-?|0)[1-9]{2}\-?\d{4}\-?\d{4}$)(^(\+?5{2}\-?|0)[1-9]{2}\-?[6-9]{1}\d{3}\-?\d{4}$)|(^(\+?5{2}\-?|0)[1-9]{2}\-?9[6-9]{1}\d{3}\-?\d{4}$)/;
    if (!validator.isEmpty(phone)) {
      if (!phoneRegex.test(phone)) {
        errors.phone = 'Campo telefone inválido';
      }
    }
  }

  // Price
  if ('price' in req.body) {
    if (!validator.isNumeric(price)) {
      errors.price = 'Campo preço contem dígito(s) inválido(s)';
    } else if (price < 0) {
      errors.price = 'Campo preço contém valor inválido';
    } else if (validator.isEmpty(price)) {
      errors.price = 'Campo preço não pode ser vazio';
    }
  }

  // Description
  if ('description' in req.body) {
    if (validator.isEmpty(description)) {
      errors.description = 'Campo descrição não pode ser vazio';
    }
  }

  // Address
  if ('address' in req.body) {
    if (validator.isEmpty(address.street)) {
      errors.address = 'Campo rua não pode estar vazio';
    } else if (validator.isEmpty(address.district)) {
      errors.address = 'Campo bairro não pode estar vazio';
    } else if (validator.isEmpty(address.houseNumber)) {
      errors.address = 'Campo número da casa não pode estar vazio';
    } else if (!validator.isNumeric(address.houseNumber)) {
      errors.address = 'Campo número deve conter apenas números';
    }
  }

  if (Object.keys(errors).length === 0) {
    next();
  } else {
    return res.status(400).json(errors);
  }
};

export default isValid;
