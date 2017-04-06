import {Pool} from "pg";
import * as url from 'url';

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: Number(params.port),
    database: params.pathname.split('/')[1],
    ssl: true
};


export const DatabasePool = new Pool(config);

export function initDataBase() {
    return DatabasePool.query(`
        CREATE TABLE IF NOT EXISTS highscore (
            name varchar(50),
            date varchar(50),
            score integer
        )
    `)
}
