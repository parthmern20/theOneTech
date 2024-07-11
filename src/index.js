import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import morgan from 'morgan'
import allRoutes from './routes/allRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', allRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));