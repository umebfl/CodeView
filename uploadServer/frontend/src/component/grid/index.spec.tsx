import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import Grid from 'src/component/grid'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

describe('tooltipField', () => {
    it('renders correctly', () => {
        const rows = [
            {
                id: 'test1',
                col1: 'col1',
            },
        ]

        const columns = [
            {
                field: 'col1',
                headerName: 'col1',
                width: 100,
                type: 'number',
                sortable: true,
            },
        ]

        const tree = render(
            <Context initStore={getInitStore()}>
                <Grid rows={rows} columns={columns} quickFilter={true} />
            </Context>
        )

        expect(tree).toMatchSnapshot()
    })
})
