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
    height: '90vh',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  iFrameContainer: {
    height: '150vh',
    width: '98.5vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportIFrame: {
    height: '100%',
    width: '100%',
    border: 'none',
    overflow: 'scroll',
    pointerEvents: 'none',
  },
  footer: {
    backgroundColor: '#dfe6e9',
    padding: theme.spacing(6, 0),
    color: '#eb4d4b',
    borderTop: '5px solid #eb4d4b',
  },
}));

export default useStyles;
