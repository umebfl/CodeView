import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import ListView from 'src/module/uploadServer/detail/listView'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'
import { slotInfoType, uploadStatusEnum } from 'src/reducer/uploadServer/type'

describe('ListView', () => {
    it('should render table ', () => {
        const data: slotInfoType[] = [
            {
                slotId: '0',
                slotBusId: 'xxx',
                isEmpty: true,
            },
        ]

        render(
            <Context initStore={getInitStore()}>
                <ListView data={data} />
            </Context>
        )

        expect(
            screen.getByRole('cell', {
                name: /xxx/i,
            })
        ).toBeDefined()
    })

    // it('should render diskInfo ', () => {
    //     const data: slotInfoType[] = [
    //         {
    //             slotId: '0',
    //             slotBusId: 'xxx',
    //             isEmpty: false,
    //             diskInfo: {
    //                 diskId: 'test diskId',
    //                 diskName: 'test diskName',
    //                 uploadStatus: uploadStatusEnum.DATA_UPLOADING,
    //                 uploadStatusStr: '上传中',
    //                 mountPoint: 'xxx',
    //                 invalidMsg: '',
    //                 recommendedServerId: '',
    //                 slotId: '0',
    //                 updateTime: 100000,
    //                 updateTimeStr: '2021-11-01 11:11:11',
    //                 updateTimeShortStr: '11-01 11:11:11',
    //                 tips: '',
    //                 vehicleIds: ['byd-01'],
    //                 wrongServer: false,
    //             },
    //         },
    //     ]

    //     render(
    //         <Context initStore={getInitStore()}>
    //             <ListView data={data} />
    //         </Context>
    //     )

    //     expect(
    //         screen.getByRole('cell', {
    //             name: /test diskname/i,
    //         })
    //     ).toBeDefined()
    // })
})
