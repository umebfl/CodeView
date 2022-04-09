/** No need unit test */
import React from 'react'
import { find } from 'ramda'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Box } from '@mui/system'
import { useTheme } from '@mui/material/styles'

import Breadcrumbs from 'src/component/breadcrumbs'
import { uploadServerType } from 'src/reducer/uploadServer/type'
import { RootState, Dispatch } from 'src/reducer/type'

import ListView from 'src/module/uploadServer/detail/listView'

import { useT } from 'src/hooks/language'

const UploadServerDetail = () => {
    const { id } = useParams()
    const theme = useTheme()
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const dispatch = useDispatch<Dispatch>()
    const t = useT()

    const detail = find((item: uploadServerType) => item.uploadServerId === id)(
        data
    )

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                overflow: 'hidden',
            }}
        >
            <Breadcrumbs
                handleRefresh={dispatch.uploadServer.initData}
                data={[
                    {
                        name: 'Upload Server',
                        link: '/up',
                    },
                    {
                        name: id as string,
                        link: '/up',
                    },
                ]}
                desc={t('slotList')}
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    {detail ? (
                        <ListView data={detail?.slotInfos || []}></ListView>
                    ) : (
                        <Box
                            sx={{
                                color: theme.color.grey15,
                                display: 'flex',
                                marginTop: 10,
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            {t('noMatchingUploadServer')}[{id}]
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default UploadServerDetail
