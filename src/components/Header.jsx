import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Tabs,
  Tab,
} from '@material-ui/core';

import useStyles from '../utils/styles';

const Header = ({ tabValue, setTabValue }) => {
  const classes = useStyles();

  const handleTabClick = (e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.header}>
      <AppBar position="static">
        <Toolbar variant="regular">
          <Typography variant="h5" className={classes.title}>
            .NET Migration Toolkit
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Tabs
            onChange={handleTabClick}
            value={tabValue}
            indicatorColor="secondary"
          >
            <Tab label="Assesment" component={Link} to="/" disableRipple />
            <Tab
              label="Estimation"
              component={Link}
              to="/estimation"
              disableRipple
            />
            <Tab
              label="Migration & Porting"
              component={Link}
              to="/migration"
              disableRipple
            />
            <Tab
              label="Search NuGet Packages"
              component={Link}
              to="/search-nuget"
              disableRipple
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
