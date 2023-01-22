import { User, UserAtribute } from "../model/Model";

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

    public async getUserAttributes(user: User): Promise<UserAtribute[]> {
        const result: UserAtribute[] = [];
        result.push({
            Name: 'description',
            Value: 'Best user ever!'
        });
        result.push({
            Name: 'job',
            Value: 'architect'
        });
        result.push({
            Name: 'age',
            Value: '24'
        });
        result.push({
            Name: 'experience',
            Value: '2 years'
        });
        return result;
    }
}