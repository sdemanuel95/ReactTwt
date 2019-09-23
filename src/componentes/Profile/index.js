import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from './profile.css';

const propTypes = {
    picture : PropTypes.string.isRequired,
    displayName : PropTypes.string.isRequired,
    username : PropTypes.string.isRequired,
    emailAddress : PropTypes.string.isRequired,
    location : PropTypes.string.isRequired
}
class Profile extends Component {

    render() {
        return (
            <div className={styles.root}>
                <Link to='/profile'>
                <figure >

                <img className={styles.avatar} src={this.props.picture}
                />
                </figure>
                </Link>
                <span className={styles.name} > {this.props.displayName}</span>
                <ul className={styles.data}>
                    <li>
                        <span className='fa fa-user'> {this.props.username}</span>
                    </li>
                    <li>
                        <span className='fa fa-envelope'> {this.props.emailAddress}</span>
                    </li>
                    <li>
                        <span className='fa fa-map-marker'>{this.props.location} </span>
                    </li>
                </ul>
            </div>
        );
    }
}
Profile.propTypes = propTypes;
export default Profile;