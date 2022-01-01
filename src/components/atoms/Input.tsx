import * as React from 'react';
import styled from 'styled-components';

interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
}

const StyledInput = styled.input`
  height: 2rem;
  width: 18rem;
`;

const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => (
    <StyledInput
      ref={ref}
      type={props.type || 'text'}
      value={props.value}
      placeholder={props.placeholder}
    />
  ),
);

export default Input;
