import React from 'react'
import { Link } from 'react-router-dom'
import bannerico from '../asserts/images/banner-icon.png'
// import bannerimg from '../asserts/images/banner.jpg'
// import image1a from '../asserts/images/image1a.jpg'
// import image2a from '../asserts/images/image2a.jpg'

import "../css/Banner.css"

const Banner = () => {
    return (
        <>
        <div>
            <div className="image_conatiner">
                <img src="https://layerdrops.com/agriox/assets/images/backgrounds/main-slider-v1-1.jpg" alt="" className="bannerimage"/>
                <div className="bannertext">
                <img src={bannerico} alt="" />
                <h1>Welcome to</h1>
                <h1> Farmeazy</h1>
                <h3>Small Changes Big Difference</h3>
                <Link to="/shop"><button className="shopnow">Shop Now</button></Link>
                </div>
            </div>
        </div>
        {/* <div className="reccomded">
            <div className="rc1">
                <img src={image1a} alt="" />
                <div className="rcdesc ">
                    <div className="heading">Veggies</div>
                <div className="desc"><b>100% </b> Organic Products</div>
                <button className="buy">Buy Now</button>
                </div>
                
            </div>
            <div className="rc1">
                <img src={image2a} alt="" />
                <div className="rcdesc rc2">
                    <div className="heading">Fruits</div>
                <div className="desc"><b>100% </b> Organic Products</div>
                <button className="buy">Buy Now</button>
                </div>
                
            </div>
        </div> */}
        </>
    )
}

export default Banner
