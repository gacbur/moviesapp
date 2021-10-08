
import MoviesByCategories from '../../components/moviesByCategories/MoviesByCategories'
import MoviesCarousel from '../../components/moviesCarousel/MoviesCarousel'
import GoUpButton from '../../components/goUpButton/GoUpButton'

import { Element } from 'react-scroll'

import './LandingPage.css'

const LandingPage = () => {

    return (
        <>
            <div className="movies-carousel-cnt">
                <MoviesCarousel />
            </div>
            <Element className="landing-page" name="landing-page">
                <h1>Movies</h1>
                <MoviesByCategories />
                <GoUpButton
                    scrollToElementName={'landing-page'}
                />
            </Element>
        </>
    )
}

export default LandingPage
