import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./components/pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import ShopPage from "./components/pages/shop/shop.component";
import ContactPage from "./components/pages/contact/contact.component"
import SignInSignUpPage from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await  createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id:snapShot.id,
              ...snapShot.data()
            }
          }
          )
        })
      }
      this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/signin" component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
