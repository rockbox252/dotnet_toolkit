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
    minHeight: '20vh',
    minWidth: '50vw',
    marginTop: 100,
    padding: 10,
  },
}));

export default useStyles;
