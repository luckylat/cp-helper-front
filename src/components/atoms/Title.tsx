import * as React from 'react'
import styled from 'styled-components'

interface TitleProps {
  value: string
}

const StyledDiv = styled.div`
  font-size: 60px;
  text-align: center;
`


const Title = (props:TitleProps) => {
  return(
    <>
    <StyledDiv>{props.value}</StyledDiv>
    </>
  )
}

export default Title