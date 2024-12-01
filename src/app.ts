import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import router from './app/routes';

const app: Application = express();

//Parsers
app.use(express.json());
app.use(cors());

//Application Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server Working');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
