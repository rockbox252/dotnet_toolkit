import React from 'react';

import { Link } from 'react-router-dom';

import { Paper, Container, Button } from '@material-ui/core';

import { connect } from 'react-redux';
import useStyles from '../utils/styles';

const IFrame = ({ report }) => {
  const classes = useStyles();
  return (
    <>
      <Button component={Link} to="/report" color="secondary">
        Go Back &larr;
      </Button>
      <Paper className={classes.iFrameContainer} variant="outlined">
        <iframe
          srcDoc={report}
          title="report output"
          className={classes.reportIFrame}
        />
      </Paper>
    </>
  );
};

const mapStateToProps = state => {
  const {
    app: { report },
  } = state;
  return {
    report,
  };
};

export default connect(mapStateToProps)(IFrame);
