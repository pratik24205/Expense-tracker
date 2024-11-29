import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import incomeRoutes from './routes/income';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/income', incomeRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
