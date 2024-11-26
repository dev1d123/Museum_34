import React, { useState } from 'react';
import styled from 'styled-components';

import NavLearn from './NavLearn';
import PopularSubjects from './PopularSubjects';
import TeamSection from './TeamSection';
import ServicesSection from './ServicesSection';
import ContactUs from './ContactUs';
import MainVoice from '../MainVoice';
import FooterPage from '../FooterPage';
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
            <div className="buttonVoice" style={{ position: 'sticky', top: '10px', margin: '10px', zIndex: '9000' }}>
                <MainVoice />
            </div>
                <PopularSubjects></PopularSubjects>
                <TeamSection></TeamSection>
                <ServicesSection></ServicesSection>
                <ContactUs></ContactUs>

            </div>
            <FooterPage></FooterPage>
        </div>
        
    )
}

export default Learn;