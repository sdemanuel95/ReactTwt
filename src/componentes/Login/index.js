import React, { Component } from 'react';
import styles from './login.css'
class Login extends Component {


    render() {
        return (
            <div className={styles.root}>
                <p className={styles.text}>
                    Necesitamos que inicies sesión con tu cuenta de GitHub.
                </p>
                <button onClick={this.props.onAuth} className={styles.button}>
                    <span className='fa fa-github-square '></span>Login with GitHub
                    </button>

                    <button onClick={this.props.onAuthGoogle}>Login con google</button>

            </div>
        );
    }
}

export default Login;