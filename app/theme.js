import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: green.A700
    },
    error: {
      main: red.A700
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
