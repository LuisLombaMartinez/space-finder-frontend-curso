import React, { SyntheticEvent } from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import history from "../utils/history";

interface LoginProps {
    authService: AuthService,
    setUser: (user: User) => void
}

interface LoginState {
    username: string,
    password: string,
    loginAttempted: boolean,
    loginSuccesful: boolean
}

interface CustomEvent {
    target: HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState> {

    state: LoginState = {
        username: '',
        password: '',
        loginAttempted: false,
        loginSuccesful: false
    }

    private setUsername(event: CustomEvent) {
        this.setState({
            username: event.target.value
        });
    }

    private setPassword(event: CustomEvent) {
        this.setState({
            password: event.target.value
        });
    }

    private async handleSubmit(event: SyntheticEvent){
        event.preventDefault();
        this.setState({
            loginAttempted: true
        })
        const result = await this.props.authService.login(
            this.state.username,
            this.state.password
        )
        if (result){
            this.setState({
                loginSuccesful: true
            });
            this.props.setUser(result);
            history.push('./profile')
        } else {
            this.setState({
                loginSuccesful: false
            })
        }
    }

    render() {

        return (
            <div>
                <h2>Please login</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input id="username" value={this.state.username} onChange = {e => this.setUsername(e)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input id="password" value={this.state.password} onChange = {e => this.setPassword(e)}type='password' />
                    </div>

                    <input type='submit' value='Login' />
                </form>
            </div>
        )
    }
}