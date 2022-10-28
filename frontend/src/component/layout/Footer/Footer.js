import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Fotter.css"

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUT AAP</h4>
                <p> Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="Appstore" />
            </div>

            <div className="midFooter">

                <h1>CRAB CART</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2022 &copy; PiyushYadav</p>
            </div>
            <div className="rightFooter">
                <h4>Follow us</h4>
                <a href="http://instagram.com/piyushyadav4493">Instagram</a>
                <a href="http://instagram.com/piyushyadav4493">Youtube</a>
                <a href="http://instagram.com/piyushyadav4493">Facebook</a>

            </div>
        </footer>

    );
}

export default Footer