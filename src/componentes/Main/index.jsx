import React, { Component, PropTypes } from 'react';
import MessageList from '../MessageList';
import InputText from '../InputText';
import ProfileBar from '../ProfileBar';
import uuid from 'uuid';
import firebase from 'firebase';
const propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired

}
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: Object.assign({}, this.props.user, { retweets: [] }, { favorites: [] }),
            openText: false,
            messages: []
        }
        this.handleOpenText = this.handleOpenText.bind(this);
        this.handleCloseText = this.handleCloseText.bind(this);
        this.handleSendText = this.handleSendText.bind(this);
        this.handleRetweet = this.handleRetweet.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.handleReplyTweet = this.handleReplyTweet.bind(this);
        this.handleFavoriteNumbers = this.handleFavoriteNumbers.bind(this);
        this.handleRetweetNumbers = this.handleRetweetNumbers.bind(this);
        this.removeFromArray = this.removeFromArray.bind(this);
    }


    removeFromArray(dateToRemove, Array){
        Array.forEach( (item, index) => {
          if(item == dateToRemove) Array.splice(index,1);
        });
        return Array;
     }


    componentWillMount() {
        const messagesRef = firebase.database().ref().child('messages')
        messagesRef.on('child_added', snapshot => {
            this.setState({

                messages: this.state.messages.concat(snapshot.val()),
                openText: false
            })
        })
    }
    handleOpenText(event) {
        event.preventDefault()
        this.setState({ openText: true })
    }

    handleCloseText(event) {
        event.preventDefault();
        this.setState({ openText: false })
    }




    handleSendText(event) {
        event.preventDefault();
        let newMessage = {
            id: uuid.v4(),
            text: event.target.text.value,
            displayName: this.props.user.displayName,
            username: this.props.user.email.split('@')[0],
            date: Date.now(),
            picture: this.props.user.photoURL,
            favorites: 0,
            retweets: 0,
            favoritesUsers: [''],
            retweetsUsers: ['']
        }

        const messageRef = firebase.database().ref().child('messages');
        const messageID = messageRef.push();
        messageID.set(newMessage);
    }





    isAlreadyFavorite(msgId, email) {
        var isAlready = false;

        firebase.database().ref('/messages/').orderByChild("id").equalTo(msgId).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var users = childSnapshot.val().favoritesUsers;
                if (users.includes(email)) {
                    isAlready = true;
                }
            });
        });
        return isAlready;
    }



    isAlreadyRetweet(msgId, email) {
        var isAlready = false;

        firebase.database().ref('/messages/').orderByChild("id").equalTo(msgId).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var users = childSnapshot.val().retweetsUsers;
                if (users.includes(email)) {
                    isAlready = true;
                }
            });
        });
        return isAlready;
    }



    handleRetweet(msgId) {
        let alreadyRetweeted = this.isAlreadyRetweet(msgId, this.state.user.email)

        if (!alreadyRetweeted) {
            let messages = this.state.messages.map(msg => {
                if (msg.id == msgId) {

                    msg.retweets++;
                    msg.retweetsUsers.push(this.state.user.email);
                    firebase.database().ref('/messages/').orderByChild("id").equalTo(msgId).on('value', function (snapshot) {
                        var key = Object.keys(snapshot.val())[0];
                        var messageId = firebase.database().ref().child('messages/' + key)
                        messageId.update({
                            retweets: msg.retweets,
                            retweetsUsers: msg.retweetsUsers
                        })
                    });
                }
                return msg;
            })


            let user = Object.assign({}, this.state.user);
            user.retweets.push(msgId);
            this.setState({
                messages,
                user
            })
        }
        else{
            let messages = this.state.messages.map(msg => {
                if (msg.id == msgId) {

                    msg.retweets--;
                    msg.retweetsUsers = this.removeFromArray(this.state.user.email, msg.retweetsUsers)
                    
                    firebase.database().ref('/messages/').orderByChild("id").equalTo(msgId).on('value', function (snapshot) {
                        var key = Object.keys(snapshot.val())[0];
                        var messageId = firebase.database().ref().child('messages/' + key)
                        messageId.update({
                            retweets: msg.retweets,
                            retweetsUsers: msg.retweetsUsers
                        })
                    });
                }
                return msg;
            })
            this.setState({
                messages
            })
        }
    }

    handleFavorite(msgId) {


        let alreadyFavorite = this.isAlreadyFavorite(msgId, this.state.user.email);
        if (!alreadyFavorite) {
            let messages = this.state.messages.map(msg => {
                if (msg.id === msgId) {

                    msg.favorites++;
                    msg.favoritesUsers.push(this.state.user.email);
                    firebase.database().ref('/messages/').orderByChild("id").equalTo(msgId).on('value', function (snapshot) {
                        var key = Object.keys(snapshot.val())[0];
                        var messageId = firebase.database().ref().child('messages/' + key)
                        messageId.update({
                            favorites: msg.favorites,
                            favoritesUsers: msg.favoritesUsers
                        })
                    });
                }
                return msg;
            })


            let user = Object.assign({}, this.state.user);
            user.favorites.push(msgId);

            this.setState({
                messages,
                user
            })
        }
        else{
            let messages = this.state.messages.map(msg => {
                if (msg.id == msgId) {

                    msg.favorites--;
                    msg.favoritesUsers = this.removeFromArray(this.state.user.email, msg.favoritesUsers)
                    
                    firebase.database().ref('/messages/').orderByChild("id").equalTo(msgId).on('value', function (snapshot) {
                        var key = Object.keys(snapshot.val())[0];
                        var messageId = firebase.database().ref().child('messages/' + key)
                        messageId.update({
                            favorites: msg.favorites,
                            favoritesUsers: msg.favoritesUsers
                        })
                    });
                }
                return msg;
            })
            this.setState({
                messages
            })

        }
    }

    handleReplyTweet(id, usernameToReply) {
        this.setState({
            openText: true,
            usernameToReply
        })

    }
    renderOpenText() {
        if (this.state.openText) {
            return (
                <InputText
                    onSendText={this.handleSendText}
                    onCloseText={this.handleCloseText}
                    usernameToReply={this.state.usernameToReply}
                />
            );
        }
    }
    handleFavoriteNumbers(msgId, usersFavorites) {
        console.log(usersFavorites)
        
        var x = (this.state.user.email)
        if (usersFavorites.includes(this.state.user.email)) {
            return true;
        }
        else {
            return false;
        }
    }
    handleRetweetNumbers(msgId, usersRetweets) {
        console.log(usersRetweets)
        if (usersRetweets.includes(this.state.user.email)) {
            return true;
        }
        else {
            return false;
        }
    }
    render() {
        return (
            <div>
                <ProfileBar
                    photoURL={this.props.user.photoURL}
                    username={this.props.user.email.split('@')[0]}
                    onOpenText={this.handleOpenText}
                    onLogout={this.props.onLogout}
                />
                {this.renderOpenText()}
                <MessageList
                    messages={this.state.messages}
                    onRetweet={this.handleRetweet}
                    onFavorite={this.handleFavorite}
                    onReplyTweet={this.handleReplyTweet}
                    handleFavoriteNumbers={this.handleFavoriteNumbers}
                    handleRetweetNumbers={this.handleRetweetNumbers} />
            </div>

        );
    }
}

Main.propTypes = propTypes;
export default Main;