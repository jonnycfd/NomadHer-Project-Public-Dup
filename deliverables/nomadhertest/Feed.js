
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Dimensions,FlatList} from 'react-native';
import { Constants, AppLoading } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
//import ItemComponent from '../components/item';
 
import { db } from './components/db';
 
let itemsRef = db.ref('/posts').orderByChild('id');
import PropTypes from 'prop-types';
 import {
  Header,
  ThemeProvider,
  ListItem,
  Icon,
  CheckBox,
  TextInput,
} from 'react-native-elements';

 
export default class List extends Component {
 
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

         <View style={styles.container}>
         
                {
                    this.state.items.length > 0
                    ? <FlatList
  data={this.state.items}
  renderItem={({item}) => <View>
   <Image style={styles.image} source={{ uri: item.image }} />
  <View style={styles.info}>
       <Image source={{ uri: item.userpic }}/><Text style={styles.infoText}>{item.by}</Text>
           <Text style={styles.infoText}>{item.content}</Text>
         
        </View>
 </View>}
/>
                    : <Text>No items</Text>
                }
            </View>
        )
    }
} 
class ItemComponent extends Component {
 
  static propTypes = {
      items: PropTypes.array.isRequired
  };
 
  render() {
    return (
      <View >
    
        {this.props.items.map((item, index) => {
            return (
                <View key={index}>
                <Image style={styles.image} source={{ uri: item.image }} />
                      <View style={styles.info}><Text style={styles.itemtext_}>{item.by}</Text></View>
                </View>
            )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
   
   
    itemtext_: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  },
 
});


