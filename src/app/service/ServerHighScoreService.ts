import {Pool} from "pg";
import {IHighScoreService} from "./IHighScoreService";
import {HighScoreModel} from "../model/HighScore";

export class ServerHighScoreService implements IHighScoreService {

    constructor(private pool:Pool) {}

    get(size: number): Promise<HighScoreModel[]> {
        return this.pool.query("SELECT date, name, score FROM highscores").then(r => r.rows);
    }

    add(score: HighScoreModel): Promise<HighScoreModel> {
        if (!score.date) {
            score.date = Date.now().toString();
        }
        return this.pool.query("INSERT INTO highscores (date, score, name) VALUES ($1, $2, $3)", [
            score.date, score.score, score.name,
        ]).then(r => score)
    }

}