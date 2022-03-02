import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import LogoutIcon from '@mui/icons-material/Logout';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, modalActions, tokenActions } from '../../store';
import { deleteUser, getUsers } from '../../store/actions';
import FormModal from '../../components/Modal/FormModal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ViewModal from '../../components/Modal/ViewModal';
import DeleteIcon from '@mui/icons-material/Delete';

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
    top: 80%;
`
const DeleteIconBox = styled.div`
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 95%;
`
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

const UsersList = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => state.auth.isAuthed) 
    const users = useSelector((state) => state.usersList.users)
    const isFormModalShow = useSelector((state) => state.modal.isFormModalShowed)
    const isViewModalShow = useSelector((state) => state.modal.isViewModalShowed)
    const isRefresh = useSelector((state) => state.page.refresh)

    const [arrIds, setArrIds] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [rowData, setRowData] = useState({})

    // const users = [
    //     { id: 1, name: 'Snow', email: 'Jonasotestn@test.com', phoneNumber: 357789789 },
    //     { id: 2, name: 'Lannister', email: 'Cersei', phoneNumber: 42 },
    //     { id: 3, name: 'Lannister', email: 'Jaime', phoneNumber: 45 },
    //     { id: 4, name: 'Stark', email: 'Arya', phoneNumber: 16 },
    //     { id: 5, name: 'Targaryen', email: 'Daenerys', phoneNumber: null },
    //     { id: 6, name: 'Melisandre', email: null, phoneNumber: 150 },
    //     { id: 7, name: 'Clifford', email: 'Ferrara', phoneNumber: 44 },
    //     { id: 8, name: 'Frances', email: 'Rossini', phoneNumber: 36 },
    //     { id: 9, name: 'Roxie', email: 'Harvey', phoneNumber: 65 },
    // ];

    useEffect(() => {
        dispatch(getUsers())
    }, [isRefresh, dispatch])

    useEffect(() => {
        const user = localStorage.getItem('token')
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

    const openFormModalHandler = () => {
        dispatch(modalActions.showFormModal())
    }

    const openViewModalHandler = () => {
        console.log(rowData)
        dispatch(modalActions.showViewModal())
    }

    const closeFormModalHandler = () => {
        dispatch(modalActions.hideFormModal())
    }

    const closeViewModalHandler = () => {
        dispatch(modalActions.hidViewModal())
    }

    const deleteHandler = () => {
        dispatch(deleteUser(arrIds))
        setIsSelected(false)
    }

    const getRowData = (data) => {
        setRowData(data)
    }

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
            return (
                    <ThemeProvider theme={theme}>
                        <Button variant="outlined" color='neutral'>Edit</Button>
                    </ThemeProvider>
            )
            },
        },
        {
            field: 'view',
            headerName: 'View',
            width: 100,
            renderCell: () => {
                return (
                    <ThemeProvider theme={theme}>
                        <Button  onClick={openViewModalHandler} variant="contained" color='neutral'>View</Button>
                    </ThemeProvider>
                    )
            },
        },
    ]

    return (
        <Box style={{height: 700, with: '100%'}}>
            <DataGrid
                id={users.id}
                rows={users}
                columns={columns}
                pageSize={15}
                checkboxSelection
                disableSelectionOnClick
                onRowClick={getRowData}
                onSelectionModelChange={(ids) => {
                    setArrIds(ids)
                    setIsSelected(true)
                }}
            />
            <ThemeProvider theme={theme}>
                <IconBox>
                    <Fab aria-label="add" size='small' onClick={openFormModalHandler} color='neutral'>
                        <AddIcon />
                    </Fab>
                    <Link to='/' style={{ textDecoration: 'none'}}>
                        <Fab aria-label="logout" size='small' onClick={onLogOutHandler} color='primary'> 
                            <LogoutIcon />
                        </Fab>
                    </Link>
                </IconBox>
                {isSelected &&                
                    <DeleteIconBox>
                        <Fab aria-label="delete" size='small' variant='extended' onClick={deleteHandler} color='primary'>
                            <DeleteIcon /> DELETE {arrIds.length} DATA
                        </Fab>
                    </DeleteIconBox>
                }
            </ThemeProvider>
            {isFormModalShow && <FormModal isShow={isFormModalShow} ishide={closeFormModalHandler} />}
            {isViewModalShow && <ViewModal isShow={isViewModalShow} ishide={closeViewModalHandler} user={rowData}/>}
        </Box>
    )
}

export default UsersList