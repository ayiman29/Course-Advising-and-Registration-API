import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';
import advisorRoutes from './routes/advisorRoutes.js';
import registrarRoutes from './routes/registrarRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend API!');
});

app.use('/students', studentRoutes);
app.use('/advisors', advisorRoutes);
app.use('/registrars', registrarRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
