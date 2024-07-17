import express from 'express';
import bodyParser from 'body-parser';

// import swaggerDocument from '../swagger.json' assert { type: 'json' };
import paymentRoutes from '../routes/paymentRoutes.js';
import connectDB from './db.js';

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/payments', paymentRoutes); // Ensure this route is correct


export default app;
