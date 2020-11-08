import React from 'react';
import './App.css';
import Navbar from '../components/navbar/Navbar';
import AlbumListContainer from "../containers/AlbumListContainer";
import LogIn from "../components/LogIn/LogIn"
import MemoriesListContainer from "./MemoriesListContainer"
import Profile from "../components/profile/Profile"
import Home from '../components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AppContext from '../components/AppContext'
import {auth} from '../firebaseConfig'

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    auth.GoogleAuthProvider.PROVIDER_ID,
    auth.FacebookAuthProvider.PROVIDER_ID,
    // auth.TwitterAuthProvider.PROVIDER_ID,
    // auth.GithubAuthProvider.PROVIDER_ID,
    auth.EmailAuthProvider.PROVIDER_ID,
    // auth.PhoneAuthProvider.PROVIDER_ID,

  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

function App() {
  const [user, setUser] = React.useState();
  console.log("first", user);

  
  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUser(user);
      console.log("app use effct", user);
    })
  }, [])


  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/login">
              {!!user ?
                <Redirect to="/albums" />
                :
                <LogIn uiConfig={uiConfig} />
              }
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path={`/albums`}>
              {!user ?
                <Redirect to="/login" />
                :
                <AlbumListContainer />
              }
            </Route>
            <Route exact path={`/albums/:albumId`}>
              <MemoriesListContainer />
            </Route>
            <Route exact path="/">
              {!!user ?
                <Redirect to="/albums" />
                :
                <Home />
              }
            </Route>
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
