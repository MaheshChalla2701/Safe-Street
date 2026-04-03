// backend/routes/report.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const Report = require('../models/Report');
const nodemailer = require('nodemailer');

const router = express.Router();

// 🧳 Multer storage config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ✅ POST /api/report — Upload, Predict, Save, and Notify
router.post('/', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const { latitude, longitude } = req.body;

  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    const predictionRes = await axios.post('http://127.0.0.1:8000/predict', form, {
      headers: form.getHeaders()
    });

    const { type, severity, repair_priority } = predictionRes.data;

    const report = new Report({
      type,
      severity,
      repair_priority,
      latitude,
      longitude,
      imagePath: filePath
    });
    await report.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'psrikruthin@gmail.com',
        pass: 'yubrzosabxkknnxp'
      }
    });

    const mailOptions = {
      from: 'SafeStreet <psrikruthin@gmail.com>',
      to: 'psrikruthin@gmail.com',
      subject: '⚠️ Road Damage Detected - SafeStreet Alert',
      html: `
        <h2>🚧 Damage Type: ${type}</h2>
        <p><strong>Severity:</strong> ${severity}</p>
        <p><strong>Repair Priority:</strong> ${repair_priority}</p>
        <p><a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">📍 View on Google Maps</a></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      message: 'Report saved and email sent ✅',
      data: predictionRes.data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Prediction or email failed ❌' });
  }
});

// ✅ GET /api/report/all — Fetch all reports for dashboard
router.get('/all', async (req, res) => {
  try {
    const allReports = await Report.find({}).sort({ createdAt: -1 });
    res.json(allReports);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
});

module.exports = router;

