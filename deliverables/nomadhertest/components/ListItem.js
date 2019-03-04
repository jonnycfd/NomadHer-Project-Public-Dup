import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView,Button, Image, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import ItemComponent from './ItemComponent';



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

let itemsRef = firebase.app().database().ref('/users');



export default class ListItem extends Component {

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
            <View >
                {
                    this.state.items.length > 0
                    ? <ItemComponent items={this.state.items} />
                    : <Text>No items</Text>
                }
            </View>
        )
    }
}