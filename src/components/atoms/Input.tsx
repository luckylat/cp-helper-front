import * as React from 'react'
import styled from 'styled-components'


interface InputProps{
  type?: string
  value?: string
  placeholder?: string
}

const StyledInput = styled.input`
  height: 2rem;
  width: 18rem;
  
`


const Input = (props:InputProps) => {

  return (
    <>
      <StyledInput type={props.type || 'text'} value={props.value} placeholder={props.placeholder}/>
    </>
  )
}

export default Input