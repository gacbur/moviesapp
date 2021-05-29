import React from 'react'

import { Link } from 'react-router-dom'

import {
    AiFillTwitterCircle,
    AiFillInstagram,
    AiFillFacebook
} from 'react-icons/ai'

import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__text">
                <h3>Visit our socialmedia</h3>
            </div>
            <div className="footer__icons">
                <Link to="/"><AiFillTwitterCircle className="icon" /></Link>
                <Link to="/"><AiFillInstagram className="icon" /></Link>
                <Link to="/"><AiFillFacebook className="icon" /></Link>
            </div>
        </div>
    )
}

export default Footer
