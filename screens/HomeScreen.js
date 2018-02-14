import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Icon, List } from 'antd-mobile';
import styled from 'styled-components/native';
import { BUCKET, UPLOAD_DIR } from '../constants/aws';

const CaptureButton = styled.TouchableOpacity`
  padding: 0 10px;
`;

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text>VideoUploader</Text>,
    headerRight: (
      <CaptureButton onPress={() => navigation.navigate('Capture')}>
        <Icon type={'\ue689'} size="lg" color="#0d47a1" />
      </CaptureButton>
    )
  });
  
  componentDidMount () {
    this.props.dispatch({ type: 'content/fetchVideos' });
  }

  render() {
    return (
      <ScrollView>
        <List renderHeader={() => `${BUCKET}/${UPLOAD_DIR}`}>
          {this.props.contents.map(content => {
            return (
              <List.Item key={content}>
                <Text style={{ fontSize: 11 }}>{content}</Text>
              </List.Item>
            );
          })}
        </List>
      </ScrollView>
    );
  }
}

export default connect(
  ({ content }) => ({ contents: content.contents })
)(HomeScreen);
