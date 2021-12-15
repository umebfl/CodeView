import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import App, { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

describe('App', () => {
    it('should render defalut page', () => {
        render(
            <Context initStore={getInitStore()}>
                <App />
            </Context>
        )

        expect(screen.getByText(/version: \d+\.\d+\.\d+/i)).toBeDefined()
        // load the upload server page by default
        expect(screen.getByText(/upload server/i)).toBeDefined()
        expect(screen.getByRole('textbox')).toBeDefined()
    })
})
