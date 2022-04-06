import React from 'react'
import { Button, TextField } from '@mui/material';
import './Login.css';

export default function ({ onLogin, onUsernameChange, onPasswordChange }) {
    return (
        
            <div className="login-screen">

                <TextField onChange={(e) => {onUsernameChange(e.target.value)}} id="outlined-basic" label="username" variant="outlined" />
                <TextField onChange={(e) => {onPasswordChange(e.target.value)}} id="outlined-basic" label="password" variant="outlined" />
                <Button onClick={onLogin} variant="contained">Login</Button>

            </div>
        

    )
}