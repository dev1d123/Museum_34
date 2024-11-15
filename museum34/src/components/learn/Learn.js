import React, { useState } from 'react';
import styled from 'styled-components';

import NavLearn from './NavLearn';
import PopularSubjects from './PopularSubjects';
const Nav = styled.div`
    padding: 0;
    margin: 0;
`;
    

function Learn(){
    return(
        <div>
            <Nav>
                <NavLearn></NavLearn>
            </Nav>
            <br></br>
            <br></br>
            <br></br>
            
            <br></br>
            <br></br>
            <br></br>
            
            <div>
                <PopularSubjects></PopularSubjects>
            </div>

        </div>
        
    )
}

export default Learn;