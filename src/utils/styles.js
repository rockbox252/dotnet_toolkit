import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {},
  title: {
    flexGrow: 1,
    color: '#fff',
    fontFamily: 'Josefin Sans, sans-serif;',
  },
  fileUploadContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '50vw',
    marginTop: 100,
    padding: 10,
  },
  browseContainer: {
    minHeight: '100vh',
  },
  reportContainer: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  reportIFrame: {
    height: '95%',
    width: '95%',
    border: '1px solid #b2bec3',
    overflow: 'scroll',
    pointerEvents: 'none',
  },
  footer: {
    backgroundColor: '#0984e3',
    padding: theme.spacing(6, 0),
    marginTop: 20,
    color: '#fff',
    borderTop: '5px solid #eb4d4b',
  },
}));

export default useStyles;
