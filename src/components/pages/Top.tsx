import * as React from "react"
import styled from "styled-components"

import Grid from '@material-ui/core/Grid'

import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

import Title from '../atoms/Title'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

import StreakFetcher from '../../utils/Streak'
import { isReturnStatement } from "typescript"





const StyledDiv = styled.div`
  height: calc(100vh - 190px);
  width: 100vw;
  
`


const Top = () => {
  const InputData = React.createRef<HTMLInputElement>();
  const ScriptData = () => {
    console.log("Clicked!")
    if(!InputData.current.value){
      alert("TextField is Empty");
      return
    }
    StreakFetcher(InputData.current.value).then((ret) => {
      if(ret){
        console.log("OK!")
      }else{
        console.log("NG...")
      }
    })
  }
  return(
  <>
    <Header />
    <StyledDiv>
      <Grid item xs={12} style={{ margin:'100px' }}>
        <Title value='CP-Streak-Helper' size={60} />
      </Grid>
      <Grid item xs={12} style={{ textAlign:'center', margin:'50px' }}>
        <Input ref={InputData} placeholder='Username(AtCoder)' />
      </Grid>
      <Grid item xs={12} style={{ textAlign:'center', margin:'50px' }}>
        <Button label='Go!' action={ScriptData} />
      </Grid>
    </StyledDiv>
    <Footer />
  </>
  )
}

export default Top