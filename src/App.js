import React from 'react';
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import UsersList from "./pages/UsersList/UsersList";

function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/userslist' element={<UsersList />} />
    </Routes>
  );
}

export default App;