import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import VideoCamera from '../components/VideoCamera';

class CaptureScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle:{
      borderBottomWidth: 0,
      position: 'absolute',
      backgroundColor: 'transparent'
    }
  });
  //
  componentWillMount () {
    this.props.dispatch({ type: 'camera/askRecordingPermission' });
  };
  //
  onCaptured = ({ uri }) => {
    this.props.dispatch({ type: 'camera/updateState', payload: { recordedUri: uri } });
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Submit' }));
  };
  //
  render() {
    return (
      <VideoCamera onCaptured={this.onCaptured} />
    );
  }
}

export default connect()(CaptureScreen);
