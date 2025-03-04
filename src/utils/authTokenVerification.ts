import jwt from 'jsonwebtoken'

import { UserLogInDto } from "../commons/dtos/userLogInDto";
import { serverConfig } from '../config';

export default class AuthTokenVerification {
    public static async setUser(user: UserLogInDto): Promise<string> {
        return jwt.sign(user, serverConfig.JWT_SECRET_KEY ?? '123Tifixin@890',{expiresIn:'30d'})
    }

    public static async getUser(token: string) {
       return jwt.verify(token, serverConfig.JWT_SECRET_KEY ?? '123Tifixin@890')
    }
}