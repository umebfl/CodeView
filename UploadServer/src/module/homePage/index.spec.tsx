import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from 'src/module/homePage'

describe('HomePage', () => {
    it('should render', async () => {
        render(<HomePage />)
        const linkElement = screen.getByText(/HomePage/i)
        expect(linkElement).toBeDefined()
    })

    it('should render header', async () => {
        render(<HomePage />)
        const linkElement = screen.getByText(/HomePage/i)
        expect(linkElement).toBeDefined()
    })
})
