module.exports = async (req, res, next) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
      next();
    } catch (error) {
      console.error('isAdmin middleware error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };