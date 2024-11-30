import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { LibrarianRoute } from './app/modules/librarians/librarian.route';

const app: Application = express();

//Parsers
app.use(express.json());
app.use(cors());

//Application Routes

app.use('/api/v1/librarians', LibrarianRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
