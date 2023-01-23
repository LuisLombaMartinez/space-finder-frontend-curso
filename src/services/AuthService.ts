import { User, UserAtribute } from "../model/Model";
import { Auth, Amplify } from "aws-amplify";
import { config } from "./config";
import { CognitoUser } from '@aws-amplify/auth';
import * as AWS from 'aws-sdk';
import { Credentials } from 'aws-sdk/lib/credentials';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        identityPoolId: config.IDENTITY_POOL_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})

export class AuthService {

    public async login(username: string, password: string) {
        try {
            const user = await Auth.signIn(username, password) as CognitoUser;
            return {
                cognitoUser: user,
                username: user.getUsername()
            };
        } catch (error) {
            return undefined;
        }
    }

    public async getUserAttributes(user: User): Promise<UserAtribute[]> {
        const result: UserAtribute[] = [];
        const attributes = await Auth.userAttributes(user.cognitoUser);
        result.push(...attributes);
        return result;
    }
}