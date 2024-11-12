import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './ImgCar.css';

import g1 from '../../images/gif/g1.gif'
import g2 from '../../images/gif/g2.gif';
import g3 from '../../images/gif/g3.gif';
import g4 from '../../images/gif/g4.gif';
import g5 from '../../images/gif/g5.gif';

const handleDragStart = (e) => e.preventDefault();

const ImgCar = () => {
    const items = [
        <img className="imgCar" src={g1} onDragStart={handleDragStart} role="presentation" key="1" alt="Gif 1" />,
        <img className="imgCar" src={g2} onDragStart={handleDragStart} role="presentation" key="2" alt="Gif 2" />,
        <img className="imgCar" src={g3} onDragStart={handleDragStart} role="presentation" key="3" alt="Gif 3" />,
        <img className="imgCar" src={g4} onDragStart={handleDragStart} role="presentation" key="4" alt="Gif 4" />,
        <img className="imgCar" src={g5} onDragStart={handleDragStart} role="presentation" key="5" alt="Gif 5" />,
    ];

    return (
        <AliceCarousel
            mouseTracking
            items={items}
            autoPlay
            autoPlayInterval={4000}  
            infinite        
            keyboardNavigation
        />
    );
};

export default ImgCar;
