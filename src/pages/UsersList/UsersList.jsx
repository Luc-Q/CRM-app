import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import LogoutIcon from '@mui/icons-material/Logout';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, modalActions, tokenActions } from '../../store';
import { getData } from '../../store/actions';
import FormModal from '../../components/Modal/FormModal';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Box = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    position: relative;
`
const IconBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    z-index: 999;
    left: 95%;
    top: 75%;
`
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

const columns = [
    {field: 'id', headerName: 'ID', width: 80},
    {field: 'name', headerName: 'Name', width: 130},
    {field: 'email', headerName: 'Email', width: 250},
    {field: 'phoneNumber', headerName: 'Phone Number', width: 200},
    {field: 'address', headerName: 'Address', width: 400},
    {field: 'jobTitle', headerName: 'Job Title', width: 150},
    {
        field: 'edit',
        headerName: 'Edit',
        width: 100,
        renderCell: () => {
            const onClick = (e) => {
                e.stopPropagation()
            };
    
        return (
                <ThemeProvider theme={theme}>
                    <Button onClick={onClick} variant="outlined" color='neutral'>Edit</Button>
                </ThemeProvider>
        )
        },
    },
    {
        field: 'view',
        headerName: 'View',
        width: 100,
        renderCell: (users) => {
            const onClick = (e) => {
                e.stopPropagation()
        }
        return (
            <Link to={`/users/${users.id}`} style={{ textDecoration:'none'}}>
                <ThemeProvider theme={theme}>
                    <Button onClick={onClick} variant="contained" color='neutral'>View</Button>
                </ThemeProvider>
            </Link>
        )
        },
    },
]

const UsersList = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => state.auth.isAuthed) 
    const users = useSelector((state) => state.usersList.users)
    const isShow = useSelector((state) => state.modal.isShowed)
    const isRefresh = useSelector((state) => state.page.refresh)

    useEffect(() => {

        dispatch(getData())
        
        const user = localStorage.getItem('token')
        if (user !== null) {
            dispatch(authActions.login())
        //     setTimeout(() => {
        //         console.log('time out')
        //         dispatch(tokenActions.removeAll())
        //         dispatch(authActions.logout())
        //     }, 10000)
        }
    }, [isAuth, isRefresh, dispatch])

    const onLogOutHandler = () => {
        dispatch(tokenActions.removeAll())
        dispatch(authActions.logout())
    }

    const openModalHandler = () => {
        dispatch(modalActions.showModal())
    }

    const closeModalHandler= () => {
        dispatch(modalActions.hideModal())
    }

    return (
        <Box style={{height: 700, with: '100%'}}>
            <DataGrid
                key={users.id}
                rows={users}
                columns={columns}
                pageSize={15}
                checkboxSelection
            />
            <IconBox>
                <ThemeProvider theme={theme}>
                    <Fab aria-label="add" size='small' onClick={openModalHandler} color='neutral'>
                        <AddIcon />
                    </Fab>
                    <Link to='/' style={{ textDecoration: 'none'}}>
                        <Fab aria-label="logout" size='small' onClick={onLogOutHandler} color='neutral'> 
                            <LogoutIcon />
                        </Fab>
                    </Link>
                </ThemeProvider>
            </IconBox>
            {isShow && <FormModal isShow={isShow} ishide={closeModalHandler} />}
        </Box>
    )
}

export default UsersList