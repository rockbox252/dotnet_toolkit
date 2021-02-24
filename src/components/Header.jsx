import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import useStyles from '../utils/styles';

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            .NET Migration Toolkit
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
