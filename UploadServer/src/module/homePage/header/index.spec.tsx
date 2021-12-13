import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import Header from 'src/module/homePage/header'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

describe('Header', () => {
    it('可以显示logo', () => {
        render(
            <Context initStore={getInitStore()}>
                <Header />
            </Context>
        )

        expect(screen.getByRole('img')).toBeDefined()
    })
})
