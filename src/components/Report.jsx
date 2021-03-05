import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, Container, Button } from '@material-ui/core';

import * as actions from '../actions';
import useStyles from '../utils/styles';

const Report = ({ report }) => {
  const classes = useStyles();
  return (
    <Container>
      <Button component={Link} to="/" color="secondary">
        Go Back &larr;
      </Button>
      <Paper className={classes.reportContainer} elevation={3}>
        <iframe
          srcDoc={report}
          title="report output"
          className={classes.reportIFrame}
        />
      </Paper>
    </Container>
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

export default connect(mapStateToProps, actions)(Report);
