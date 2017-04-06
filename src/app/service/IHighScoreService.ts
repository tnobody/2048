import {HighScoreModel} from "../model/HighScore";

export interface IHighScoreService {
    get(size:number):Promise<HighScoreModel[]>;
    add(score:HighScoreModel):Promise<HighScoreModel>;
}