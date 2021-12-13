import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import { Box } from '@mui/system'

import Breadcrumbs from 'src/component/breadcrumbs'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

jest.mock('react-router-dom', () => ({
    Link: ({ children }: any) => <div>{children}</div>,
    useNavigate: () => {
        return () => {}
    },
}))

describe('BreadcrumbsCmp', () => {
    it('should render title', () => {
        const loadData = jest.fn()
        const BreadcrumbsCmpTitle = 'test-title'

        render(
            <Context initStore={getInitStore()}>
                <Breadcrumbs handleRefresh={loadData}>
                    <Box>{BreadcrumbsCmpTitle}</Box>
                </Breadcrumbs>
            </Context>
        )

        expect(screen.getByText(BreadcrumbsCmpTitle)).toBeDefined()
    })

    it('should called handleRefresh when the refresh icon is clicked', () => {
        const loadData = jest.fn()
        const BreadcrumbsCmpTitle = 'test-title'

        render(
            <Context initStore={getInitStore()}>
                <Breadcrumbs allowBack={false} handleRefresh={loadData}>
                    <Box>{BreadcrumbsCmpTitle}</Box>
                </Breadcrumbs>
            </Context>
        )

        fireEvent.click(screen.getByTestId('RefreshOutlinedIcon'))
        expect(loadData).toBeCalled()
    })

    it('the fallback icon cannot be clicked when allowback is false', () => {
        const loadData = jest.fn()
        const handleBaforeBack = jest.fn()
        const BreadcrumbsCmpTitle = 'test-title'

        render(
            <Context initStore={getInitStore()}>
                <Breadcrumbs
                    handleRefresh={loadData}
                    allowBack={false}
                    handleBaforeBack={handleBaforeBack}
                >
                    <Box>{BreadcrumbsCmpTitle}</Box>
                </Breadcrumbs>
            </Context>
        )

        fireEvent.click(screen.getByTestId('ArrowCircleLeftOutlinedIcon'))
        expect(handleBaforeBack).not.toBeCalled()
    })

    it('should called handleBaforeBack when the fallback icon is clicked', () => {
        const loadData = jest.fn()
        const handleBaforeBack = jest.fn()
        const BreadcrumbsCmpTitle = 'test-title'

        render(
            <Context initStore={getInitStore()}>
                <Breadcrumbs
                    handleRefresh={loadData}
                    allowBack={true}
                    handleBaforeBack={handleBaforeBack}
                >
                    <Box>{BreadcrumbsCmpTitle}</Box>
                </Breadcrumbs>
            </Context>
        )

        fireEvent.click(screen.getByTestId('ArrowCircleLeftOutlinedIcon'))
        expect(handleBaforeBack).toBeCalled()
    })
})
