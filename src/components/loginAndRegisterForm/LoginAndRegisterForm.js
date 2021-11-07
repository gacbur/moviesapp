import React from 'react'

import { TextField } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core'


import "./LoginAndRegisterForm.css"

const LoginAndRegisterForm = () => {




    return (
        <div className="form">
            <div className="form__switch-form-btns">
                <div className="form__switch-btn form__switch-btn--login"></div>
                <div className="form__switch-btn form__switch-btn--register"></div>
            </div>
            <form className="form__content">
                <TextField className="form__input" id="filled-basic" label="Name" variant="filled" />
                <TextField className="form__input" id="filled-basic" label="Email address" variant="filled" />
                <TextField className="form__input" id="filled-basic" label="Password" variant="filled" />
                <TextField className="form__input" id="filled-basic" label="Confrim Password" variant="filled" />

            </form>
        </div>
    )
}

export default LoginAndRegisterForm
