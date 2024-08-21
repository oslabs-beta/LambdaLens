import express, { NextFunction, Request, Response } from 'express';
import { getLogs } from './controllers/lambdaController';

const app = express();

const PORT = 8080;

getLogs().then(() => {
  console.log('Log fetching completed');
}).catch(err => {
  console.log('Error fetching logs:', err.message)
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
