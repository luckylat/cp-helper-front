import React,{useState} from "react"
import styled from "styled-components"

import Grid from '@material-ui/core/Grid'

import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

import Title from '../atoms/Title'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

import AtCoderStreakFetcher from '../../utils/Streak'





const StyledDiv = styled.div`
  height: calc(100vh - 190px);
  width: 100vw;
  
`


const Top = () => {
  const InputData = React.createRef<HTMLInputElement>();
  const [status,setStatus] = useState("let fill the input field above!");
  const ScriptData = () => {
    const UserName = InputData.current.value;
    console.log("Clicked!")
    //ToDo:Inputの中身をHidden状態にする

    if(!UserName){
      alert("no Input");
      return
    }
    setStatus("Fetching...");
    AtCoderStreakFetcher(UserName).then((ret) => {
      if(ret===1){
        setStatus(`Today, ${UserName} already got unique-AC.`);
      }else if(ret===0){
        setStatus(`Today, ${UserName} don't get unique-AC yet.`);
      }else{
        setStatus(`${UserName} doesn't have any submittion. (misspelled?)`)
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
        <div>{status}</div>
      </Grid>
    </StyledDiv>
    <Footer />
  </>
  )
}

export default Top