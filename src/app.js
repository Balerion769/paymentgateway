import express from 'express';
import bodyParser from 'body-parser';

// import swaggerDocument from '../swagger.json' assert { type: 'json' };
import paymentRoutes from '../routes/paymentRoutes.js';
import connectDB from './db.js';
import cors from 'cors';

const app = express();
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('src/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/payments', paymentRoutes); // Ensure this route is correct


export default app;
