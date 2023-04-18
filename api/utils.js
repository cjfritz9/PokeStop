const { adminCheckById } = require('../dist/firestore');

const requireUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({
      error: '401',
      name: 'UnauthorizedError',
      message: 'Please login to perform this action.'
    });
  }

  next();
};

const requireAdmin = async (req, res, next) => {
  console.log('r we here');
  if (!req.user) {
    res.status(401);

    next({
      error: '401',
      name: 'UnauthorizedError',
      message: 'Please login to perform this action.'
    });
    return;
  }

  try {
    const admin = await adminCheckById(req.user.id);
    console.log('REQUSERID', req.user.id);
    console.log('REQUSERI=', req.user);
    console.log('ADMIN', admin);
    if (!admin) {
      res.status(401);

      next({
        error: 'Not Admin',
        name: 'Not Admin',
        message: "You aren't the admin"
      });
    }
    next();
  } catch ({ error, message }) {
    next({ error, message });
  }
};
module.exports = {
  requireUser,
  requireAdmin
};
