import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import styles from './message.css';
import moment from 'moment';

const propTypes = {
    date : PropTypes.number.isRequired,
    username : PropTypes.string.isRequired,
    text : PropTypes.string.isRequired,
    picture : PropTypes.string.isRequired,
    displayName : PropTypes.string.isRequired,
    numRetweets : PropTypes.number.isRequired,
    numFavorites : PropTypes.number.isRequired,
    onFavorite : PropTypes.func.isRequired,
    onRetweet : PropTypes.func.isRequired,
    onReplyTweet : PropTypes.func.isRequired,

}


class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressFavorite: props.handleFavoriteNumbers(),
            pressRetweet: props.handleRetweetNumbers()
        }
        this.onPressRetweet = this.onPressRetweet.bind(this);
        this.onPressFavorite = this.onPressFavorite.bind(this);
    }

    onPressFavorite() {
        this.props.onFavorite()
        if(this.state.pressFavorite == true){
            this.setState({
                pressFavorite: false
            })
    
        }
        else{
            this.setState({
                pressFavorite: true
            })
    
        }
    }

    onPressRetweet() {
        this.props.onRetweet()
        if(this.state.pressRetweet == true){
            this.setState({
                pressRetweet: false
            })
        }
        else{
            this.setState({
                pressRetweet: true
            })
        }

    }


    render() {

        let dateFormat = moment(this.props.date).fromNow();
        let userLink = `/user/${this.props.username}`;
        return (
            <div className={styles.root}>
                <div className={styles.user}>
                    <Link to={userLink}>
                        <figure>
                            <img className={styles.avatar} src={this.props.picture} />
                        </figure>
                    </Link>
                    <span className={styles.displayName}> {this.props.displayName}</span>
                    <span className={styles.username}> {this.props.username} </span>
                    <span className={styles.date}>{dateFormat}</span>
                </div>

                <h3>{this.props.text}</h3>
                <div className={styles.buttons}>
                    <div className={styles.icon}
                        onClick={this.props.onReplyTweet}
                    ><span className='fa fa-reply'></span>

                    </div>
                    <div
                        onClick={this.onPressRetweet}
                        className={(this.state.pressRetweet) ? styles.rtGreen : ''}>
                        <span className='fa fa-retweet'></span>
                        <span className={styles.num}>{this.props.numRetweets}</span>
                    </div>
                    <div className={(this.state.pressFavorite ? styles.favYellow : '')}
                        onClick={this.onPressFavorite}>
                        <span className='fa fa-star'></span>
                        <span className={styles.num}>{this.props.numFavorites}</span>
                    </div>
                </div>
            </div>
        );
    }
}

Message.propTypes = propTypes;
export default Message;