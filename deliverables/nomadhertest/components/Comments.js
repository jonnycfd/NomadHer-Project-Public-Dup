import * as React from 'react';
import { Text, View, StyleSheet,Button,TextInput,Image } from 'react-native';
import { Constants } from 'expo';

// You can import from local files


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { List, ListItem,FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
//import { db } from './db';
import * as firebase from "firebase";

//if(Firebase==null)
 let config = {
    apiKey: "AIzaSyAyuAyXr9nt7TDndXioMuE7gCJozrwL3Hs",
    authDomain: "nomadherdb.firebaseapp.com",
    databaseURL: "https://nomadherdb.firebaseio.com",
    projectId: "nomadherdb",
    storageBucket: "nomadherdb.appspot.com",
    messagingSenderId: "409543702217"
  };

const db= !firebase.apps.length ? firebase.initializeApp(config) : firebase.app().database();

let itemsRef = db.ref('/comments');




export default class App extends React.Component {
    state = {
        items: []
    }
 
    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({items});
         });
    }
  render() {
    return (
<View>
<Image style={{width:200,height:200}} source={'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'} />
  <List  data={this.state.listitems} containerStyle={{marginBottom: 20}}>
  {
    this.state.items.map((l) => (
    <ListItem
        roundAvatar
        avatar={{uri:l.userpic}}
        key={l.name}
        title={l.by}
        subtitle={l.content}
      />
    ))
  }
</List>
</View>
    );

    
  }
}

