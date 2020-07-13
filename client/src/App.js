import React, {useState} from 'react'
import { Route, Switch, Redirect  } from 'react-router-dom'
import httpUser from './httpUser'

import LogIn from "./views/LogIn.js"
import SignUp from "./views/SignUp"
import LogOut from "./views/LogOut"
import Dashboard from "./views/Dashboard.js"
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import NavBar from "./components/Header/NavBar.js"


const App = () => {
    const [currentUser, setCurrentUser] = useState(httpUser.getCurrentUser());

    const onLoginSuccess = () => {
        setCurrentUser(httpUser.getCurrentUser());
    };

    const logOut = () => {
        httpUser.logOut();
        setCurrentUser(null);
    };

  return (
    <div>
      <NavBar currentUser={currentUser} />

      <Switch>
          <Route path="/login" render={(props) => {
              return <LogIn {...props} onLoginSuccess={onLoginSuccess} />
          }} />
          <Route path="/signup" render={(props) => {
              return <SignUp {...props} onSignUpSuccess={onLoginSuccess} />
          }} />
          <Route path="/logout" render={(props) => {
              return <LogOut onLogOut={logOut} />
          }}/>
          <Route path="/dashboard" render={() => {
              return currentUser ? <Dashboard /> : <Redirect to="/login" />
          }}/>

        <Route exact path="/Home" render={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route render={NotFound}/>
      </Switch>
    </div>
  );
};

export default App;
