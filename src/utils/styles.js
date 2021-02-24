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
    minHeight: '20vw',
    marginTop: 100,
  },
}));

export default useStyles;
