import validator from 'validator';

const isValid = (req, res, next) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ email: 'Formato de email inválido' });
  }
  if (validator.isEmail(email) === undefined) {
    return res.status(400).json({ email: 'Campo email em branco' });
  }
};

export default isValid;
