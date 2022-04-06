import logo from './../../logo.svg';
import './App.css';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { useState } from 'react';
import * as Constants from '../../constants/core'

function App() {
    const [screen, setScreen] = useState(Screen.Login);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //auth token received from POST Request
    const [token, setToken] = useState("");
    //element/screen to display
    let content;

    const handleLogin = () => {
        console.log(`username is ${username} and password is ${password}`);

        //sign in
        post(
            Constants.baseUrl + "/account/login",
            JSON.stringify({ username: username, password: password })
        )
            .then(res => {
                //if bad status code, throw error
                if (!res.ok) {
                    throw new Error(`Error! Status ${res.status}`)
                }

                return res.json();
            })
            .then(data => {
                setToken(data.token);

                console.log(`App: Received token: ${token}`);

                //navigate to Home Screen
                setScreen(Screen.Home);
            })
            .catch(e => {
                console.log(e)
            })

    }

    switch (screen) {
        case Screen.Login:
            console.log("screen is login")
            content = <Login onLogin={handleLogin} onUsernameChange={setUsername} onPasswordChange={setPassword} />
            break;

        case Screen.Home:
            console.log(`screen is home & token: ${token}`)
            content = <Home token={token} currentUser={username} />
            break;

        default:
            content = <Login onLogin={handleLogin} onUsernameChange={setUsername} onPasswordChange={setPassword} />
            break;
    }

    return (content)
}

export default App;

class Screen {
    // Create new instances of the same class as static attributes
    static Login = new Screen("login")
    static Home = new Screen("home")

    constructor(name) {
        this.name = name
    }
}

const post = (url, body) => {
    return fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: body
    })
}