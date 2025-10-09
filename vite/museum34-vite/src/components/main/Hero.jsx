import React from 'react';
import heroBackground from '../../images/image/hero.png';
import img1 from '../../images/logo.png'
import ImgCar from './ImgCar';
const Hero = () => {
    return (
        <div 
            className="hero-container" 
            style={{ 
                backgroundImage: `url(${heroBackground})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                height: '100vh', 
                color: '#fff', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
            }}
        >
            <div style={{ marginBottom: '20px', padding:'10px' }}>
                <img src={img1} alt="Museum Logo" style={{ width: '150px' }} />
            </div>            
            <ImgCar/>
            <h1 className="slogan" style={{color:'purple', fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>
                "Descubra la historia y el arte de Arequipa"
            </h1>
            <div className="stats-container" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <button className="stat-button" style={buttonStyle}>
                    <strong>50+</strong>
                    <p>Exhibiciones</p>
                </button>
                <button className="stat-button" style={buttonStyle}>
                    <strong>1000+</strong>
                    <p>Visitantes</p>
                </button>
                <button className="stat-button" style={buttonStyle}>
                    <strong>500+</strong>
                    <p>Piezas de arte</p>
                </button>
            </div>
        </div>
    );
};
const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '10px 20px',
    fontSize: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '120px',
};
export default Hero;