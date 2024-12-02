import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();
app.use(express.json());

//Parsers
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Server Working');
});
//Application Routes
app.use('/api/v1', router);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
