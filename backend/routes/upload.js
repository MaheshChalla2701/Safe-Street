import express from 'express';
import multer from 'multer';
import Report from '../models/Report.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST /api/upload
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  // For now, fake prediction output
  const prediction = {
    type: 'Pothole',
    severity: 'Moderate',
    repair_priority: 'Medium'
  };

  const report = new Report({
    imageUrl: `/uploads/${req.file.filename}`,
    ...prediction,
    uploadedBy: req.user.id
  });

  await report.save();
  res.json(prediction);
});

export default router;
