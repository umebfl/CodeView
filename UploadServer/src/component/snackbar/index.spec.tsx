import React, { FC, useEffect } from 'react'
import {
    render,
    fireEvent,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import { useDispatch, useSelector } from 'react-redux'

import { DURATION } from 'src/component/snackbar'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'
import { Dispatch } from 'src/reducer/type'

describe('Snackbar', () => {
    it('可以弹出提示', () => {
        const msg = 'test error'
        const Test = () => {
            const dispatch = useDispatch<Dispatch>()
            useEffect(() => {
                dispatch.snackbar.push({
                    timeStamp: new Date().getTime(),
                    severity: 'error',
                    msg,
                })
            }, [])
            return null
        }

        render(
            <Context initStore={getInitStore()}>
                <Test />
            </Context>
        )

        expect(screen.getByText(msg)).toBeDefined()
    })

    it(
        '多个snackbar可以自动消失',
        async () => {
            const msg1 = 'test error'
            const msg2 = 'test error2'

            const Test = () => {
                const dispatch = useDispatch<Dispatch>()
                useEffect(() => {
                    dispatch.snackbar.push({
                        timeStamp: new Date().getTime(),
                        severity: 'error',
                        msg: msg1,
                    })

                    setTimeout(() => {
                        dispatch.snackbar.push({
                            timeStamp: new Date().getTime(),
                            severity: 'error',
                            msg: msg2,
                        })
                    }, 1000)
                }, [])
                return null
            }

            render(
                <Context initStore={getInitStore()}>
                    <Test />
                </Context>
            )

            expect(screen.getByText(msg1)).toBeDefined()
            await waitForElementToBeRemoved(screen.getByText(msg1), {
                timeout: DURATION,
            })
            expect(screen.queryByText(msg1)).toBeNull()

            expect(screen.getByText(msg2)).toBeDefined()
            await waitForElementToBeRemoved(screen.getByText(msg2), {
                timeout: DURATION,
            })
            expect(screen.queryByText(msg2)).toBeNull()
        },
        DURATION + 2000
    )
})
