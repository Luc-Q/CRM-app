import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    return (
    <Box>
        <TextField label="Email" variant="outlined" required
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <EmailIcon />
                </InputAdornment>
                ),}}
        />
        <TextField label="Password" variant="outlined" required
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <LockIcon />
                </InputAdornment>
                ),
            }}
        />
        <ThemeProvider theme={theme}>
        <Button variant="outlined" color='neutral'>Outlined</Button>
        </ThemeProvider>
    </Box>
    )
}

export default LoginPage