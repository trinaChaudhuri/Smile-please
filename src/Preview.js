import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
    };
  }

  render() {
    const uri = this.props.route.params.uri;
    return (
      <View style={styles.container}>
        {this.state.showPreview === false ? (
          <>
            <Icon name="check-circle" size={35} color="#008000" />
            <Text style={styles.uploadsuccesstext}>
              Congratulations,Your video is succefully uploaded!
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({showPreview: true})}
              style={styles.previewbuttoncontainer}>
              <Text style={styles.previewText}>Preview</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Video
            source={{uri: uri}}
            style={styles.backgroundVideo}           
          />
        )}
      </View>
    );
  }
}
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  previewText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  uploadsuccesstext: {
    color: '#008000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  previewbuttoncontainer: {
    backgroundColor: '#F4C2C2',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
