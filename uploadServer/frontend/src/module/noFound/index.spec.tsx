import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import NoFound from 'src/module/noFound'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

describe('NoFound', () => {
    it('should render hints', () => {
        render(
            <Context initStore={getInitStore()}>
                <NoFound />
            </Context>
        )

        expect(screen.getByText('404 No Found!')).toBeDefined()
    })
})
