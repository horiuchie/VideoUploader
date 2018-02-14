import React from 'react';
import { Result, Icon } from 'antd-mobile';
import styled from 'styled-components/native';
import FlatButton from './FlatButton';

const FlexedResult = styled(Result)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CloseButton = ({ ...props }) => {
  return (
    <FlatButton {...props}>
      <Icon type="cross" color="#0d47a1" size="small" />Close
    </FlatButton>
  );
};

const UploadResult = ({ onClose }) => {
  return (
    <FlexedResult
      img={<Icon size={128} type="check-circle-o" color="#0d47a1" />}
      title="Done"
      message={<CloseButton onClick={onClose} />} />
  );
};

export default UploadResult;
