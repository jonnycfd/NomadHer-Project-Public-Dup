import React from 'react';
import { Button, View, Text,TouchableOpacity,Card } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // import React, { Component } from 'react';
import {
  StackActions,
  NavigationActions,
  ScrollView,
} from 'react-navigation'; // Version can be specified in package.json
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
  Image,
  Linking,
  StyleSheet,
  AppRegistry,
  Platform,
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  ListView,
} from 'react-native';
import {
  Header,
  ThemeProvider,
  ListItem,
  List,
  Icon,
  CheckBox,
  TextInput,FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Facebook, ImagePicker, Permissions,Constants, AppLoading } from 'expo';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as firebase from 'firebase';
import { db } from './components/db.js';
const FACEBOOK_APP_ID = '371838250023467';

const auth = firebase.auth();
var items: [];

 

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      listitems: [],
    };
  }

  componentDidMount() {
    var items = [];
    const Ref = db.ref('/users');
    Ref.on('value', snapshot => {
      snapshot.forEach(child => {
        items.push({
          key: child.child('name').val(),
          url: child.child('pic').val(),
          id: child.key,
         
               birth: child.child('birthdate').val(),
                address: child.child('address').val(),
                bio: child.child('bio').val(),
                languages:child.child('languages').val(),



                
                description:child.child('description').val(),
                numGuest:child.child('numGuest').val(),
                purpose:child.child('purpose').val(),
                petfriendly:child.child('petfriendly').val(),
                childfriendly:child.child('childfriendly').val(),
                smokingfriendly:child.child('smokingfriendly').val(),
                background:child.child('background').val(),
                
                
                 
        });
      });
      this.setState({ listitems: items });
    });
  }

  renderSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: 'green',
          marginLeft: '14%',
          marginTop: 5,
        }}
      />
    );
  };
  render() {
    return (

 <View
          style={{ height: Dimensions.get('window').height - 70 - 50 - 200 }}>
          <List
            containerStyle={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
              marginTop: 0,
              marginBottom: 0,
            }}>
            <FlatList
              data={this.state.listitems}
             
              renderItem={({ item }) => (
                <View>
            
                <ListItem
                    roundAvatar
                    avatar={{ uri: item.url }}
                    title={item.key}
                    subtitle={item.bio}   
                    containerStyle={{ borderBottomWidth: 0 }}
                    
                  /><Button
          title="To Profile"
         onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: item.id,
              pic: item.url,
               birth: item.birthdate,
                address: item.address,
                bio: item.bio,
                languages:item.languages,
                description:item.description,
                numGuest:item.numGuest,
                purpose:item.purpose,
                petfriendly:item.petfriendly,
                childfriendly:item.childfriendly,
                smokingfriendly:item.smokingfriendly,
                background:item.background, 
                key:item.key,

            });
            
          }}
        />
                  <View
                    style={{
                      borderRadius: 50,
                      marginLeft: 35,
                      marginTop: -18,
                      borderWidth: 1,
                      borderColor: 'limegreen',
                      width: 10,
                      height: 10,
                      backgroundColor: 'white',
                    }}>
                    <Button color="green" title="" />
                  </View>
                </View>
              )}
              ItemSeparatorComponent={this.renderSeperator}
            />
          </List>





      

      </View>
    );
  }
}

class DetailsScreen extends React.Component {
 
  state = {
    items:{},
      image: null,
      background:
        'https://study-eu.s3.amazonaws.com/uploads/image/path/23/wide_fullhd_sweden-stockholm-1.jpg',
      language: '',
      name: '',
      country: '',
      current: '',
      travelling: '',
      bio: '',
      user:null,
    };


componentWillMount() {
 
}


  render() {
    /* 2. Get the param, provide a fallback value if not available */
    
      const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const birth = navigation.getParam('birth', 'NO-ID');
    const address = navigation.getParam('address', 'NO-ID');
    const languages = navigation.getParam('languages', 'NO-ID');

const description = navigation.getParam('description', 'NO-ID');
const numGuest = navigation.getParam('numGuest', 'NO-ID');
const purpose = navigation.getParam('purpose', 'NO-ID');
const petfriendly = navigation.getParam('petfriendly', 'NO-ID');
const childfriendly = navigation.getParam('childfriendly', 'NO-ID');
const smokingfriendly = navigation.getParam('smokingfriendly', 'NO-ID');
const background = navigation.getParam('background', 'NO-ID');
const pic = navigation.getParam('pic', 'NO-ID');
const key = navigation.getParam('key', 'NO-ID');


 

    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
         <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
         <Image
                  source={{ uri: background }}
                  style={{ width: Dimensions.get('window').width, height: 200 }}
                />
         </View>

<View
            style={{
              flex: 1,
              alignItems: 'center',
              // top:0,
              position: 'absolute',
              top: 150,
              bottom: 0,
              left: 0,
              right: 0,
            }}>
            <Image
                  source={{ uri:pic }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
            
            </View>

<View  style={{
              flex: 1,
              alignItems: 'center',
              // top:0,
              position: 'absolute',
              top: 270,
              bottom: 0,
              left: 0,
              right: 0,
            }}>
 <Text>{key}</Text>
       
</View>
       

       <View  style={{
              flex: 1,
              alignItems: 'left',
              position: 'absolute',
              top: 400,
              bottom: 0,
              left: 0,
              right: 0,
            }}>
 
        <Text>description: {description}</Text>
        <Text>I host people for:{purpose}</Text>
         <Text>I can host up to: {numGuest} People</Text>
        <Text>Pet friendly:{petfriendly}</Text>
         <Text>Child Friendly: {childfriendly}</Text>
        <Text>Smoking friendly:{smokingfriendly}</Text>
        
</View>
       

        <Button
          title="See other NomadHers"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
