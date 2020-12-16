import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
//import ProTip from './ProTip';
import DefaultLayout from "./Layouts/Layout.Default";
import { Copyright } from "./Layouts/Layout.Default";
import styled from 'styled-components';
import { palette, spacing, typography } from '@material-ui/system';


export default function App() {
  return (
    <DefaultLayout maxWidth="xs">
     <CssBaseline/>
      <Box style={{ height:"100vh" }} color="primary" m={4}>
        <Typography  variant="h4" component="h1" gutterBottom>
          Dr.Chrono API Login
        </Typography>
        <Link href="https://drchrono.com/o/authorize/?redirect_uri=REDIRECT_URI_ENCODED&response_type=code&client_id=CLIENT_ID_ENCODED&scope=SCOPES_ENCODED">
            <Button>Login to Dr Chrono</Button>
        </Link>
        <Copyright />
      </Box>
    </DefaultLayout>
  );
}
