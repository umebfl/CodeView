import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import NoMoreData from 'src/component/noMoreData'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

describe('NoMoreData', () => {
    it('renders correctly', () => {
        const tree = render(
            <Context initStore={getInitStore()}>
                <NoMoreData />
            </Context>
        )

        expect(tree).toMatchSnapshot()
    })

    it('should render hints ', () => {
        render(
            <Context initStore={getInitStore()}>
                <NoMoreData />
            </Context>
        )

        expect(screen.getByText('没有更多了。')).toBeDefined()
    })
})
