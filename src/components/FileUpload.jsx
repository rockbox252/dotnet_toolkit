import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';

import FileUploadService from '../utils/file-upload-service';
import useStyles from '../utils/styles';

const FileUpload = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Paper className={classes.fileUploadContainer} elevation={3}>
          <Button variant="contained" color="secondary" component="label">
            Upload Files
            <input type="file" hidden />
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

export default FileUpload;
