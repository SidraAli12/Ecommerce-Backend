const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//const protect = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes');
dotenv.config();
const app = express();

const connectDB = require('./config/db');
connectDB(); 
const userroutes = require('./routes/userroutes');
const protect = require('./middleware/authMiddleware');
const cartRoutes = require('./routes/cartRoutes');
// middleware
app.use(express.json());
app.use(cors());

app.use('/api/cart', cartRoutes);

app.get('/api/protected', protect, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

app.use('/api/products', productRoutes);
// routes
app.use('/api/users', userroutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});