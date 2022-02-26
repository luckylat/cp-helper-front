import * as React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  label: string;
  action: () => void;
  background?: string;
  color?: string;
}

const Theme = {
  primary: '#8187DC',
};

const StyledButton = styled.button`
  border: none;
  border-radius: 5px;

  font-size: 24px;

  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};

  height: 3rem;
  width: 12rem;
`;

function Button(props: ButtonProps) {
  const {
    label,
    action,
    background,
    color,
  } = props;
  StyledButton.defaultProps = {
    theme: {
      background: background || Theme.primary,
      color: color || '#ffffff',
    },
  };
  return <StyledButton onClick={() => action()}>{label}</StyledButton>;
}

export default Button;
