import React,{useState} from "react"
import styled from "styled-components"

import Grid from '@material-ui/core/Grid'

import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

import Title from '../atoms/Title'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

import StreakFetcher from '../../utils/Streak'





const StyledDiv = styled.div`
  height: calc(100vh - 190px);
  width: 100vw;
  
`


const Top = () => {
  const InputData = React.createRef<HTMLInputElement>();
  const [state,setState] = useState("let fill the input field above!");
  const ScriptData = () => {
    console.log("Clicked!")
    if(!InputData.current.value){
      alert("no Input");
      return
    }
    setState("Fetching...");
    StreakFetcher(InputData.current.value).then((ret) => {
      if(ret){
        setState("Today, you already got unique-AC");
      }else{
        setState("Today, you don't get unique-AC yet.");
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
      <Grid item xs={12} style={{ textAlign:'center', margin:'50px' }}>
        <div>{state}</div>
      </Grid>
    </StyledDiv>
    <Footer />
  </>
  )
}

export default Top