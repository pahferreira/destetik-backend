import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token_header = req.header('Authorization').split('Bearer ')[1];
  console.log(token_header);
  if (!token_header)
    return res.status(401).send({ error: 'Token was not send.' });

  jwt.verify(token_header, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token is invalid.' });
    res.locals.auth_data = decoded;
    return next();
  });
};

export default auth;
