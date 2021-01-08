import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import Nav from "../Components/Nav/Nav.jsx";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import theme from "../theme";

const Header = styled(Box)`
    margin: 0;
    padding: 0;
`;
const Main = styled(Box)`
    margin: 0;
    padding: 0;
`;
const Footer = styled(Box)`
    margin: 0;
    padding: 0;
    height: 8rem;
`;

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const StickyFooter = ({ children }) => {

    return (
        <ThemeProvider theme={theme}>
            <div>

              {/* Header */}
              <Header>
                  <Nav/>
              </Header>

              {/* Main */}
              <Main component="main" maxWidth="sm">
                { children }
              </Main>

              {/* Footer */}
              <Footer >
                <Container maxWidth="sm">
                  <Typography variant="body1">Footer</Typography>
                  <Copyright />
                </Container>
            </Footer>
            </div>
        </ThemeProvider>
  );
}

export default StickyFooter;
