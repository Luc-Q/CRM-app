import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import styled from 'styled-components'
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WorkIcon from '@mui/icons-material/Work';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { postUser } from '../../store/actions';
import { modalActions } from '../../store';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
};

const ViewModal = ({
    isShow,
    ishide,
}) => {

    return (
        <Modal
            open={isShow}
            onClose={ishide}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2>Title</h2>
                <div>
                    <h3>Email</h3>
                    <h3>Phone Number</h3>
                    <h3>Home Address</h3>
                    <h3>Job Title</h3>
                </div>
            </Box>
        </Modal>
    )
}

export default ViewModal