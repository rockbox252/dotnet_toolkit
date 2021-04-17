import React, { useRef } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Paper,
  TextField,
  Button,
  Card,
  Typography,
  Divider,
} from '@material-ui/core';
import ExtensionIcon from '@material-ui/icons/Extension';

import * as actions from '../actions';

const SearchNuGet = ({ searchNugetPackages, nugetPackageList }) => {
  const inputRef = useRef();

  const renderList = packageList => {
    return packageList?.map(nugetPackage => {
      return (
        <React.Fragment key={nugetPackage.id}>
          <ExtensionIcon color="secondary" fontSize="small" />
          <Typography color="secondary" variant="body1" display="inline">
            {' '}
            {nugetPackage.title}
          </Typography>
          <Typography variant="body2" paragraph>
            <span style={{ color: '#ef706e' }}>Package Description: </span>{' '}
            {nugetPackage.description}
          </Typography>
          <Typography
            variant="caption"
            display="inline"
            style={{ marginRight: 20 }}
          >
            <span style={{ color: '#ef706e' }}>Creator:</span>{' '}
            {nugetPackage.authors[0]}
          </Typography>

          <Typography
            variant="caption"
            display="inline"
            style={{ marginRight: 20 }}
          >
            <span style={{ color: '#ef706e' }}>Total Downloads:</span>{' '}
            {nugetPackage.totalDownloads}
          </Typography>

          <Typography variant="caption" display="inline">
            <span style={{ color: '#ef706e' }}>Latest Version:</span>{' '}
            {nugetPackage.version}
          </Typography>
          <Divider style={{ margin: 20 }} />
        </React.Fragment>
      );
    });
  };

  return (
    <Container>
      <Paper
        style={{
          margin: '10px 0',
          minHeight: '100vh',
          padding: 10,
        }}
        elevation={3}
      >
        <Card
          style={{
            marginTop: '10px',
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #c8d6e5',
          }}
          elevation={0}
        >
          <TextField
            variant="standard"
            label="Search NuGet Packages"
            inputRef={inputRef}
            style={{ width: '50%', flexGrow: 1 }}
          />

          <Button
            color="secondary"
            variant="contained"
            style={{ marginLeft: 20 }}
            onClick={() => searchNugetPackages(inputRef.current.value)}
          >
            Search
          </Button>
        </Card>
        <Card style={{ marginTop: 20 }} elevation={0}>
          {renderList(nugetPackageList)}
        </Card>
      </Paper>
    </Container>
  );
};

const mapStateToProps = state => {
  if (!state.app) return {};
  const {
    app: { nugetPackageList },
  } = state;
  return { nugetPackageList };
};

export default connect(mapStateToProps, actions)(SearchNuGet);
