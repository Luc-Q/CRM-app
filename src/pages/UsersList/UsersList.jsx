import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, tokenActions } from '../../store';
import { getData } from '../../store/actions';

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

    useEffect(() => {

        dispatch(getData())
        
        const user = localStorage.getItem('token')
        console.log(user)
        if (user !== null) {
            dispatch(authActions.login())
        //     setTimeout(() => {
        //         console.log('time out')
        //         dispatch(tokenActions.removeAll())
        //         dispatch(authActions.logout())
        //     }, 10000)
        }
    }, [isAuth, dispatch])

    const onLogOutHandler = () => {
        dispatch(tokenActions.removeAll())
        dispatch(authActions.logout())
    }

    return (
    <div style={{height:700, with: '100%'}}>
        {isAuth && <DataGrid
            key={users.id}
            rows={users}
            columns={columns}
            pageSize={20}
            checkboxSelection
        />}
        <Button variant="contained" onClick={onLogOutHandler}>LOG OUT</Button>
    </div>
    )
}

export default UsersList