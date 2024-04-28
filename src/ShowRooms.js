// ShowRooms.js
import React from 'react';
import './ShowRooms.css'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation } from 'react-router-dom';
import image1 from './images/image1.jpeg';
import image2 from './images/image2.jpeg';
import image3 from './images/image3.jpeg';

const ShowRooms = () => {

  const location = useLocation();
  const { selectedBlock, selectedRoom } = location.state;

  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000 // Change slide every 2 seconds
  };

  const imageStyle = {
      width: '100%', // Set a fixed height for all images
      objectFit: 'cover' // Maintain aspect ratio and cover the container
  };


  return (
    <div className="room-images-container"> 
        <div className="navibar">
            <div className="left">
                <h1>Room Selection</h1>
            </div>
            <div className="right">
                <h1><Link to={`/additional/${selectedRoom}/${selectedBlock}`} className="infoLink">
                Additional Information
                </Link></h1>
            </div>
        </div>
        <h2>Block: {selectedBlock}</h2>
        <h2>Room Number: {selectedRoom}</h2>
        <Slider className="slideshow" {...settings}> 
            <div>
                <img src={image1} alt="Image 1" style={imageStyle} />
            </div>
            <div>
                <img src={image2} alt="Image 2" style={imageStyle} />
            </div>
            <div>
                <img src={image3} alt="Image 3" style={imageStyle} />
            </div>
        </Slider>
    </div>
  );
}

export default ShowRooms;