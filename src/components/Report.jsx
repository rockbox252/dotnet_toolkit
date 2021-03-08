import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

// const rows = [createData('Frozen yoghurt', 159, 6.0, 24, 4.0)];

const getMissingAssemblyRows = missingAssemblies => {
  return missingAssemblies.map(assembly => {
    return createData(
      assembly.definedInAssemblyIdentity,
      assembly.memberDocID,
      assembly.recommendedChanges,
      assembly.sourceCompatibleChanges
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

const Report = ({ projectPath, generateReport, jsonReport }) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const missingAssemblyRows = getMissingAssemblyRows(
    jsonReport.MissingDependencies
  );

  return (
    <>
      <Button component={Link} to="/" color="secondary">
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
      <Paper className={classes.reportContainer} variant="outlined">
        <AppBar position="static" style={{ maxHeight: 43 }} color="secondary">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Project Info" {...a11yProps(0)} />
            <Tab label="Missing Dependencies" {...a11yProps(1)} />
            <Tab label="Unresolved Assemblies" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <div style={{ minHeight: '80%', width: '100%' }}>
          <TabPanel value={value} index={0}>
            Basic Info
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead style={{ backgroundColor: '#3a9ce8' }}>
                  <TableRow>
                    <TableCell style={{ color: '#fff' }}>
                      Dessert (100g serving)
                    </TableCell>
                    <TableCell style={{ color: '#fff' }} align="right">
                      Calories
                    </TableCell>
                    <TableCell style={{ color: '#fff' }} align="right">
                      Fat&nbsp;(g)
                    </TableCell>
                    <TableCell align="right" style={{ color: '#fff' }}>
                      Carbs&nbsp;(g)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {missingAssemblyRows.map(row => (
                    <TableRow key={row.definedInAssemblyIdentity}>
                      <TableCell component="th" scope="row">
                        {row.definedInAssemblyIdentity}
                      </TableCell>
                      <TableCell align="right">{row.memberDocID}</TableCell>
                      <TableCell align="right">
                        {row.recommendedChanges}
                      </TableCell>
                      <TableCell align="right">
                        {row.sourceCompatibleChanges}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </div>
      </Paper>
    </>
  );
};

const mapStateToProps = state => {
  const {
    app: { projectPath, jsonReport },
  } = state;

  return {
    projectPath,
    jsonReport,
  };
};

export default connect(mapStateToProps, actions)(Report);
