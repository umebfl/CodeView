import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import GridView from 'src/module/uploadServer/detail/gridView'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'
import { diskStatusEnum, slotInfoType } from 'src/reducer/uploadServer/type'

describe('GridView', () => {
    it('should render disk name', () => {
        const data: slotInfoType[] = [
            {
                slotId: '0',
                slotBusId: 'xxx',
                isEmpty: false,
                diskInfo: {
                    diskId: 'test diskId',
                    diskName: 'test diskName',
                    mountPoint: 'xxx',
                    diskStatus: diskStatusEnum.DATA_UPLOADING,
                    diskStatusStr: '上传中',
                    invalidMsg: '',
                    isMounted: true,
                    recommendedServerId: '',
                    slotId: '0',
                    updateTime: 100000,
                    updateTimeStr: '2021-11-01 11:11:11',
                    updateTimeShortStr: '11-01 11:11:11',
                    tips: '',
                    vehicleIds: ['byd-01'],
                    wrongServer: false,
                },
            },
        ]

        render(
            <Context initStore={getInitStore()}>
                <GridView data={data} />
            </Context>
        )

        expect(screen.getByText(/test diskname/i)).toBeDefined()
    })

    it('should render tips when data is empty', () => {
        const data: slotInfoType[] = []

        render(
            <Context initStore={getInitStore()}>
                <GridView data={data} />
            </Context>
        )

        expect(screen.getByText(/列表数据为空。/i)).toBeDefined()
    })
})
