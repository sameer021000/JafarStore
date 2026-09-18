require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Configuration/Configuration');
const authRoutes = require('./Routes/Routes');
const errorHandler = require('./Middlewares/Middlewares');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({
        message: 'CRUD Website Backend is running (MVC Architecture)'
    });
});

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on ${PORT}`);
});