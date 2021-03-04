import React, { useRef } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import useStyles from '../utils/styles';
import * as actions from '../actions';

const FileUpload = ({ generateReport, report }) => {
  const classes = useStyles();
  const inputRef = useRef();
  console.log(report)
  return (
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={5}>
        <Paper className={classes.fileUploadContainer} elevation={3}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={inputRef}
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={9} />
            <Grid item xs={1}>
              <Button
                color="secondary"
                variant="contained"
                style={{ marginTop: 20 }}
                onClick={() => generateReport(inputRef.current.value, 'html')}
              >
                Analyze
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

const mapStateToProps = state => {
  const { app: { report } } = state;
  console.log(report);
  return {
    report,
  };
};

export default connect(mapStateToProps, actions)(FileUpload);
