import React from 'react'
import './footer.css'
import logo from '../../img/logo.png'

function Footer() {
    return (
        <footer className="footer-section shadow-sm">
        <div className="container">
        
            <div className="footer-content pt-5 pb-5">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 mb-50">
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <a href="index.html">
                                    <img width="100" src={logo} className="img-fluid" alt="logo"/></a>
                            </div>
                            <div className="footer-text">
                                <p>Start streaming and sharing best moment of your playing games in The Gamer</p>
                            </div>
                            <div className="footer-social-icon">
                                <span>Follow us</span>
                                <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                                <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                                <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Useful Links</h3>
                            </div>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">about</a></li>
                                <li><a href="#">Best Channels</a></li>
                                <li><a href="#">Most Like Streams</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">About us</a></li>
                               
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Subscribe</h3>
                            </div>
                            <div className="footer-text mb-25">
                                <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                            </div>
                            <div className="subscribe-form">
                                <form action="#">
                                    <input type="text" placeholder="Email Address"/>
                                    <button><i className="fab fa-telegram-plane"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 text-center text-lg-left">
                        <div className="copyright-text">
                            <p>Copyright &copy; 2020, All Right Reserved <a href="https://codepen.io/anupkumar92/">The Gamer</a></p>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer
