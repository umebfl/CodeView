import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import TooltipField from 'src/component/grid/tooltipField'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

describe('tooltipField', () => {
    it('renders correctly', () => {
        const tree = render(
            <Context initStore={getInitStore()}>
                <TooltipField title="test" />
            </Context>
        )

        expect(tree).toMatchSnapshot()
    })
})
