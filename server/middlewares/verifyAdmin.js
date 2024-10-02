const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const adminEmail = 'admin_handihub@gmail.com';
  if (email !== adminEmail) {
    return res.status(403).send({ error: true, message: 'forbidden access' });
  }
  next();
};

module.exports = verifyAdmin;
