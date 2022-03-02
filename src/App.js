import React from 'react';
import { Switch, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import UsersList from "./pages/UsersList/UsersList";
import UserDetail from "./pages/UserDetail/UserDetail"

function App() {

  return (
    <Switch>
      <Route path='/' exact>
        <LoginPage />
      </Route>
      <Route path='/users' exact>
        <UsersList />
      </Route>
      <Route path='/users/:userId'>
        <UserDetail />
      </Route>
    </Switch>
  );
}

export default App;