/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { Typography, Container } from '@material-ui/core';

import useStyles from '../utils/styles';

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" style={{ color: '#eb4d4b' }} align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="subtitle1" align="center" gutterBottom>
          .NET Migration Toolkit
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
