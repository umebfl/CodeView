import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import App, { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

describe('App', () => {
    it('当输入文本时可以调用回调函数', () => {
        render(
            <Context initStore={getInitStore()}>
                <App />
            </Context>
        )

        expect(screen.getByText(/version: \d+\.\d+\.\d+/i)).toBeDefined()
        // 默认进入upload server页面
        expect(screen.getByText(/upload server/i)).toBeDefined()
        expect(screen.getByRole('textbox')).toBeDefined()
    })
})
