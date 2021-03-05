/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { IconButton, Link, Typography, Container } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import useStyles from '../utils/styles';

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" style={{ color: '#fff' }} align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
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
        {/* <Typography align="center">
          <IconButton
            style={{ color: 'e4405f' }}
            component={Link}
            href="https://www.instagram.com/pulavarthi.preetham/"
            target="_blank"
          >
            <InstagramIcon style={{ color: 'e4405f' }} />
          </IconButton>
          <IconButton
            style={{ color: 'inherit' }}
            component={Link}
            href="https://github.com/theonly1me"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            style={{ color: '55acee' }}
            component={Link}
            href="https://www.twitter.com/AtchyutPreetham"
            target="_blank"
          >
            <TwitterIcon style={{ color: '#55acee' }} />
          </IconButton>
          <IconButton
            style={{ color: '#0077B5' }}
            component={Link}
            href="https://www.linkedin.com/in/atchyutpulavarthi/"
            target="_blank"
          >
            <LinkedInIcon style={{ color: '#0077B5' }} />
          </IconButton>
        </Typography> */}
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
