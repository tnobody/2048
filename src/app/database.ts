import {Pool} from "pg";
import * as url from 'url';

const params = url.parse(process.env.DATABASE_URL || 'localhost:5432');
let credentials = {};
if(params.auth) {
    const auth = params.auth.split(':');
    credentials = {
        user: auth[0],
        password: auth[1],
    }
}

const config = {
    ...credentials,
    host: params.hostname,
    port: Number(params.port),
    database: (params.pathname) ? params.pathname.split('/')[1] : 'postgres',
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
