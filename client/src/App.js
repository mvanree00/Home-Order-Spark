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
import Checkout from "./views/Checkout.js"
import Order from "./views/Order.js"
import Work from "./views/Work.js"
import Store from "./views/Store.js"
import Job from "./views/Job.js"
import Forum from "./views/Forum.js"
import Post from "./views/Post.js"

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
      <NavBar user={currentUser} />

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
         
         <Route path="/checkout" render={(props) => {
              return currentUser ? <Checkout {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>

         <Route path="/order" render={(props) => {
              return currentUser ? <Order {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>

         <Route path="/store" render={(props) => {
              return currentUser ? <Store {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>

         <Route path="/job" render={(props) => {
              return currentUser ? <Work {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>
          
         <Route path="/work" render={(props) => {
              return currentUser ? <Job {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>

         <Route path="/forum" render={(props) => {
              return currentUser ? <Forum {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>

         <Route path="/post" render={(props) => {
              return currentUser ? <Post {...props} user={currentUser}/> : <Redirect to="/login" />
          }}/>

        <Route render={NotFound}/>
      </Switch>
    </div>
  );
};

export default App;
