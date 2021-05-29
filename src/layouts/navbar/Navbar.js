import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

import SearchBar from '../../components/searchBar/SearchBar'

import { BsFillHeartFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

import './Navbar.css'

const Navbar = () => {

    const [sideToggle, setSideToggle] = useState(false)

    return (
        <>
            <div className="navbar" >
                <NavLink className="navbar__logo-link" to="/" exact>
                    <div className="navbar__logo">
                        <h3>
                            Movies App
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
                        <NavLink to="/genres">Genres</NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites">Favorites</NavLink>
                    </li>
                </ul>
                <div
                    className='links__search-bar-cnt'>
                    <SearchBar width={290} />
                </div>
            </div >
            <div className={`sidedrawer ${sideToggle ? 'show' : ''}`}>
                <ul className="sidedrawer__links" onClick={() => setSideToggle(false)}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <NavLink to="/genres">Genres</NavLink>
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
