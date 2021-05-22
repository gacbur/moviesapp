import React from 'react'

import { Route, Switch } from 'react-router-dom'

import LandingPage from '../../pages/landingPage/LandingPage'
import Favorites from '../../pages/favorites/Favorites'
import Categories from '../../pages/categories/Categories'
import SingleMovie from '../../pages/singleMovie/SingleMovie'
import PageNotFound from '../../pages/pageNotFound/PageNotFound'
import MovieMissingInfo from '../../pages/movieMissingInfo/MovieMissingInfo'

const Main = () => {
    return (
        <>
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/favorites' component={Favorites} />
                <Route path='/categories' component={Categories} />
                <Route path='/movie/:id' component={SingleMovie} />
                <Route exact path='/missing_info' component={MovieMissingInfo} />
                <Route component={PageNotFound} />
            </Switch>
        </>
    )
}

export default Main
