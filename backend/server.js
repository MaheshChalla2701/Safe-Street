const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // So images are public

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/report', require('./routes/report')); // 👈 add this

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// POST http://localhost:5000/api/auth/login

// {
//   "email": "kruthin@test.com",
//   "password": "123456"
// }

