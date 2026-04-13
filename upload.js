const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/File');
const { protect } = require('../middleware/auth');
const router = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || 
        file.mimetype === 'application/pdf' || 
        file.mimetype.includes('document') ||
        file.mimetype.includes('spreadsheet') ||
        file.mimetype.includes('presentation')) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'));
    }
  }
});

// @desc    Upload file to S3
// @route   POST /api/files/upload
// @access  Private
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const fileKey = `files/${req.user._id}/${uuidv4()}-${req.file.originalname}`;

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(params));

    // Get public URL
    const url = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    // Save to DB
    const fileDoc = await File.create({
      name: req.file.originalname,
      size: req.file.size,
      key: fileKey,
      url,
      contentType: req.file.mimetype,
      owner: req.user._id,
    });

    res.json({
      success: true,
      file: fileDoc,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete file
// @route   DELETE /api/files/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.params.id, owner: req.user._id });
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // TODO: Delete from S3
    await File.findByIdAndDelete(req.params.id);
    
    res.json({ success: true, message: 'File deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Generate share link
// @route   POST /api/files/:id/share
// @access  Private
router.post('/:id/share', protect, async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.params.id, owner: req.user._id });
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: file.key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour

    res.json({
      success: true,
      shareUrl: signedUrl,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

