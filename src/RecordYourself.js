import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RNCamera} from 'react-native-camera';
import VideoPlayer from 'react-native-video-player';

export default class RecordYourself extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      processing: false,
      recordyourself: false,
      recordedvideo: null,
    };
  }

  async startRecording() {
    this.setState({recording: true});
    const {uri, codec = 'mp4'} = await this.camera.recordAsync();
    this.setState({recording: false, processing: true});
    const type = `video/${codec}`;
    const data = new FormData();
    data.append('video', {
      name: 'mobile-video-upload',
      type,
      uri,
    });
    if (data) {
      this.setState({recordedvideo: uri});
    }
  }

  stopRecording = () => {
    this.camera.stopRecording();
  };

  render() {
    const {recording, processing} = this.state;

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.capture}>
        <Text style={{fontSize: 8, fontWeight: 'bold'}}> RECORD </Text>
      </TouchableOpacity>
    );
    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.capture}>
          <Text style={{fontSize: 8, fontWeight: 'bold'}}> STOP </Text>
        </TouchableOpacity>
      );
    }
    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View style={styles.maincontainer}>
          {this.state.recordyourself === false && (
            <TouchableOpacity
              style={styles.recordyourselfwrapper}
              onPress={() => this.setState({recordyourself: true})}>
              <Text style={styles.recordyourselftext}>RECORD YOURSELF</Text>
            </TouchableOpacity>
          )}
          {this.state.recordyourself === true &&
            this.state.recordedvideo == null && (
              <View style={styles.container}>
                <RNCamera
                  ref={ref => {
                    this.camera = ref;
                  }}
                  style={styles.preview}
                  type={RNCamera.Constants.Type.front}
                  androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera phone',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                  androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                  style={{flex: 1}}
                  captureAudio={true}
                />
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  {button}
                </View>
              </View>
            )}
        </View>
        {this.state.recordedvideo && (
          <View>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    recordedvideo: null,
                    recording: false,
                    processing: false,
                  })
                }>
                <Icon name="close" color="#000" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('preview', {
                    uri: this.state.recordedvideo,
                  })
                }>
                <Icon name="check-circle" color="#000" size={20} />
              </TouchableOpacity>
            </View>
            <VideoPlayer
              endWithThumbnail
              video={{uri: this.state.recordedvideo}}
              videoWidth={Dimensions.get('screen').width}
              videoHeight={Dimensions.get('screen').height}
              ref={r => (this.player = r)}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordyourselfwrapper: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4C2C2',
    borderRadius: 10,
  },
  recordyourselftext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#e75480',
    borderRadius: 35,
    width: 70,
    height: 70,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
