const express = require('express');
const cors = require('cors');
const referralRoutes = require('./routes/referralRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use('/api', referralRoutes);
app.use(errorHandler);

module.exports = app;
