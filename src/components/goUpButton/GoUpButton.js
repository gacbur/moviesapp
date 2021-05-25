import React, { useState, useLayoutEffect } from 'react'

import { scroller } from 'react-scroll'

import { RiArrowDropUpLine } from 'react-icons/ri'

import "./GoUpButton.css"

const GoUpButton = ({ scrollToElementName }) => {

    const [scrollPosition, setScrollPosition] = useState(0)

    useLayoutEffect(() => {
        function updatePosition() {
            setScrollPosition(window.pageYOffset);
        }
        window.addEventListener('scroll', updatePosition)
        updatePosition()
        return () => window.removeEventListener('scroll', updatePosition)
    }, [])


    const handleScrollToProjects = () => {
        scroller.scrollTo(`${scrollToElementName}`, {
            duration: 800,
            delay: 0,
            offset: -70,
            smooth: 'easeInOutQuart'
        })
    }

    return (
        <button
            className={`go-up-btn ${scrollPosition > 800 && 'active'}`}
            onClick={() => handleScrollToProjects()}
        >
            <RiArrowDropUpLine className='arrow' />
        </button>
    )
}

export default GoUpButton
