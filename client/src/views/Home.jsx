import React from 'react';
import { Box, Button, Typography} from '@material-ui/core';
import styled from "styled-components";

const S_Box = styled(Box)`
    height: 100vh;
    width: 100%;
    display:grid;
    place-content: center;

`;
const S_Button = styled(Button)`
    height: 3rem;
    width: 7rem;
    border: ${({theme})=>theme.pallete.blue[400]} 1px solid;
`;

const Home = () => {
    return(
        <S_Box>
            <Typography>HOME</Typography>
            <S_Button>Click Here</S_Button>
        </S_Box>
    );
};

export default Home;
