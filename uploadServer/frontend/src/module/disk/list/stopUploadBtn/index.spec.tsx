import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import Grid from 'src/component/grid'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

import StopUploadBtn from 'src/module/disk/list/stopUploadBtn'
import { uploadStatusEnum } from 'src/reducer/uploadServer/type'

describe('stopUploadBtn', () => {
    it('renders correctly', () => {
        const tree = render(
            <Context initStore={getInitStore()}>
                <StopUploadBtn
                    diskId="test-disk"
                    serverId="test-server"
                    uploadStatus={uploadStatusEnum.DATA_UPLOADING}
                />
            </Context>
        )

        expect(tree).toMatchSnapshot()
    })
})
