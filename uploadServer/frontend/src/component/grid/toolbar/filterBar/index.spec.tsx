import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import FilterBar from 'src/component/grid/toolbar/filterBar'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

jest.mock('react-router-dom', () => ({
    Link: ({ children }: any) => <div>{children}</div>,
    useNavigate: () => {
        return () => {}
    },
}))

describe('FilterBar', () => {
    it('should called handleChange when text is entered', async () => {
        const handleChange = jest.fn()

        render(
            <Context initStore={getInitStore()}>
                <FilterBar handleChange={handleChange} />
            </Context>
        )

        screen.logTestingPlaygroundURL()
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: '006' },
        })

        await jest.setTimeout(1000)

        expect(handleChange).toBeCalled()
    })

    it('should show the right node, when right exists ', () => {
        const handleChange = jest.fn()

        render(
            <Context initStore={getInitStore()}>
                <FilterBar
                    handleChange={handleChange}
                    right={<div>right-node</div>}
                />
            </Context>
        )

        expect(screen.getByText('right-node')).toBeDefined()
    })
})
