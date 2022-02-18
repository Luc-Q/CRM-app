import React from 'react';
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import UsersList from "./pages/UsersList/UsersList";
import MalihAuth from './apis/MalihAuth';

function App() {
  const payload = {
    "username": "malihmailtest@gmail.com",
    "password": "malihmail",
  }

  const postHandler = () => {
    MalihAuth.post('auth/signin', payload)
    .then((response) => {
      console.log(response)
      localStorage.setItem('tokenType', response.data.tokenType)
      localStorage.setItem('token', response.data.accessToken)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getHandler = () => {
    MalihAuth.get('getUserState/id/23')
    .then((response) => {
      console.log(response)
      localStorage.setItem('tRef', response.data.data.tenantReference)
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {

    });
  }

  const getUserHandler = () => {

  }

  return (
    <Routes>
      <Route path='/' element={<LoginPage onPost={postHandler} onGet={getHandler} onGetUsers={getUserHandler} />} />
      <Route path='/userslist' element={<UsersList />} />
    </Routes>
  );
}

export default App;