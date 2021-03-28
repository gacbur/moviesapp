import React from 'react'

import { Route, Switch } from 'react-router-dom'

import LandingPage from '../../pages/landingPage/LandingPage'
import Favorites from '../../pages/favorites/Favorites'
import SingleMovie from '../../pages/singleMovie/SingleMovie'
import PageNotFound from '../../pages/pageNotFound/PageNotFound'

const Main = () => {
    return (
        <>
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/favorites' component={Favorites} />
                <Route path='/movie/:id' component={SingleMovie} />
                <Route component={PageNotFound} />
            </Switch>
        </>
    )
}

export default Main
