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
    it('可以显示标题', () => {
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

    it('当点击刷新图标时可以调用刷新', () => {
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

    it('当allowBack为false时，回退图标不可点击', () => {
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

    it('当点击回退图标时可以调用回退', () => {
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
