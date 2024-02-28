import express from 'express';
import { reportController } from './controllers/reportController';
import { authenticateApiKey } from './utils/authentication';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/report', authenticateApiKey);


app.get('/report', reportController.getReport);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
