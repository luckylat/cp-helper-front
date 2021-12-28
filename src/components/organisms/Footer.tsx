import * as React from "react"
import styled from "styled-components"

import { makeStyles } from '@material-ui/core/styles'


const Theme = {
  primary: '#8187DC'
}

const useStyles = () => makeStyles({
  footer: {
    //round
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',


    backgroundColor: Theme.primary,

    height: '2rem',
    width:  '100vw',

    

  }
})

const Footer = () => {
  const classes = useStyles()();
  return(
    <>
      <div className={classes.footer}></div>
    </>
  )
}

export default Footer