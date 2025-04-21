module.exports = (req, res, next) => {
  // Check if req.user exists and has the role property
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  // Proceed to the next middleware/route handler
  next();
};
