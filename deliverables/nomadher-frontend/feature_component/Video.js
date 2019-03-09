import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
import {Constants, Video} from 'expo'

export default class VideoComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Video Verification</Text>
          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            // source={require('./assets/testvideo.mp4')}
            // ref={(ref) => {this.player = ref}}
            // onLoadStart={() => console.log('onStartload but can not see any component')}
            // onLoad={(response) => response_onload = response}
            shouldPlay
            resizeMode="cover"
            style={{ width:"100%", height: "75%" }}
            // style={{
            //     aspectRatio: 1.8,
            //     width: "100%"
            // }}

            // style={{
            //   width: '100%',
            //   height: width * response_onload.naturalSize.width / response_onload.naturalSize.height
            // }}
            // onLoad={response => {
            //   const { width, height } = response.naturalSize;
            //   const heightScaled = height * (this.state.screenWidth / width);

            //   this.setState({
            //     heightScaled,
            //     videoPaused: false,
            //   });
            // }}
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
