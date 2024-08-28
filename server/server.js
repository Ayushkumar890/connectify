const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Use CORS middleware to allow requests from different origins
app.use(cors({
    origin: 'http://localhost:3001' // Frontend origin
}));

app.use(express.json());

// Import and connect to the database
require('./config/database').connect();

// Import routes
const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
