import React, { useContext } from 'react';
import styled, { ThemeContext } from "styled-components";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const S_AppBar = styled(AppBar)`
    background: ${({theme}) => theme.pallete.blue[500]};
`;
const S_Button = styled(Button)`
    margin: ${({theme}) => theme.spacing.xl};
`;

const Header = () => {
    const theme = useContext(ThemeContext);
    return (
        <S_AppBar position="static" >
           <Toolbar>
             <IconButton edge="start" color="inherit" aria-label="menu">
               <MenuIcon />
             </IconButton>
             <Typography variant="h6" >
               News
             </Typography>
             <S_Button color="inherit">Login</S_Button>
           </Toolbar>
         </S_AppBar>
    )
};

export default Header;
