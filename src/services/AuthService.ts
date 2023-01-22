import { User } from "../model/Model";

export class AuthService {

    public async login(username: string, password: string): Promise<User | undefined> {
        if (username === 'user' && password === '123') {
            return {
                username: username,
                email: `${username}@email.com`
            }
        } else {
            return undefined;
        }
    }
}