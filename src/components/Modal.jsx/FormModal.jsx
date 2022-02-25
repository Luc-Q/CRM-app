import React from 'react'
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

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: auto;
`
const Input = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const FormModal = ({
  onClose,
  onOpen
}) => {

    return (
        <div>
          <Modal
            open={onOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
        <Box sx={style}>
          <InputBox>
          <TextField label="Full Name" variant="outlined" requiredd
            InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),}} 
          />
          <TextField label="Email" variant="outlined" requiredd 
            InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),}}
          />
          <TextField label="Home Address" variant="outlined" requiredd 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
            ),}}/>
            <Input>
              <TextField label="Phone Number" variant="outlined" requiredd 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
            ),}}/>
                      <TextField label="Job Title" variant="outlined" requiredd 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon />
                </InputAdornment>
            ),}}/>
            </Input>
            </InputBox>
        </Box>
      </Modal>
        </div>
    )
}

export default FormModal