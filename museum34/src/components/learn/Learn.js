import React, { useState } from 'react';
import styled from 'styled-components';

import NavLearn from './NavLearn';
const Nav = styled.div`
    padding: 0;
    margin: 0;
`;
    

function Learn(){
    return(
        <Nav>
            <NavLearn></NavLearn>
        </Nav>
    )
}

export default Learn;