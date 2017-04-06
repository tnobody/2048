import {IHighScoreService} from "./IHighScoreService";
import {HighScoreModel} from "../model/HighScore";
import 'isomorphic-fetch'

export class ClientHighScoreService implements IHighScoreService {
    get(size: number): Promise<HighScoreModel[]> {
        return fetch('highscores').then(r => r.json() as Promise<HighScoreModel[]>);
    }

    add(score: HighScoreModel): Promise<HighScoreModel> {
        return fetch('highscores', {
            method:'POST',
            body: JSON.stringify(score),
            headers: {"Content-Type": "application/json"}
        }).then(r => r.json() as Promise<HighScoreModel>);
    }

}