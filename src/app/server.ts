import * as express from 'express';
import {initDataBase, DatabasePool} from "./database";
import {IHighScoreService} from "./service/IHighScoreService";
import {ServerHighScoreService} from "./service/ServerHighScoreService";
import * as bodyParser from 'body-parser';

const PORT = process.env.PORT || 3434;

const app = express();
app.use(express.static(process.cwd()));
app.use(bodyParser.json())

process.on('unhandledRejection', function (e) {
    console.log(e.message, e.stack)
})

const highScoreService:IHighScoreService = new ServerHighScoreService(DatabasePool);

app.get('/highscore', (req, res:express.Response) => {
    highScoreService.get(10).then(hs => {
        res.status(200).send(hs);
    }, err => {
        console.error(err);
        res.status(500).send(err)
    })
});

app.put('/highscore', (req, res) => {
    highScoreService.add(req.body).then(hs => res.send(hs));
})

console.log('Init Database')
initDataBase().then(
    (r) => {
        console.log('Database Setup done', r)
        app.listen(PORT, () => {
            console.log('Server Running on ' + PORT);
        });
    },
    (e) => console.log('Error to init Database ', e)
)
