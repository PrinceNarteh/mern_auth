require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

// connecting to DB
connectDB();

// Instantiating Express App
const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Error handler should be the last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error occured: ${err.message}`)
    server.close(() => process.exit(1));
})