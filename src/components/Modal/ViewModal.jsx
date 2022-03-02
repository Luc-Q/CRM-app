import React from 'react'
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';


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