import express from 'express';
import cors from 'cors';
import restaurantRoutes from './routes/restaurantRoutes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/restaurant', restaurantRoutes);

app.listen(port, () => {
  console.log(`Serveur back-end démarré sur http://localhost:${port}`);
});
