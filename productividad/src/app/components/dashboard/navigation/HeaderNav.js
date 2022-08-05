import React, { useEffect, useState } from 'react';

const MyHeaderNav = () => {
    /*
    * Theme
    *Devuelve un valor con estado (state) 
    *y una función setter (setState) para actualizar el valor.
    */
    const [isThemeDark, setIsThemeDark] = useState(false)

    //useEffect forma similar a componentDidMount y componentDidUpdate
    useEffect(() => {
        document.documentElement.classList.toggle("dark-theme", isThemeDark);
    })

    return (
        <>
            <nav>
                <ul>
                    <li> <img src="./assets/images/logo/logo.svg" alt="logo" /></li>
                </ul>

                <ul>
                    <li>
                    </li>
                </ul>

                <ul>
                    <i>
                        <label className="m-switch">
                            <span className="is-sr-only">Usar modo oscuro</span>
                            <svg className="m-switch__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
                            </svg>
                            <input id="themeToggle" label="lblChangeTheme" onChange={() => setIsThemeDark(!isThemeDark)} type="checkbox" className="m-switch__checkbox is-sr-only" />
                            <span className="m-switch__toggle"></span>
                            <svg className="m-switch__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15">
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path
                                    d="M12.01 12c0-3.57 2.2-6.62 5.31-7.87.89-.36.75-1.69-.19-1.9-1.1-.24-2.27-.3-3.48-.14-4.51.6-8.12 4.31-8.59 8.83C4.44 16.93 9.13 22 15.01 22c.73 0 1.43-.08 2.12-.23.95-.21 1.1-1.53.2-1.9-3.22-1.29-5.33-4.41-5.32-7.87z" />
                            </svg>
                        </label>
                    </i>



                </ul>

            </nav>
        </>
    )
}

export default MyHeaderNav;