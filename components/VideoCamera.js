import React, { Component } from 'react';
import * as R from 'ramda';
import { Camera } from 'expo';
import styled from 'styled-components/native';
import { Toast } from 'antd-mobile';
import RecordingButton from './RecordingButton';

const FlexedCamera = styled(Camera)`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-items: flex-end;
`;

class VideoCamera extends Component {
  //
  state = { isRecording: false };
  //
  stopRecording = () => {
    this.camera.stopRecording();
    this.setState({ isRecording: false });
  };
  //
  startRecording = () => {
    Toast.loading('starting...', 0, null, true);
    // ちらつき対策。それでも録画後の動画に黒画面が入る場合がある。
    // https://github.com/expo/expo/issues/1057
    setTimeout(() => {
      this.camera.recordAsync().then(this.props.onCaptured);
      Toast.hide();
      this.setState({ isRecording: true });
      Toast.info('stared', 1.5, null, false);
    }, 500);
  };
  //
  render() {
    return (
      <FlexedCamera
        innerRef={ref => { this.camera = ref; }}
        type={Camera.Constants.Type.back}>
        <RecordingButton
          isRecording={this.state.isRecording}
          onStartPress={this.startRecording}
          onStopPress={this.stopRecording} />
      </FlexedCamera>
    );
  }
}

export default VideoCamera;
