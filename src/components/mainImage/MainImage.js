import React from 'react'

import { Link } from 'react-router-dom'

import './MainImage.css'

const MainImage = ({ image, title, id }) => {
    return (
        <>
            <div className='main-image'>
                <img className="main-image__img" src={`${image}`} alt=""></img>
            </div>
            {id ?
                <div className="main-image-title-cnt">
                    <Link to={`/movie/${id}`} className='title-cnt__title'>{title}</Link>
                </div>
                :
                null
            }

        </>
    )
}

export default MainImage