import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Profile from '../Profile';
import Header from '../Header';
import Main from '../Main';
import Login from '../Login';
import 'normalize-css';
import styles from './app.css';
import firebase from 'firebase';
class App extends Component {

    constructor() {
        super();
        this.state = {
            user : null
        }
        this.handleOnAuth = this.handleOnAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({ user })
            }
            else{
                this.setState({ user : null })
            }
        })
    }


    onAuthGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(result => console.log(`${result.user.email} ha iniciado sesión`))
          .catch(error => console.log(`Error ${error.code} : ${error.message}`));
      }
    
      handleLogoutGoogle() {
        firebase.auth().signOut()
          .then(result => console.log(`${result.user.email} ha cerrado sesión`))
          .catch(error => console.log(`Error ${error.code} : ${error.message}`));
      }
    
    




    handleOnAuth() {
        const provider = new firebase.auth.GithubAuthProvider()

        firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesión`))
        .catch(error => console.log(`Error : ${error.code} : ${error.message}`))
        
    }

    handleLogout(){
        firebase.auth().signOut()
        .then(() => {
            console.log('Te has desconectado correctamente')
        })
        .catch(() => {
            console.log("Ocurrió un error al desloguearte.")
        })
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <Header />
                    <Route exact path='/' render={() => {
                        if (this.state.user) {
                            return (
                                <Main user={this.state.user}
                                onLogout={this.handleLogout}
                                />
                            )
                        }
                        else {
                            return (
                            <Login onAuth={this.handleOnAuth} 
                            onAuthGoogle={this.onAuthGoogle} />
                            );
                            //Render <Login/>
                        }
                    }} />

                    <Route path='/profile' render={
                        () => (
                            <Profile
                                picture={this.state.user.photoURL}
                                username={this.state.user.email.split('@')[0]}
                                displayName={this.state.user.displayName}
                                location={this.state.user.location}
                                emailAddress={this.state.user.email} />
                        )

                    } />
                    <Route path='/user/:username' render={(params) => (
                        <Profile
                            username={params.match.params.username}
                            displayName={params.match.params.username}
                        />

                    )}
                    />
                </div>
            </HashRouter>
        );
    }
}

export default App;