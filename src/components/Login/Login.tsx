import React from 'react'
import { Button, TextField, Snackbar, Alert, LinearProgress } from '@mui/material';

import './Login.css';

interface LoginProps {
    onLogin: () => void,
    onUsernameChange: (username: string) => void,
    onPasswordChange: (password: string) => void,
    snackbarState: boolean,
    onSnackbarClose: () => void,
    isAuthLoading: boolean
}

export default function ({ onLogin, onUsernameChange, onPasswordChange, snackbarState, onSnackbarClose, isAuthLoading }: LoginProps) {
    
    return (
        <div className="login-screen">
            <div className="card">
                {isAuthLoading && <LinearProgress className='auth-progress' />}
                <h2 className='sign-in'>Sign in</h2>


                <TextField sx={{margin: '0px 30px'}} onChange={(e) => { onUsernameChange(e.target.value) }} id="outlined-basic" label="Username" variant="outlined" />
                <TextField onChange={(e) => { onPasswordChange(e.target.value) }} id="outlined-basic" label="Password" variant="outlined" />
                <Button onClick={onLogin} variant="contained">Login</Button>
            </div>

            <Snackbar
                open={snackbarState}
                autoHideDuration={4000}
                onClose={onSnackbarClose}
                >
                <Alert severity="error">Invalid Username or Password!</Alert>
            </Snackbar>
        </div>
    )
}