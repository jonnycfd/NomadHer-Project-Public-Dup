import React, { Component } from 'react';
import { View, StyleSheet, Button,ActivityIndicator,Image,Text,Share,Clipboard,StatusBar,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import t from 'tcomb-form-native';
import { Constants, ImagePicker, Permissions } from 'expo';




global.self = global;





const Form = t.form.Form;

const Setting = t.struct({
  address: t.String,
   password: t.String,
    repeat_password: t.String,
    bio: t.String,
    pet_friendly: t.Boolean,
    number_of_guests: t.Number,
    smoking_friendly: t.Boolean,
   
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'green',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

/*const options = {
  fields: {
    address,
    
   
  },
  stylesheet: formStyles,
};*/



export default class NewComment extends Component {





  handleSubmit = () => {
    const value = this._form.getValue();
     /*db.ref('/posts').push({
        comment:value.comment,
        image: this.state.image,
        date:new Date().toLocaleString(),
        by:"hagjoora@hotmail.fr",
       // surname:surname
    });*/
     Alert.alert("Posted Successfully!");
      //this.props.navigation.navigate({ routeName: 'Home'});
    //console.log('value: ', value);
  }
  
  

 state = {
    image: null,
     content: null,
    uploading: false,
    
  };

  render() {

let {
      image
    } = this.state;


    return (
      <View>
 


        

 <Form 
          ref={c => this._form = c}
          value={this.state.form_values}
          type={Setting} 
         // options={options}
        />
        <Icon.Button
        backgroundColor="#84DC7A"
          title="Submit !"
          onPress={this.handleSubmit}>Submit !</Icon.Button>
      </View>
    );
  }


 
  

  
    
  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }


  //let  values = this.refs.form.getValue();
}



 
