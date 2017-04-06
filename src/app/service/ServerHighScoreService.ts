import {Pool} from "pg";
import {IHighScoreService} from "./IHighScoreService";
import {HighScoreModel} from "../model/HighScore";

export class ServerHighScoreService implements IHighScoreService {


    constructor(private dbPool:Pool) {
    }

    get(size: number): Promise<HighScoreModel[]> {
        return this.dbPool.query("SELECT date, name, score FROM highscore ORDER by score DESC LIMIT $1", [size]).then(r => r.rows);
    }

    add(score: HighScoreModel): Promise<HighScoreModel> {
        if (!score.date) {
            score.date = Date.now().toString();
        }
        return this.dbPool.query("INSERT INTO highscore (date, score, name) VALUES ($1, $2, $3)", [
            score.date, score.score, score.name,
        ]).then(r => score)
    }

}