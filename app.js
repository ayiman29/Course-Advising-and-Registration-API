import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';
import advisorRoutes from './routes/advisorRoutes.js';
import registrarRoutes from './routes/registrarRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5050;
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin(origin, cb) {

      if (!origin) return cb(null, true);
      cb(null, allowedOrigins.includes(origin));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend API!');
});

app.use('/students', studentRoutes);
app.use('/advisors', advisorRoutes);
app.use('/registrars', registrarRoutes);
app.use('/auth', authRoutes);

import { pingDB } from './db.js';

// ...after dotenv.config(), before app.listen:
pingDB().catch(err => {
  console.error('❌ DB connection failed:', err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
