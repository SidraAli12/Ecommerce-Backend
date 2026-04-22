const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // ✅ sabse pehle

const app = express();

const connectDB = require('./config/db');
connectDB(); // ✅ ab env load ho chuki hai

const userroutes = require('./routes/userroutes');

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/users', userroutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});