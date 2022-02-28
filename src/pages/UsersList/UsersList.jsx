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
import FormModal from '../../components/Modal.jsx/FormModal';

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
    
        return <Button onClick={onClick} variant="outlined">Edit</Button>
        },
    },
    {
        field: 'view',
        headerName: 'View',
        width: 100,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation()
        }
        return <Button onClick={onClick} variant="contained">View</Button>
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
                <Fab color="primary" aria-label="add" size='small' onClick={openModalHandler}>
                    <AddIcon />
                </Fab>
                <Link to='/' style={{ textDecoration: 'none'}}>
                    <Fab color="primary" aria-label="add" size='small' onClick={onLogOutHandler}> 
                        <LogoutIcon />
                    </Fab>
                </Link>
            </IconBox>
            {isShow && <FormModal isShow={isShow} ishide={closeModalHandler} />}
        </Box>
    )
}

export default UsersList