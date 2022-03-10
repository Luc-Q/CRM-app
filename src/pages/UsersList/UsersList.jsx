import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import LogoutIcon from "@mui/icons-material/Logout";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import {
    authActions,
    modalActions,
    pageActions,
    tokenActions,
} from "../../store";
import { deleteUser, getUsers } from "../../store/actions";
import FormModal from "../../components/Modal/FormModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ViewModal from "../../components/Modal/ViewModal";
import DeleteIcon from "@mui/icons-material/Delete";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    position: relative;
`;
const IconBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    z-index: 999;
    left: 95%;
    top: 80%;
`;
const DeleteIconBox = styled.div`
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 95%;
`;
const theme = createTheme({
    status: {
        danger: "#e53e3e",
    },
    palette: {
        primary: {
            main: "#939496",
            darker: "#4d4d4d",
        },
        neutral: {
            main: "#01ffcd",
            contrastText: "#fff",
        },
    },
});

const UsersList = () => {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.users);
    const isAuth = useSelector((state) => state.auth.isAuthed);
    const isFormModalShow = useSelector(
        (state) => state.modal.isFormModalShowed
    );
    const isViewModalShow = useSelector(
        (state) => state.modal.isViewModalShowed
    );
    const isRefresh = useSelector((state) => state.page.refresh);
    const isLoading = useSelector((state) => state.page.loading);

    const [arrIds, setArrIds] = useState([]);
    const [rowData, setRowData] = useState({});

    useEffect(() => {
        dispatch(getUsers());
    }, [isRefresh, dispatch]);

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (user !== null) {
            dispatch(authActions.login());
            //     setTimeout(() => {
            //         console.log('time out')
            //         dispatch(tokenActions.removeAll())
            //         dispatch(authActions.logout())
            //     }, 10000)
        }
    }, [isAuth, dispatch]);

    const onLogOutHandler = () => {
        dispatch(tokenActions.removeAll());
        dispatch(authActions.logout());
    };

    const openAddFormModalHandler = () => {
        dispatch(pageActions.isAddClicked());
        dispatch(modalActions.showFormModal());
    };

    const openEditFormModalHandler = () => {
        dispatch(modalActions.showFormModal());
    };

    const openViewModalHandler = () => {
        dispatch(modalActions.showViewModal());
    };

    const closeFormModalHandler = () => {
        dispatch(modalActions.hideFormModal());
        dispatch(pageActions.isAddNotClicked());
    };

    const closeViewModalHandler = () => {
        dispatch(modalActions.hidViewModal());
    };

    const deleteHandler = () => {
        dispatch(pageActions.isLoading());
        dispatch(deleteUser(arrIds));
    };

    const getRowData = (data) => {
        let userData = data.row;
        setRowData(userData);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "phoneNumber", headerName: "Phone Number", width: 200 },
        { field: "address", headerName: "Address", width: 400 },
        { field: "jobTitle", headerName: "Job Title", width: 150 },
        {
            field: "edit",
            headerName: "Edit",
            width: 100,
            renderCell: () => {
                return (
                    <ThemeProvider theme={theme}>
                        <Button
                            onClick={openEditFormModalHandler}
                            variant="outlined"
                            color="neutral"
                        >
                            Edit
                        </Button>
                    </ThemeProvider>
                );
            },
        },
        {
            field: "view",
            headerName: "View",
            width: 100,
            renderCell: () => {
                return (
                    <ThemeProvider theme={theme}>
                        <Button
                            onClick={openViewModalHandler}
                            variant="contained"
                            color="neutral"
                        >
                            View
                        </Button>
                    </ThemeProvider>
                );
            },
        },
    ];

    return (
        <Box style={{ height: 700, with: "100%" }}>
            <DataGrid
                id={users.id}
                rows={users}
                columns={columns}
                pageSize={15}
                checkboxSelection
                disableSelectionOnClick
                onRowClick={getRowData}
                loading={isLoading}
                onSelectionModelChange={(ids) => {
                    setArrIds(ids);
                }}
            />
            <ThemeProvider theme={theme}>
                <IconBox>
                    <Fab
                        aria-label="add"
                        size="small"
                        onClick={openAddFormModalHandler}
                        color="neutral"
                    >
                        <AddIcon />
                    </Fab>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Fab
                            aria-label="logout"
                            size="small"
                            onClick={onLogOutHandler}
                            color="primary"
                        >
                            <LogoutIcon />
                        </Fab>
                    </Link>
                </IconBox>
                {arrIds.length && (
                    <DeleteIconBox>
                        <Fab
                            aria-label="delete"
                            size="small"
                            variant="extended"
                            onClick={deleteHandler}
                            color="primary"
                        >
                            <DeleteIcon /> DELETE {arrIds.length} DATA
                        </Fab>
                    </DeleteIconBox>
                )}
            </ThemeProvider>
            {isFormModalShow && (
                <FormModal
                    isShow={isFormModalShow}
                    ishide={closeFormModalHandler}
                    user={rowData}
                />
            )}
            {isViewModalShow && (
                <ViewModal
                    isShow={isViewModalShow}
                    ishide={closeViewModalHandler}
                    user={rowData}
                />
            )}
        </Box>
    );
};

export default UsersList;
