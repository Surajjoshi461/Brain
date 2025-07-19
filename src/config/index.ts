import path from 'path';
import { config } from 'dotenv';

import NodeEnv from '../commons/enums/nodeEnv';

const env = process.env

if (env.NODE_ENV === NodeEnv.LOCAL) {
    const envFile = path.join(__dirname, '../../.env')
    config({ path: envFile })
}

export interface ServerConfig {
    PORT: number;
    JWT_SECRET_KEY: string;
    MONGO_DB_URL: string
}

export const serverConfig: ServerConfig = {
    PORT: Number(env.PORT),
    JWT_SECRET_KEY: env.JWT_SECRET_KEY ?? '',
    MONGO_DB_URL: env.MONGO_DB_URL
}
