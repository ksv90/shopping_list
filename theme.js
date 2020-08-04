import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: red.A700 //'#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
});

export const appStyle = (theme) => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
});
