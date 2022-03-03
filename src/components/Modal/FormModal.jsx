import React, { useState, useRef } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { postUser, updateUser } from '../../store/actions';
import { modalActions, pageActions } from '../../store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
`
const Inputs = styled.div`
  display: flex;
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
  p: 1,
};

const FormModal = ({
  isShow,
  ishide,
  user,
  id
}) => {
  const dispatch = useDispatch()

  const isAdding = useSelector((state) => state.page.isAdd)

  const nameRef = useRef()
  const emailRef = useRef()
  const addressRef = useRef()
  const phoneRef = useRef()
  const jobRef = useRef()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [job, setJob] = useState('')
  const [error, setError] = useState(false)

  const emailValidation = () => {
    let emailIsValied = validator.isEmail(email)
    return emailIsValied
  }

  const onNameChangeHandler = (event) => {
    setName(event.target.value)
  }

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const onAddressChangeHandler = (event) => {
    setAddress(event.target.value)
  }

  const onPhoneChangeHandler = (event) => {
    setPhone(event.target.value)
  }
  
  const onJobChangeHandler = (event) => {
    setJob(event.target.value)
  }

  const onAddSubmitHandler = (event) => {
    event.preventDefault()

    const emailIsValied = emailValidation()
    setError(!emailIsValied)

    const payload = [{
      "name": name,
      "email": email,
      "address": address,
      "phoneNumber": phone,
      "jobTitle": job,
      "listId": 480
    }]

    if (emailIsValied) {
      dispatch(pageActions.isLoading())
      dispatch(postUser(payload))
      dispatch(modalActions.hideFormModal())
    }
}

const onEditSubmitHandler = (event) => {
    event.preventDefault()

    const enterName = nameRef.current.value
    const enterEmail = emailRef.current.value
    const enterAddress = addressRef.current.value
    const enterPhone = phoneRef.current.value
    const enterJob = jobRef.current.value

    const payload = {
      "id": user.id,
      "name": enterName,
      "email": enterEmail,
      "address": enterAddress,
      "phoneNumber": enterPhone,
      "jobTitle": enterJob,
      "listId": 480
    }

    dispatch(pageActions.isLoading())
    dispatch(updateUser(payload))
    dispatch(modalActions.hideFormModal())
  }


    return (
      <Modal
          open={isShow}
          onClose={ishide}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        {isAdding ?
          <form onSubmit={onAddSubmitHandler}>
            <Box sx={style}>
              <div>Add New Customer</div>
            <List>
              <Divider component="li" />
            </List>
            <InputBox>
              <TextField 
                label="Full Name" 
                variant="outlined" 
                required 
                value={name} 
                onChange={onNameChangeHandler}
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),}} 
              />
              <TextField 
                label="Email" 
                variant="outlined" 
                required value={email} 
                onChange={onEmailChangeHandler} 
                error={error} 
                helperText={error ? 'Please enter valid email adress' : ''}
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),}}
              />
              <TextField 
                label="Home Address" 
                variant="outlined" 
                required 
                value={address} 
                onChange={onAddressChangeHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),}}
              />
                <Inputs>
                  <TextField 
                    label="Phone Number" 
                    variant="outlined" 
                    required 
                    value={phone} 
                    onChange={onPhoneChangeHandler}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <LocalPhoneIcon />
                        </InputAdornment>
                    ),}}
                  />
                  <TextField 
                    label="Job Title" 
                    variant="outlined" 
                    required value={job} 
                    onChange={onJobChangeHandler}
                    InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon />
                      </InputAdornment>
                    ),}}
                  />
                </Inputs>
              </InputBox>
              <List>
                <Divider component="li" />
              </List>
              <ThemeProvider theme={theme}>
                <Inputs>
                  <Button variant='contained' color='primary' onClick={ishide}>Cancel</Button>
                  <Button type="submit" variant='contained' color='neutral'>Submit</Button>
                </Inputs>
                </ThemeProvider>
            </Box>
          </form>
          :
          <form onSubmit={onEditSubmitHandler}>
            <Box sx={style}>
              <div>Edit Customer</div>
              <List>
                <Divider component="li" />
              </List>
              <InputBox>
              <TextField 
                label="Full Name" 
                variant="outlined"
                defaultValue={user.name} 
                inputRef={nameRef}
                required 
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon /> 
                  </InputAdornment>
                ),}} 
              />
              <TextField 
                label="Email" 
                variant="outlined" 
                defaultValue={user.email}
                inputRef={emailRef}
                required  
                error={error} 
                helperText={error ? 'Please enter valid email adress' : ''}
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),}}
              />
              <TextField 
                label="Home Address" 
                variant="outlined" 
                defaultValue={user.address}
                inputRef={addressRef}
                required 
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),}}
              />
              <Inputs>
                <TextField 
                  label="Phone Number" 
                  variant="outlined" 
                  required
                  defaultValue={user.phoneNumber}
                  inputRef={phoneRef}
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneIcon />
                    </InputAdornment>
                  ),}}
                />
                <TextField 
                  label="Job Title" 
                  variant="outlined" 
                  defaultValue={user.jobTitle}
                  inputRef={jobRef}
                  required 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon />
                      </InputAdornment>
                  ),}}
                />
              </Inputs>
              </InputBox>
              <List>
                <Divider component="li" />
              </List>
              <ThemeProvider theme={theme}>
                <Inputs>
                  <Button variant='contained' color='primary' onClick={ishide}>Cancel</Button>
                  <Button type="submit" variant='contained' color='neutral'>Submit</Button>
                </Inputs>
              </ThemeProvider>
            </Box>
          </form> 
          }
      </Modal>
    )
}

export default FormModal