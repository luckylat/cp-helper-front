import * as React from "react"
import styled from "styled-components"

import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

import Title from '../atoms/Title'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

import Grid from '@material-ui/core/Grid'

const StyledDiv = styled.div`
  height: calc(100vh - 190px);
  width: 100vw;
  
`

const Top = () => (
  <>
    <Header />
    <StyledDiv>
      <Grid item xs={12} style={{ margin:'100px' }}>
        <Title value="CP-Streak-Helper" size={60} />
      </Grid>
      <Grid item xs={12} style={{ textAlign:'center', margin:'50px' }}>
        <Input placeholder="Username(AtCoder)" />
      </Grid>
      <Grid item xs={12} style={{ textAlign:'center', margin:'50px' }}>
        <Button label="Go!" action={()=>(window.alert("Hello!"))} />
      </Grid>
    </StyledDiv>
    <Footer />
  </>
)

export default Top