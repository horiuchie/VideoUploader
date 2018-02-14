import React from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { Video } from 'expo';
import UploadButton from '../components/UploadButton';

const videoWidth = Dimensions.get('window').width;
const videoHeight = Dimensions.get('window').height;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

class SubmitScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomWidth: 0,
      position: 'absolute',
      backgroundColor: 'transparent',
    }
  });
  //
  state = { isPlaying: false };
  //
  upload = () => {
    this.props.dispatch({ type: 'content/upload', payload: { uri: this.props.uri } });
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Complete' }));
  }
  //
  render() {
    return (
      <Container>
        <UploadButton
          hide={this.state.isPlaying}
          type="primary" 
          onClick={this.upload} />
        <Video
          onPlaybackStatusUpdate={({ isPlaying }) => { this.setState({ isPlaying: isPlaying }) }}
          source={{ uri: this.props.uri }}
          rate={1.0}
          volume={1.0}
          muted={false}
          useNativeControls={true}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          style={{ width: videoWidth, height: videoHeight }}
        />
      </Container>
    );
  }
}

export default connect(
  ({ camera }) => ({ uri: camera.recordedUri })
)(SubmitScreen);
