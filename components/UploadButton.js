import React from 'react';
import { Text } from 'react-native';
import { Button, Icon } from 'antd-mobile';
import styled from 'styled-components/native';

const FloatButton = styled(Button)`
  z-index: 9999;
  position: absolute;
  background-color: rgba(70, 70, 70, 0.9);
  border-color: #777;
`;

const UploadButton = ({ hide, ...props }) => {
  if (hide) return null;
  return (
    <FloatButton {...props}>
      <Icon type={'\ue6b6'} color="#fafafa" size="20" />
      <Text>upload</Text>
    </FloatButton>
  );
};

export default UploadButton;
