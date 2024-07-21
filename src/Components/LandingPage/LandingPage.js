import React from 'react'
import "./LandingPage.css"
import { motion } from "framer-motion";
import gradient from '../../assets/gradient.png'
import iphone from '../../assets/iphone.png'
import { Link } from 'react-router-dom';
import { RWebShare } from "react-web-share";

const LandingPage = () => {
    return (
        <div className='wrapper'>
            <div className="info">
                <motion.h1 className="bigHeading"
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >Track Crypto</motion.h1>
                <motion.h1 className='bigHeading2'
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >Real Time <span style={{ fontFamily: "auto" }}>.</span></motion.h1>
                <motion.p className='para'
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >Track crypto through a public api in real time. Visit the Dashboard to do so!</motion.p>
                <motion.div className="landing-buttons"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.75 }}
                >
                    <Link className='landing-btn' to="/dashboard">Dashboard</Link>

                    <RWebShare
                        data={{
                            text: "Crypto Dashboard made using React JS in 2022",
                            url: "https://shiva-crypto-tracker.netlify.app/",
                            title: "Crypto Dashboard",
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        {/* <Button text="Share" outlined={true} /> */}
                        <Link className='landing-btn share' to="">Share</Link>
                    </RWebShare>

                </motion.div>
            </div>
            <div className="phone-box">
                <img className='gradient' src={gradient} alt="" />
                <motion.img className='iphone' src={iphone} alt="" initial={{ y: -10 }} animate={{ y: 10 }}
                    transition={{
                        type: "smooth",
                        repeatType: "mirror",
                        duration: 2,
                        repeat: Infinity
                    }} />
            </div>
        </div>
    )
}

export default LandingPage