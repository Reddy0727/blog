import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routers/user.router.js';
import authRouter from './routers/auth.route.js';

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errorCode = err.errorCode || 'SERVER_ERROR';

  res.status(statusCode).json({
    success: false,
    errorCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
  connectDB();
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log(`Server shutdown`);
  process.exit(0);
});

