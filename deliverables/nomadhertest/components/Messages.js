import * as React from 'react';
import { Text, View, StyleSheet,Button,TextInput } from 'react-native';
import { Constants } from 'expo';

// You can import from local files


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { List, ListItem,FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { db } from './db';
 
let itemsRef = db.ref('/messages');

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
    text:'hello'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
     text:'hi :)'
  }
]


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
  <List  data={this.state.listitems} containerStyle={{marginBottom: 20}}>
  {
    this.state.items.map((l) => (
    <ListItem
        roundAvatar
        avatar={{uri:l.userpic}}
        key={l.name}
        title={l.from}
        subtitle={l.text}
      />
    ))
  }
</List>
    );

    
  }
}

