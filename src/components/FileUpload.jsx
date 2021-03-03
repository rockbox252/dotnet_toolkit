import React, { useRef } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

import useStyles from '../utils/styles';

const handleClick = val => {
  console.log(val);
};

const FileUpload = () => {
  const classes = useStyles();
  const inputRef = useRef();
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
                onClick={() => handleClick(inputRef.current.value)}
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

export default FileUpload;
