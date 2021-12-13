import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import StatusBar from 'src/module/homePage/statusBar'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

const testVersion = '0.20.2'

jest.mock('../../../../package.json', () => {
    return {
        version: testVersion,
    }
})

describe('StatusBar', () => {
    it('可以显示对应版本号', () => {
        render(
            <Context initStore={getInitStore()}>
                <StatusBar />
            </Context>
        )

        expect(screen.getByText(/Version: 0\.20\.2/i)).toBeDefined()
    })
})
