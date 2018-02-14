import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  LayoutAnimation
} from 'react-native';
import styles from './style';

export default class RecordingButton extends Component {

  renderRecording() {
    return (
      <TouchableOpacity onPress={this.props.onStopPress}
        style={[styles.buttonContainer, styles.buttonStopContainer, this.props.style]}>
        <View style={styles.buttonStop}></View>
      </TouchableOpacity>
    );
  }

  renderWaiting() {
    return (
      <TouchableOpacity
        onPress={e => {
          LayoutAnimation.spring();
          this.props.onStartPress(e);
        }}
        style={[styles.buttonContainer, this.props.style]}>
        <View style={styles.circleInside}></View>
      </TouchableOpacity>
    );
  }

  render() {
    if (this.props.isRecording) {
      return this.renderRecording();
    }
    return this.renderWaiting();
  }
}
