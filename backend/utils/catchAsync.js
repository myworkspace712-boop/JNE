// Higher-order function to catch errors from async controller methods
// and pass them cleanly to Express's global error handler via next()
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsync;
