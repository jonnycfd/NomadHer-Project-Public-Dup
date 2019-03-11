import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import Video from 'react-native-video';
import {Constants} from 'expo'



export default class SampleImage extends React.Component {

  // use the asynchronous function to get a sample image from database then render.
  constructor(props) {
    super(props);

    this.state = {
      image: "",
    };
  }

  componentDidMount() {
    fetch('http://100.64.89.154:80/api/test') //地址更具实际情况更改
      .then(response => response.json())
      .then(data => this.setState({ image: data.image_uri }));
  }


  render() {
  	const { image } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Sample Image</Text>

        <Image
          style={{width: "100%", height: "75%"}}
          source={{uri: image}}
        />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


//   constructor(props) {
//     super(props);

//     this.state = {
//       image: "",
//     };
//   }

//   componentDidMount() {
//     fetch('http://192.168.0.19:80/api/test') //地址更具实际情况更改
//       .then(response => response.json())
//       .then(data => this.setState({ image: data.image_uri }));
//   }

//   render() {
//     const { image } = this.state;
//     return (
//       <View style={styles.container}>
//         <Image
//               source={{uri: image}}
//               style={styles.welcomeImage}
//             />
//         <Text>{image}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
// });