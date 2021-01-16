import jwt from 'jsonwebtoken';
import { Request } from 'express';

export const cookieExtractor = (request: Request) => {
    let token = null;
    if (request && request.cookies) {
        token = request.cookies['access_token'];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return token;
};

export const signToken = (id: number) => {
    // token expires in 24 hrs.
    // TODO: Replace with env.JWT_SECRET
    // return jwt.sign({ id }, process.env.JWT_SECRET as string, {});
    return jwt.sign({ id }, '123456' as string, {});
};
