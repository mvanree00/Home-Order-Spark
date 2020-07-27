import React, {useState} from 'react'
import { Route, Switch, Redirect  } from 'react-router-dom'
import httpUser from './httpUser'
import LogIn from "./views/LogIn.js"
import SignUp from "./views/SignUp"
import LogOut from "./views/LogOut"
import Dashboard from "./views/Dashboard.js"
import NotFound from "./views/NotFound"
import NavBar from "./components/Header/NavBar.js"
import Inventory from "./views/Inventory.js"


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
          <Route path="/dashboard" render={(props) => {
              return currentUser ? <Dashboard {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>
          <Route exact path="/" render={(props) => {
              return currentUser ? <Dashboard {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>
           
           <Route path="/inventory" render={(props) => {
              return currentUser ? <Inventory {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>
         
         
        <Route render={NotFound}/>
      </Switch>
    </div>
  );
};

export default App;
