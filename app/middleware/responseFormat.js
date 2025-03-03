const responseFormatter = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    originalJson.call(this, {
      statusCode: res.statusCode,
      data,
    });
  };

  next();
};

export default responseFormatter;
