import React from 'react';
import { connect } from 'react-redux';
// import { View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'antd-mobile';
import UploadResult from '../components/UploadResult';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FullWidthView = styled.View`
  flex: 1;
  width: 100%;
`;

class CompleteScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    headerLeft: null,
    headerRight: null
  });
  //
  close = () => {
    this.props.dispatch(NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'Main' }) ]
    }));
  };
  //
  render() {
    return (
      <Container>
        {
          this.props.isUploading
          ? <ActivityIndicator text="uploading" />
          : <FullWidthView>
              <UploadResult onClose={this.close} />
            </FullWidthView>
        }
      </Container>
    );
  }
}
//
export default connect(
  ({ content }) => ({ isUploading: content.isUploading })
)(CompleteScreen);
