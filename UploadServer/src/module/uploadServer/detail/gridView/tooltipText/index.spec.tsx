import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import TooltipText from 'src/module/uploadServer/detail/gridView/tooltipText'

describe('TooltipText', () => {
    it('should render title', () => {
        render(
            <TooltipText title={'test title'}>
                <div>test</div>
            </TooltipText>
        )

        expect(screen.getByText(/test/i)).toBeDefined()
    })

    it('should render tooltips when showlen < title.length', async () => {
        const title = 'tooltip title'
        render(
            <TooltipText showlen={2} title={title}>
                <div>test</div>
            </TooltipText>
        )

        fireEvent.mouseEnter(screen.getByText(/test/i))

        await waitFor(() => expect(screen.getByText(title)))

        expect(screen.getByText(title)).toBeDefined()
    })

    it('should hide tooltips when showlen > title.length', async () => {
        const title = 'tooltip title'

        render(
            <TooltipText showlen={20} title={title}>
                <div>test</div>
            </TooltipText>
        )

        fireEvent.mouseEnter(screen.getByText(/test/i))

        await waitFor(() => expect(screen.queryByText(title)))

        expect(screen.queryByText(title)).toBeNull()
    })
})
