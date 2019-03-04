import React, { Component } from 'react';
//import Expo from 'expo';
import {
  createAppContainer,
  createStackNavigator,
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
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  ListView,AsyncStorage
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
import Items from './components/ListItem';
import NearYou from './components/NearYou';
import Settings from './Settings';
import ChatRoom from './Chatroom';
import Feed from './Feed';
import NewPost from './NewPost';
import Hosting from './Hosting';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as firebase from 'firebase';
import Nomadhers from './NomadHersProfile';
//import { db } from './components/db.js';
import NewComment from './NewComment';
import CommentSection from './components/Comments';
const FACEBOOK_APP_ID = '371838250023467';
//import * as firebase from "firebase";

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


const auth = firebase.auth();
var items: [];

/********************************************************************** */
//**************************** */Nearyou**********************************
class NearyouScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      listitems: [],
    };
  }

  componentDidMount() {
    var items = [];
    const Ref = db.ref('users/');
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
    const { navigate } = this.props.navigation;
    return (
      <View>
       <Header
          leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.navigate('Menu') }}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor="green"
        />
        <View style={{ height: 200 }}>
          <Image
            style={{ width: Dimensions.get('window').width, height: 200 }}
            resizeMode="stretch"
            source={{
              uri:
                'https://thebesttravelplaces.com/wp-content/uploads/2016/10/single-women-travel-1068x712.jpg',
            }}
          />
        </View>

        <View style={{ height: 50 }}>
          <Header
            outerContainerStyles={{ marginTop: 0, zIndex: 9999, height: 50 }}
            centerComponent={{
              text: 'NomadHers Near You',
              style: { fontSize: 20, textAlign: 'center', color: '#fff' },
            }}
            backgroundColor="limegreen"
          />
        </View>

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
          onPress={(item) => this.props.navigation.navigate('Profile',{itemId:item.id})}
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

        <View>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}>
            <Image
              style={{
                width: Dimensions.get('window').width,
                height: 80,
                resizeMode: 'stretch',
              }}
              source={{
                uri:
                  'https://www.cdnetworks.com/resources/case-studies/hostelworld.png',
              }}
            />
            <Image
              style={{
                width: Dimensions.get('window').width,
                height: 80,
                resizeMode: 'stretch',
              }}
              source={{
                uri:
                  'http://scaleupporto.pt/wp-content/uploads/2018/02/58f77df83ba0c205658230-980x588.png',
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
//************************ */Chatroom***********************************
class ChatroomScreen extends Component<{}> {
  

  render() {
    return (
      <View>
       <Header
          leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.navigate('Menu') }}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        />
       <ChatRoom/>
        
      </View>
    );
  }
}

/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
//*********************************** */Login****************************
class LoginScreen extends React.Component {
  state = {
    logInStatus: 'signed out',
    errorMessage: 'none',
    session: null,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      let itemsRef = firebase
        .database()
        .ref('/users')
        .orderByChild('email')
        .equalTo(user.email);
      if (user != null) {
        itemsRef.on('value', snapshot => {
          var data = snapshot.val();
          items = Object.values(data);
          
        });

        this.setState({ session: firebase.auth().currentUser.uid });
        
   
        if (items.length == 0) {
          db.ref('/users').push({
            address: '',
            email: firebase.auth().currentUser.email,
            name: firebase.auth().currentUser.displayName,
            pic: firebase.auth().currentUser.photoURL,
            surname: ' ',
            current_place: '',
            bio: ' ',
          });
        }

        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(function() {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            //return firebase.auth().signInWithEmailAndPassword(email, password);
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
          });
      } else {
        this.setState({ session: null });
      }
    });
  }

  async handleFacebookButton() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FACEBOOK_APP_ID,
      {
        permissions: ['public_profile', 'email'],
      }
    );
    if (type === 'success') {
      //Firebase credential is created with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      auth.signInAndRetrieveDataWithCredential(credential).catch(error => {
        this.setState({ errorMessage: error.message });
      });
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    let pic = {
      uri: './1.jpg',
    };

    if (this.state.session == null) {
      return (
        <View>
          <Image
            source={require('./1.jpg')}
            style={{ width: Dimensions.get('window').width, height: 200 }}
          />

          <View style={styles.buttons}>
            <Button title='Login with Facebook' onPress={() => this.handleFacebookButton()} style={{ width: 36, height: 20 }}/>
              
          </View>
        </View>
      );
    } 

    else{
return(<View><Text>Welcome to NomadHer! Get empowered through travelling :) </Text><Button
        title="Go to Feed Page"
        onPress={() => {navigate('HeaderScreen');console.log(firebase.auth().currentUser.email)}}
      /></View>);

    }
  }
}
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
//******************************** */Logout*****************************
class LogoutScreen extends React.Component {
  
  render() {
  
  const {navigate} = this.props.navigation;
  
    var auth = firebase.auth();
firebase.auth().signOut().then(function() {
  Alert.alert(
        'You are Signed Out.'
       );
}, function(error) {
  Alert.alert(
        'Sign Out Error.'
       );
});

    return (
     <View><Text>Looged Out</Text><Button
        title="Go to Feed Page"
        onPress={() => navigate('Login')}
      /></View>
    );
  }
}

/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
//*************************Menu***************************************
class MenuScreen extends React.Component {
  render() {
    
    const list = [
      {
        title: 'NomadHers near U',
        icon: 'location-on',
        link:'Nearyou',
        
      },
      {
        title: 'Profile',
        icon: 'person',
        link: 'Profile',
        name:firebase.auth().currentUser.name,
        address:firebase.auth().currentUser.address,
        languages:firebase.auth().currentUser.languages,
         description:firebase.auth().currentUser.description,
          numGuest:firebase.auth().currentUser.numGuest,
           purpose:firebase.auth().currentUser.purpose,
            petfriendly:firebase.auth().currentUser.petfriendly,
             childfriendly:firebase.auth().currentUser.childfriendly,
            smokingfriendly:firebase.auth().currentUser.smokingfriendly,
             background:firebase.auth().currentUser.background,  
             pic:firebase.auth().currentUser.pic,
             key:firebase.auth().currentUser.key,
      },
      {
        title: 'Chatroom',
        icon: 'chat',
         link: 'Chatroom',
        
      },
      {
        title: 'Hosting',
        icon: 'hotel',
        link: 'Hosting',
       name:null,
         address:null,
        languages:null,
         description:null,
          numGuest:null,
           purpose:null,
            petfriendly:null,
             childfriendly:null,
            smokingfriendly:null,
             background:null,  
             pic:null,
             key:null,
      },
      
     /* {
        title: 'Settings',
        icon: 'settings',
        link:'Setting',
        name:null,
         address:null,
        languages:null,
         description:null,
          numGuest:null,
           purpose:null,
            petfriendly:null,
             childfriendly:null,
            smokingfriendly:null,
             background:null,  
             pic:null,
             key:null,
      },*/
      {
        title: 'Logout',
        icon: 'arrow_right_alt',
        link:'Logout',
         name:null,
         address:null,
        languages:null,
         description:null,
          numGuest:null,
           purpose:null,
            petfriendly:null,
             childfriendly:null,
            smokingfriendly:null,
             background:null,  
             pic:null,
             key:null,
      },
    ];
    let status;
    status = this.props.isTyping ? 'is typing...' : this.props.title;
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' ,onPress: () => this.props.navigation.navigate('Menu')}}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        />
        <View>
          {list.map((item, i) => (<ListItem

          
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              button onPress={() => {
                console.log(auth.currentUser.pic)
                
                }}
            />))}
        </View>
      </View>
    );
  }
}
//********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
//************************ */Hosting***********************************
class HostingScreen extends React.Component {


state = {
         data: null,
        numGuests:null,
    }


  componentWillUnmount() {}


  constructor(props) {
    super(props);
    this.state = {
      childfriendly: false,
      petfriendly: false,
      smokingfriendly: false,
      number: 0,
      description: '',
      publicTransport: '',
      additionalInformation: '',
      purpose: '',
     data : [
      { value: 'for free in exchange for cultural/language exchange' },
      { value: '' },
    ],
    numGuests : [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 },
      { value: 11 },
      { value: 12 },
      { value: 13 },
      { value: 14 },
      { value: 15 },
      { value: 16 },
      { value: 17 },
      { value: 18 },
      { value: 19 },
      { value: 20 },
    ]
    };
  }



  componentDidMount() {
      
  }



  render() {
   
    return (
      <View>
       <Header
          leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.navigate('Menu') }}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' ,onPress: () => this.props.navigation.navigate('HeaderScreen')}}
          backgroundColor="green"
        />
      <View style={{ height: '100%' }}>
      <Hosting/>  
      </View></View>
    );
  }
}

/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/*******Reference Form************************************************** */
class RefformScreen extends React.Component {
  render() {
    let know = [
      { value: 'I am a friend of this person' },
      { value: 'I have hanged out with this person' },
      { value: 'I shared transport with this person' },
      { value: 'I stayed with this person' },
    ];
    return (
      <View>
       <Header
          leftComponent={{ icon: 'menu', color: '#fff' ,onPress: () => this.props.navigation.navigate('Menu')}}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        />
      <View style={{ height: '100%' }}>
        <View
          style={{
            marginTop: getStatusBarHeight(),
            backgroundColor: '#92d63c',
            width: Dimensions.get('window').width,
            height: 60,
          }}>
          <Text
            style={{
              marginLeft: Dimensions.get('window').width * 0.18,
              marginTop: 10,
              fontSize: 25,
              color: 'white',
            }}>
            Reference
          </Text>
        </View>

        <ScrollView
          style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
          <View style={{ marginLeft: 10, marginTop: 18 }}>
            <Text style={StyleSheet.titleText}>
              Would you recommend Placeholder to other NomadHers?
            </Text>
          </View>
          <View style={styles.buttons}>
            <Button
              title="Yes"
              transparent={true}
              color={this.state.yesSel ? 'red' : 'black'}
              containerViewStyle={{ flex: 1 }}
              buttonStyle={{ width: 160 }}
              onPress={() =>
                this.setState({
                  recom: true,
                  yesSel: true,
                  noSel: false,
                  recom_select: true,
                })
              }
            />
            <Button
              title="No"
              transparent={true}
              color={this.state.noSel ? 'red' : 'black'}
              containerViewStyle={{ flex: 1 }}
              buttonStyle={{ width: 160 }}
              onPress={() =>
                this.setState({
                  recom: false,
                  yesSel: false,
                  noSel: true,
                  recom_select: true,
                })
              }
            />
          </View>

          <View style={{ marginLeft: 10, marginTop: 30 }}>
            <Text style={StyleSheet.titleText}>
              How do you know this person?
            </Text>
            <Dropdown
              fontSize={18}
              data={know}
              onChangeText={value =>
                this.setState({ knows: value, know_selected: true })
              }
            />
          </View>

          <View style={{ marginLeft: 10, marginTop: 18 }}>
            <Text style={StyleSheet.titleText}>
              What was your experience with Hyo like?
            </Text>
            <TextInput
              style={[styles.editBox, { color: this.state.textColor }]}
              multiline={true}
              textAlignVertical="top"
              maxLength={1000}
              scrollEnabled={true}
              value={this.state.inputs}
              placeholder={
                this.state.enoughChar
                  ? ''
                  : this.state.recom_select
                    ? 'You need to write more than 10 characters'
                    : this.state.know_selected
                      ? 'You should choose recommended or not'
                      : 'You need to state how you know this person'
              }
              placeholderTextColor={
                this.state.enoughChar ? 'transparent' : 'red'
              }
              onChangeText={value =>
                this.setState({
                  inputs: value,
                  leng: value.length,
                  textColor: 'black',
                  enoughChar: true,
                })
              }
            />
            <Text
              style={{
                fontSize: 14,
                color: 'lightgrey',
                textAlign: 'right',
              }}>
              {this.state.leng}
              /1000
            </Text>
          </View>

          <View style={styles.buttonss}>
            <Button
              title="Submit"
              buttonStyle={{ width: 120, backgroundColor: '#92d63c' }}
              onPress={() =>
                this.detectInput(
                  this.state.leng,
                  this.state.recom_select,
                  this.state.know_selected
                )
              }
            />
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : null}
          keyboardVerticalOffset={0}
        />
      </View></View>
    );
  }
}
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/***HeaderScreen ********************************************************/
class HeaderScreen extends React.Component {

 constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

   

  render() {
    console.log("klm "+firebase.auth().currentUser.pic);
return(
  <View><Header style={styles.header}
          leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.navigate('Menu')  }}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        />
        <Feed/></View>
);

  }
  
  
  }
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/***PostScreen ********************************************************/
class PostScreen extends React.Component {
  componentWillMount() {
	
	
	
   auth.onAuthStateChanged(user => {
       let itemsRef = firebase.database().ref('/users').orderByChild("email").equalTo(user.email);
       
      if (user == null) {
 //GO to Signup Page
            
	  }  });


   
   
   }

  handleSubmit = () => {
    const value = this._form.getValue();
 
     db.ref('/posts').push({
        content:value.content,
        image: this.state.image,
        date:new Date().toLocaleString(),
        by:firebase.auth().currentUser.displayName,
        email:firebase.auth().currentUser.email
      
    });
     Alert.alert("Posted Successfully!");
     
  }
  
  

 state = {
    image: null,
     content: null,
    uploading: false,
    
  };
  render() {
return(
  <View><Header style={styles.header}
          leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.navigate('Menu')  }}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        />
        <NewPost/></View>
);

  }
  
  
  }
  /********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/***CommentScreen ********************************************************/
class CommentsScreen extends React.Component {
  render() {
return(
  <View><Header style={styles.header}
          leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.navigate('Menu')  }}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        />
        <CommentSection/></View>
);

  }
  
  
  }
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/***TestScreen ********************************************************/
class TestScreen extends React.Component {
  render() {
return(
  <View><Header style={styles.header}
          leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.navigate('Menu')  }}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        /><Button title="Go to Profile" onPress={() => this.props.navigation.navigate('Profile',{itemId: 1})} /></View>
);

  }
  
  
  }
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/***Nomadhersp ********************************************************/
class Nomadhersp extends React.Component {
  render() {
return(
  <View><Header
          leftComponent={{ icon: 'menu', color: '#fff' ,onPress: () => this.props.navigation.navigate('Menu')}}
          centerComponent={{ text: 'NomadHer', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('HeaderScreen') }}
          backgroundColor="green"
        />
        <Nomadhers/></View>
);

  }
  
  
  }
  /********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/** ********************************************************/
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
//*********************** */Profile*************************************
class ProfileScreen extends React.Component {

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
      <View>
        <Text>{key}</Text>



         
        
      </View>
    );
  }
}

/********************************************************************** */
/********************************************************************** */
/********************************************************************** */
const AppNavigator = createStackNavigator(
  {
 
    //How To take off that white banner 
    
    Profile: ProfileScreen,//OK
    //Setting: SettingScreen,//LATER
    
    Nearyou: Nomadhersp,//OK
    
    Chatroom: ChatroomScreen,//OK 
    
    Login: LoginScreen,//OK
    
    Logout: LogoutScreen,//OK
    
    Items: Items,//OK
    
    Menu: MenuScreen,//OK
    
    Hosting: HostingScreen,//Backend


    Refform: RefformScreen,//LATER



    Post:PostScreen,//OK
    Comments:CommentsScreen,//OK 
    Feed:Feed,//OK
    HeaderScreen:HeaderScreen,//OK
    
    Test: TestScreen,
  },
  {
    initialRouteName: 'Login',

  
  }
);


const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  
  

 
 
  
  editBox: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    opacity: 1,
  },
  buttons: {
    justifyContent: 'space-between',

    marginTop: 100,
    width: 175,
    marginLeft: 100,
  },
  header:{
flex: 1,
marginTop:0,

  }
  
});

export default createAppContainer(AppNavigator);
