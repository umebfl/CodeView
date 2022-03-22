import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import Menu from 'src/module/homePage/menu'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

jest.mock('react-router-dom', () => ({
    Link: ({ children }: any) => <div>{children}</div>,
    useNavigate: () => {},
    useMatch: () => {},
    useResolvedPath: () => ({ pathname: '/up' }),
}))

describe('Menu', () => {
    it('should render the navigation buttons', () => {
        render(
            <Context initStore={getInitStore()}>
                <Menu />
            </Context>
        )

        expect(screen.getAllByLabelText('Upload server')).toBeDefined()
        expect(screen.getByTestId('StorageIcon')).toBeDefined()
    })
})
