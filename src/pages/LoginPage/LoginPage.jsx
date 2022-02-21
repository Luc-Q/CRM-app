import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MalihAuth from '../../apis/MalihAuth';
import { authActions } from '../../store';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
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
    const isAuth = useSelector((state) => state.isAuthed)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        const payload = {
            "username": email,
            "password": password,
        }

        await MalihAuth.post('auth/signin', payload)
        .then((response) => {
            console.log(response)
            localStorage.setItem('tokenType', response.data.tokenType)
            localStorage.setItem('token', response.data.accessToken)
        })
        .catch((error) => {
            console.log(error)
        })

        dispatch(authActions.login())
    }

    useEffect(() => {
        MalihAuth.get('getUserState/id/23')
        .then((response) => {
            console.log(response)
            localStorage.setItem('tRef', response.data.data.tenantReference)
        })
        .catch((error) => {
            console.log(error)
        })
        .then(() => {
            console.log('All good')
        });
    }, [isAuth])

    const onLogOutHandler = () => {
        dispatch(authActions.logout())
    }

    return (
    <form onSubmit={onSubmitHandler}>
        <Box>
            <TextField label="Email" variant="outlined" required value={email} onChange={onEmailChangeHandler}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <EmailIcon />
                    </InputAdornment>
                    ),}}
            />
            <TextField label="Password" variant="outlined" required value={password} onChange={onPasswordChangeHandler}
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
                {isAuth && <Button variant='outlined' color='neutral' onClick={onLogOutHandler}>
                        LOG OUT
                    </Button>}
                <Link to='/userslist' style={{ textDecoration:'none'}}>
                    {isAuth && <Button variant='outlined' color='neutral'>
                        UsersList
                    </Button>}
                </Link>
            </ThemeProvider>
        </Box>
    </form>
    )
}

export default LoginPage