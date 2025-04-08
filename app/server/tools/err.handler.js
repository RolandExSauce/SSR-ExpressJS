//err handler
const errorHandler = (err, req, res, nextFunc) => {
  console.error(err.stack); //log err for debug
  res.status(500).send("Internal Server Error");
};

export { errorHandler };
