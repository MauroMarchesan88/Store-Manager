module.exports = (err, _req, res, _next) => {
  if (err.message.includes(' is required')) {
    return res.status(400)
      .json({ message: err.details[0].message });
  }
  if (err.message.includes(' must be ')) {
    return res.status(422)
      .json({ message: err.details[0].message });
  }
  if (err.code) {
    const statusByErrorCode = {
      notFound: 404,
      alreadyExists: 409,
    };

    const status = statusByErrorCode[err.code] || 500;
    console.log(err);

    return res.status(status).json({ message: err.message });
  }

  return res.status(500).json({ error: { code: 'internal', message: 'Internal server error' } });
};