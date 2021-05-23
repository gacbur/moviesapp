import React, { useEffect, useState, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'

import SearchBar from '../../components/searchBar/SearchBar'

import { BsFillHeartFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

import './Navbar.css'

const Navbar = () => {

    const [show, setShow] = useState()
    const [sideToggle, setSideToggle] = useState(false)

    const navbarEl = useRef(null)

    useEffect(() => {
        const showSearchBar = () => {
            if (navbarEl.current.clientWidth >= 768) {
                setShow(true)
            } else {
                setShow(false)
            }
        }

        showSearchBar()
        window.addEventListener('resize', showSearchBar)
    }, [navbarEl])

    return (
        <>
            <div className="navbar" ref={navbarEl}>
                <NavLink className="navbar__logo-link" to="/" exact>
                    <div className="navbar__logo">
                        <h3>
                            Movies viewer
                    </h3>
                    </div>
                </NavLink>
                <button
                    className="navbar__hamburger"><GiHamburgerMenu
                        onClick={() => setSideToggle(true)}
                    />
                </button>
                <ul className="navbar__links">
                    <li>
                        <NavLink to="/categories">Categories</NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites">Favorites</NavLink>
                    </li>
                </ul>
                <div
                    className={`links__search-bar-cnt ${show ? '' : 'hide'}`}>
                    <SearchBar width={300} />
                </div>
            </div >
            <div className={`sidedrawer ${sideToggle ? 'show' : ''}`}>
                <ul className="sidedrawer__links" onClick={() => setSideToggle(false)}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <NavLink to="/categories">Categories</NavLink>
                    </li>
                    <li>
                        <Link to="/favorites">Favorites <BsFillHeartFill className="sidedrawer__links__heart" /></Link>
                    </li>
                </ul>
                <div className="sidedrawer__search-bar-cnt">
                    <SearchBar setSideDrawerShow={setSideToggle} width={200} />
                </div>
            </div >
            {sideToggle && <div
                className="backdrop"
                onClick={() => setSideToggle(false)}>

            </div>}
        </>
    )
}

export default Navbar
