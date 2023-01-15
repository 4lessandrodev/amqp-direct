import Express, { Request, Response } from 'express';
import { sendMessage } from './rabbit.factory';
import './rabbit.factory';

const app = Express();
app.use(Express.json());

app.post('/1', (req: Request, res: Response) => {
    const body = req.body;
    const channel = 'routing-key-01';
    sendMessage(body, channel);
    res.status(200).json({ success: true });
});

app.post('/2', (req: Request, res: Response) => {
    const body = req.body;
    const channel = 'routing-key-02';
    sendMessage(body, channel);
    res.status(200).json({ success: true });
});

app.listen(4000);
