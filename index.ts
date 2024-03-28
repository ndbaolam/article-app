import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 3000;

//Rest API
app.get('/article', (req: Request, res: Response) => {
    res.json({
        article: []
    });
});

app.listen(port, () => {
    console.log(`App listening port ${port}`);
});