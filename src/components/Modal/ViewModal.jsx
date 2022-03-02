import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
`

const Boxes = styled.div`
    width: 250px;
    height: 50px;
    padding-bottom: 20px;
    padding-right: 20px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ViewModal = ({
    isShow,
    ishide,
    user,
}) => {
    return (
        <Modal
            open={isShow}
            onClose={ishide}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h3>{`List 480 - ${user.row.name} (ID: ${user.row.id})`}</h3>
                <Container>
                    <Boxes>Email:<br/>{user.row.email}</Boxes>
                    <Boxes>Phone Number:<br/>{user.row.phoneNumber}</Boxes>
                    <Boxes>Home Address:<br/>{user.row.address}</Boxes>
                    <Boxes>Job Title:<br/>{user.row.jobTitle}</Boxes>
                </Container>
                <ButtonContainer>
                    <Button variant='contained' onClick={ishide}>CLOSE</Button>
                </ButtonContainer>
            </Box>
        </Modal>
    )
}

export default ViewModal