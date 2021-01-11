import React from "react";
import './App.css';
import Homepage from "./pages/homepage/homepage.component.jsx";
import {Switch, Route} from "react-router-dom";
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from "./components/header/header.component.jsx";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx"
import {auth,createUserProfileDocument} from "./firebase/firebase.utils";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }
  unSubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth= auth.onAuthStateChanged (async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state);
        });
      }
      this.setState({currentUser:userAuth});
    }) 
  }
  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path = {"/"} component = {Homepage}/>
          <Route path = {"/shop"} component = {ShopPage}/> 
          <Route path = {"/signin"} component = {SignInAndSignUp}/> 
        </Switch>
  
      </div>
    );
  }
}
export default App;
