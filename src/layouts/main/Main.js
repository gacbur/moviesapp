import React from 'react'

import { Route, Switch } from 'react-router-dom'

import LandingPage from '../../pages/landingPage/LandingPage'
import Favorites from '../../pages/favorites/Favorites'
import Genres from '../../pages/genres/Genres'
import LoginAndRegister from '../../pages/loginAndRegister/LoginAndRegister'
import SingleMovie from '../../pages/singleMovie/SingleMovie'
import PageNotFound from '../../pages/pageNotFound/PageNotFound'
import MovieMissingInfo from '../../pages/movieMissingInfo/MovieMissingInfo'

const Main = () => {
    return (
        <>
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/favorites' component={Favorites} />
                <Route path='/genres' component={Genres} />
                <Route path='/movie/:id' component={SingleMovie} />
                <Route path='/login' component={LoginAndRegister} />
                <Route exact path='/missing_info' component={MovieMissingInfo} />
                <Route component={PageNotFound} />
            </Switch>
        </>
    )
}

export default Main
