import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Title from '../atoms/Title';

const Theme = {
  primary: '#8187DC',
};

function Header() {
  return (
    <AppBar
      position="static"
      style={{ margin: 0, backgroundColor: Theme.primary }}
    >
      <Toolbar>
        <Title value="CP-Helper" />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
