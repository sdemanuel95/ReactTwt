import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from './profile-bar.css';

const propTypes = {
    photoURL : PropTypes.string.isRequired ,
    username : PropTypes.string.isRequired ,
    onOpenText : PropTypes.func.isRequired ,

}
class ProfileBar extends Component{

    constructor(){
        super();
    }

    render(){
        return(

            <div className={styles.root}>
                <Link to='/profile'>
                <figure>
                    <img className={styles.avatar} src={this.props.photoURL}/>
                </figure>
                </Link>
                <span className={styles.username}>Hola @{this.props.username}!</span>
                <button onClick={this.props.onOpenText} className={styles.button}>
                    <span className="fa fa lg fa-edit"></span> Tweet
                </button>
                <button className={styles.button} onClick={this.props.onLogout}>
                    <span className="fad fa-sign-out-alt">Salir</span>
                </button>
            </div>
        );
    }
}
ProfileBar.propTypes = propTypes;
export default ProfileBar;