import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from '../../app/App.js';
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { RestoreIcon, FavoriteIcon } from '@mui/icons-material'

describe('Cuando el usuario da click en para cambiar el tema', () => {
    it('Cambia el tema en todo el body', () => {
        render(<App />)
        const button = screen.getByRole('checkbox', { label: 'lblChangeTheme' })
        fireEvent.click(button)
    })
})
