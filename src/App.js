import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import UsersList from "./pages/UsersList/UsersList";
import { useSelector } from "react-redux";

function App() {
    const isAuth = useSelector((state) => state.auth.isAuthed);

    return (
        <Switch>
            <Route path="/" exact>
                {isAuth && (
                    <Route>
                        <Redirect to="/users" />
                    </Route>
                )}
                <LoginPage />
            </Route>
            <Route path="/users" exact>
                <UsersList />
            </Route>
        </Switch>
    );
}

export default App;
