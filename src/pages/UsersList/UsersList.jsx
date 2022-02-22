import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import MalihAuth from '../../apis/MalihAuth'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { tokenActions } from '../../store';
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
    const [users, setUsers] = useState([])

    const isAuth = useSelector((state) => state.auth.isAuthed) 

    useEffect(() => {
        console.log(isAuth)
        MalihAuth.get('getAllUploadedEmails/listId/480')
        .then((response) => {
            const data = response.data
            return data
        })
        .then((data) => {
            console.log(data)
            setUsers(data)
        })

        let user = localStorage.getItem('token')
        console.log(user)
        if (user != null) {
            dispatch(authActions.login())
            setTimeout(() => {
                console.log('time out')
                dispatch(tokenActions.removeAll())
                dispatch(authActions.logout())
            }, 10000)
        }
    }, [isAuth])

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