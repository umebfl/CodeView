import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

import { useT } from 'src/hooks/language'

describe('language', () => {
    it('should translate text', () => {
        const Test = () => {
            const t = useT()
            return <div>{t('list')}</div>
        }

        const store = getInitStore()
        render(
            <Context initStore={store}>
                <Test />
            </Context>
        )

        expect(screen.getByText(/列表/i)).toBeDefined()

        const { dispatch } = store
        dispatch.language.switchLang()

        expect(screen.getByText(/List/i)).toBeDefined()
    })
})
