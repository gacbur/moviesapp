import React from 'react'

import { useSelector } from 'react-redux'

import { Carousel } from 'react-responsive-carousel';

import "./SingleMovieGallery.css"

const SingleMovieGallery = () => {

    const galleryItems = useSelector(state => state.singleMovie.singleMovie_gallery)

    return (
        <div className="single-movie-gallery">
            {galleryItems.length > 0 && <Carousel
                className="gallery"
                showArrows
                showStatus
                showThumbs={false}
                showIndicators={false}
                stopOnHover
                selectedItem={0}

            >
                {galleryItems.map((galleryItem, index) => {
                    return (
                        <div className="gallery__item-cnt" key={index}>
                            <div className="gallery__item" style={{ backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL}w1280${galleryItem.file_path})` }}>
                            </div>
                        </div>
                    )
                })}
            </Carousel>}
        </div>
    )
}

export default SingleMovieGallery
