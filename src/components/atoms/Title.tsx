import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

export interface TitleProps {
  value: string;
  size?: number;
}

function Title(props: TitleProps) {
  const {
    value,
    size,
  } = props;
  const useStyles = () => makeStyles({
    title: {
      fontSize: size || 24,
      textAlign: 'center',
    },
  });
  const classes = useStyles()();
  return <div className={classes.title}>{value}</div>;
}

export default Title;
