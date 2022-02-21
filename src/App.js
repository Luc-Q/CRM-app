import React from 'react';
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import UsersList from "./pages/UsersList/UsersList";
import MalihAuth from './apis/MalihAuth';

function App() {

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

  return (
    <Routes>
      <Route path='/' element={<LoginPage onGet={getHandler} />} />
      <Route path='/userslist' element={<UsersList />} />
    </Routes>
  );
}

export default App;