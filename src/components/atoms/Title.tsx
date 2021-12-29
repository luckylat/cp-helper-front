import * as React from 'react'

import { makeStyles } from '@material-ui/core/styles'

interface TitleProps {
  value: string
  size?: number
}



const useStyles = (props) => makeStyles({
  title: {
    fontSize: props.size || 24,
    textAlign: 'center',
  }
})


const Title = (props:TitleProps) => {
  const classes = useStyles(props)();
  return <div className={classes.title}>{props.value}</div>
}

export default Title