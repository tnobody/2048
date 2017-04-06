import * as express from 'express';
import {initDataBase, DatabasePool} from "./database";
import {IHighScoreService} from "./service/IHighScoreService";
import {ServerHighScoreService} from "./service/ServerHighScoreService";

const PORT = process.env.PORT || 3434;

const app = express();
console.log('Dir', __dirname, process.cwd());
app.use(express.static(process.cwd()));

process.on('unhandledRejection', function (e) {
    console.log(e.message, e.stack)
})

const highScoreService:IHighScoreService = new ServerHighScoreService(DatabasePool);

app.get('highscore', (req, res) => {
    highScoreService.get(10).then(hs => {
        res.send();
    })
});

app.put('highscore', (req, res) => {
    highScoreService.add(JSON.parse(req.body)).then(hs => res.send(hs));
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
