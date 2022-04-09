import React from 'react'
import { Button, TextField, Snackbar, Alert, LinearProgress, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className="login-screen">
            <div className="card">
                {isAuthLoading && <LinearProgress className='auth-progress' />}
                <h2 className='sign-in'>Sign in</h2>

                <TextField sx={{ margin: '0px 30px' }} onChange={(e) => { onUsernameChange(e.target.value) }} id="outlined-basic" label="Username" variant="outlined" />

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => onPasswordChange(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

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