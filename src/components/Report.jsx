import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DLLIcon from '@material-ui/icons/PlayForWork';
import SubProject from '@material-ui/icons/AccountTree';
import '../utils/loader.css';
import {
  Paper,
  Button,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Grid,
} from '@material-ui/core';

import useStyles from '../utils/styles';
import * as actions from '../actions';

function createData(
  definedInAssemblyIdentity,
  memberDocID,
  recommendedChanges,
  sourceCompatibleChanges
) {
  return {
    definedInAssemblyIdentity,
    memberDocID,
    recommendedChanges,
    sourceCompatibleChanges,
  };
}

const getMissingAssemblyRows = missingAssemblies => {
  return missingAssemblies.map(assembly => {
    return createData(
      assembly.DefinedInAssemblyIdentity,
      assembly.MemberDocId,
      assembly.RecommendedChanges,
      assembly.SourceCompatibleChanges
    );
  });
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const generateList = (
  unresolvedAssemblies,
  margin = 0,
  clearStore = null,
  nugetRes
) => {
  return unresolvedAssemblies.map((ua, index) => {
    return (
      <>
        {!margin ? (
          <>
            <ListItem component={Link} to="/" onClick={clearStore} key={ua}>
              <ListItemAvatar>
                <Avatar>
                  {margin ? (
                    <DLLIcon color="secondary" />
                  ) : (
                    <SubProject color="secondary" />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={nugetRes[index].assemblyName} />
            </ListItem>
            <Divider style={{ marginTop: margin, marginBottom: margin }} />
          </>
        ) : (
          <>
            <ListItem key={ua}>
              <ListItemAvatar>
                <Avatar>
                  {margin ? (
                    <DLLIcon color="secondary" />
                  ) : (
                    <SubProject color="secondary" />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={ua}
                secondary={
                  nugetRes ? (
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        // style={{ display: 'inline' }}
                        color="textPrimary"
                      >
                        {nugetRes && nugetRes[index]?.searchRes?.title}{' '}
                      </Typography>
                      Created By:{' '}
                      {nugetRes && nugetRes[index]?.searchRes?.authors[0]},
                      Total Downloads:{' '}
                      {nugetRes && nugetRes[index]?.searchRes?.totalDownloads}
                      Description:{' '}
                      {nugetRes && nugetRes[index]?.searchRes?.description}
                    </>
                  ) : null
                }
              />
            </ListItem>
            <Divider style={{ marginTop: margin, marginBottom: margin }} />{' '}
          </>
        )}
      </>
    );
  });
};

const Report = ({
  projectPath,
  generateReport,
  jsonReport,
  clearStore,
  excelReport,
  nugetSearch,
  nugetRes,
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const projectName = projectPath?.split('\\').pop();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  jsonReport?.UnresolvedUserAssemblies?.forEach(assembly => {
    let name = assembly.split(',')[0];
    if (name.includes('.')) {
      name = name.split('.').pop();
    }
    nugetSearch(name + ' core', assembly);
  });

  const missingAssemblyRows =
    (jsonReport && getMissingAssemblyRows(jsonReport.MissingDependencies)) ||
    [];

  const subProjects = jsonReport?.SubProjects?.map(el => el.slice(0, -8));

  const handleExcelReport = (path, reportType = 'excel') => {
    setShowLoader(true);
    generateReport(path, reportType);
  };

  return jsonReport ? (
    <>
      <Button component={Link} to="/" color="secondary" onClick={clearStore}>
        Go Back &larr;
      </Button>
      <Button
        component={Link}
        to="/report/html"
        color="secondary"
        style={{ float: 'right' }}
        onClick={() => generateReport(projectPath, 'html')}
      >
        View Detailed Report
      </Button>
      {!excelReport ? (
        (showLoader && (
          <Button
            color="secondary"
            style={{ float: 'right', pointerEvents: 'none' }}
          >
            Loading...
          </Button>
        )) || (
          <Button
            color="secondary"
            style={{ float: 'right' }}
            onClick={() => handleExcelReport(projectPath, 'excel')}
          >
            Generate Excel Report
          </Button>
        )
      ) : (
        <Button
          color="secondary"
          style={{ float: 'right', pointerEvents: 'none' }}
        >
          Excel Report Saved In Project Folder
        </Button>
      )}
      <Paper className={classes.reportContainer} variant="outlined">
        <AppBar position="static" style={{ maxHeight: 43 }} color="secondary">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Project Info" {...a11yProps(0)} />
            <Tab label="Missing Dependencies" {...a11yProps(1)} />
            <Tab label="Unresolved Assemblies" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <div
          style={{
            minHeight: '60%',
            maxHeight: '70%',
            width: '100%',
            overflowY: 'scroll',
            marginTop: '-150px',
          }}
        >
          <TabPanel value={value} index={0}>
            <Paper
              style={{ padding: 20, width: '80vw' }}
              elevation={0}
              variant="outlined"
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="body1" gutter>
                    <span style={{ color: '#eb4d4b' }}>Submission Id: </span>{' '}
                    {jsonReport?.SubmissionId}
                  </Typography>
                  <Divider style={{ margin: '10px 10px' }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutter>
                    <span style={{ color: '#eb4d4b' }}>Application Name: </span>
                    {jsonReport?.ApplicationName || projectName}
                  </Typography>
                  <Divider style={{ margin: '10px 10px' }} />
                </Grid>
                {jsonReport?.SubProjects ? (
                  <Grid item xs={12}>
                    <Typography variant="body1" gutter>
                      <span style={{ color: '#eb4d4b' }}>Sub Projects</span>
                      <List>
                        {jsonReport
                          ? generateList(subProjects, 0, clearStore)
                          : null}
                      </List>
                    </Typography>
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <Typography variant="body1" gutter>
                    <span style={{ color: '#eb4d4b' }}>Last Updated: </span>
                    {jsonReport?.CatalogLastUpdated}
                  </Typography>
                  <Divider style={{ margin: '10px 10px' }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutter>
                    <span style={{ color: '#eb4d4b' }}>
                      Total Missing Dependencies:{' '}
                    </span>
                    {jsonReport?.MissingDependencies.length}
                  </Typography>
                  <Divider style={{ margin: '10px 10px' }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutter>
                    <span style={{ color: '#eb4d4b' }}>
                      Total Unresolved Assemblies:{' '}
                    </span>
                    {jsonReport?.UnresolvedUserAssemblies.length}
                  </Typography>
                  <Divider style={{ margin: '10px 10px' }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutter>
                    <span style={{ color: '#eb4d4b' }}>Target Platforms </span>
                    <br />
                    {jsonReport?.Targets[0]}
                    <br />
                    {jsonReport?.Targets[1]}
                    <br />
                    {jsonReport?.Targets[2]}
                  </Typography>
                  <Divider style={{ margin: '10px 10px' }} />
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead style={{ backgroundColor: '#3a9ce8' }}>
                  <TableRow>
                    <TableCell style={{ color: '#fff' }}>
                      Assembly Name
                    </TableCell>
                    <TableCell style={{ color: '#fff' }} align="right">
                      Member
                    </TableCell>
                    <TableCell style={{ color: '#fff' }} align="right">
                      Recommended Changes
                    </TableCell>
                    <TableCell align="right" style={{ color: '#fff' }}>
                      Source Compatible Changes
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {missingAssemblyRows.map(row => (
                    <TableRow key={row.definedInAssemblyIdentity}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ wordBreak: 'break-word', textAlign: 'left' }}
                      >
                        {row.definedInAssemblyIdentity}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          maxWidth: 100,
                          wordBreak: 'break-word',
                          textAlign: 'left',
                        }}
                      >
                        {row.memberDocID}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          maxWidth: 100,
                          wordBreak: 'break-word',
                          textAlign: 'left',
                        }}
                      >
                        {row.recommendedChanges}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          maxWidth: 100,
                          wordBreak: 'break-word',
                          textAlign: 'left',
                        }}
                      >
                        {row.sourceCompatibleChanges}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <List>
              {jsonReport
                ? generateList(
                    jsonReport?.UnresolvedUserAssemblies?.sort((a, b) => a - b),
                    20,
                    null,
                    nugetRes
                  )
                : null}
            </List>
          </TabPanel>
        </div>
      </Paper>
    </>
  ) : (
    <Paper className="loader">
      <Typography color="secondary" variant="h5" style={{ display: 'block' }}>
        Analyzing
      </Typography>
      <br />
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    </Paper>
  );
};

const mapStateToProps = state => {
  if (!state.app) return {};
  const {
    app: { projectPath, jsonReport, excelReport, nugetRes },
  } = state;
  return {
    projectPath,
    jsonReport,
    excelReport,
    nugetRes,
  };
};

export default connect(mapStateToProps, actions)(Report);
