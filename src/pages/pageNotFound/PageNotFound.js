import React from 'react'

import { useHistory } from 'react-router'

import './PageNotFound.css'

const PageNotFound = () => {

    const history = useHistory()

    return (
        <div className="page-not-found">
            <h2>Page Not found, Sorry!</h2>
            <button
                onClick={() => history.goBack()}
                className="page-not-found__go-back-btn">
                Go back
            </button>
        </div>
    )
}

export default PageNotFound
