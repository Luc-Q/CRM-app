import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { authActions } from '../../store';
import { getAccessTokenAndUsers } from '../../store/actions';
import validator from 'validator';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#939496',
            darker: '#4d4d4d',
        },
        neutral: {
            main: '#01ffcd',
            contrastText: '#fff',
        },
        },
    });

const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: auto;
    padding-top: 10px;
    width: 50%;
`
const LoginPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuthed)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value)
        console.log(email)
    }

    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const emailIsValied = emailValidation()
        setError(!emailIsValied)

        const payload = {
            "username": email,
            "password": password,
        }

        if (emailIsValied) {
            dispatch(getAccessTokenAndUsers(payload))
            dispatch(authActions.login())
        }
    }

    const emailValidation = () => {
        let emailIsValied = validator.isEmail(email)
        return emailIsValied
    }

    useEffect(() => {
        let user = localStorage.getItem('token')
        if (user !== null) {
            dispatch(authActions.login())
        //     setTimeout(() => {
        //         console.log('time out')
        //         dispatch(tokenActions.removeAll())
        //         dispatch(authActions.logout())
        //     }, 15000)
        }
    }, [isAuth, dispatch])

    return (
    <form onSubmit={onSubmitHandler}>
        <Box>
            <TextField 
                label="Email" 
                variant="outlined" 
                required 
                value={email} 
                onChange={onEmailChangeHandler} 
                error={error} 
                helperText={error ? 'Please enter valid email adress' : ''}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <EmailIcon />
                    </InputAdornment>
                    ),}}
            />
            <TextField 
                label="Password" 
                variant="outlined" 
                required 
                value={password} 
                onChange={onPasswordChangeHandler}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <LockIcon />
                    </InputAdornment>
                    ),
                }}
            />
            <ThemeProvider theme={theme}>
                <Button type="submit" variant="outlined" color='neutral'>LOG IN</Button>
            </ThemeProvider>
        </Box>
    </form>
    )
}

export default LoginPage