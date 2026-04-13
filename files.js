const express = require('express');
const { protect } = require('../middleware/auth');
const File = require('../models/File');
const router = express.Router();

// @desc    Get user files
// @route   GET /api/files
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { search } = req.query;
    let query = { owner: req.user._id };
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const files = await File.find(query)
      .sort({ createdAt: -1 })
      .select('name size contentType url createdAt shareToken');

    res.json({
      success: true,
      files
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// TODO: Implement upload, delete, share endpoints

module.exports = router;

