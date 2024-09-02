const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./DB/db');
const transactionRoutes = require('./Routers/Transactions');
const userRoutes = require('./Routers/userRoute');

dotenv.config();
const app = express();

const port = process.env.PORT;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API Routes
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route for frontend routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
