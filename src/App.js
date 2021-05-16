import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./components/pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import ShopPage from "./components/pages/shop/shop.component";
import ContactPage from "./components/pages/contact/contact.component"
import SignInSignUpPage from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions.js'

import "./App.css";

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await  createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {        
            setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()           
          })
          
        })
      }
      setCurrentUser( userAuth );
      //createUserProfileDocument(user);
      //this.setState({ currentUser: user });
      console.log(this.state);
      //console.log(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
      <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/contact" component={ContactPage} />
          <Route 
            exact path="/signin" 
            render={()=>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : ( <SignInSignUpPage />)
              } 
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = ({user}) =>({
  currentUser : user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user=> dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);