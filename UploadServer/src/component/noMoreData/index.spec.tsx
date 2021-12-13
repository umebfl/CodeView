import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import NoMoreData from 'src/component/noMoreData'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

describe('NoMoreData', () => {
    it('should render hints ', () => {
        render(
            <Context initStore={getInitStore()}>
                <NoMoreData />
            </Context>
        )

        expect(screen.getByText('没有更多了。')).toBeDefined()
    })
})
