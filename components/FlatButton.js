import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'antd-mobile';

const BorderLessButton = styled(Button)`
  border-width: 0;
`;

const FlatButton = ({ children, ...props }) => {
  return (
    <BorderLessButton type="ghost" {...props}>
      {children}
    </BorderLessButton>
  );
};

export default FlatButton;
