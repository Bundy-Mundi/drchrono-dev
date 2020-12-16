import { red, blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { palette } from '@material-ui/system';
// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
