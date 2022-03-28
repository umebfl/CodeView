import { FC, ReactElement } from 'react'
import { map } from 'ramda'

import { Box, useTheme } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import { useT } from 'src/hooks/language'

type Props = {
    waitingRecords: string[]
    uploadingRecords: string[]
    finishedRecords: string[]
}

const RecordsList: FC<{
    data: string[]
    type: 'finished' | 'waiting' | 'uploading'
}> = ({ data, type }) => {
    const t = useT()
    const theme = useTheme()
    console.log(theme.palette.success.dark)

    return (
        <Box>
            {map((record: string) => {
                return (
                    <Box
                        key={record}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 30,
                            fontSize: 12,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                alignItems: 'center',
                                wordBreak: 'break-all',
                            }}
                        >
                            {record}
                        </Box>
                        <Box
                            sx={{
                                width: 60,
                                marginLeft: 1,
                                alignItems: 'center',
                                textAlign: 'center',
                                color: 'white',
                                borderRadius: 1,
                                background:
                                    type === 'finished'
                                        ? theme.palette.success.dark
                                        : type === 'uploading'
                                        ? theme.palette.primary.dark
                                        : theme.color.grey15,
                            }}
                        >
                            {t(type)}
                        </Box>
                    </Box>
                )
            })(data)}
        </Box>
    )
}

const UploadRecordsList: FC<Props> = props => {
    const t = useT()
    const theme = useTheme()
    const { children, waitingRecords, uploadingRecords, finishedRecords } =
        props

    if (children) {
        return (
            <Tooltip
                arrow
                placement="right"
                title={
                    <Box>
                        <Box
                            sx={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Box sx={{ flex: 1 }}>{t('allRecords')}:</Box>
                            {uploadingRecords.length ? (
                                <a
                                    rel="noreferrer"
                                    href="http://cn.xray0.autox.ds"
                                    target="_blank"
                                    style={{
                                        color: theme.palette.primary.light,
                                    }}
                                >
                                    {t('viewProgress')}
                                </a>
                            ) : null}
                        </Box>
                        <RecordsList
                            data={finishedRecords}
                            type={'finished'}
                        ></RecordsList>
                        <RecordsList
                            data={uploadingRecords}
                            type={'uploading'}
                        ></RecordsList>
                        <RecordsList
                            data={waitingRecords}
                            type={'waiting'}
                        ></RecordsList>
                    </Box>
                }
            >
                {children as ReactElement}
            </Tooltip>
        )
    }

    return null
}

export default UploadRecordsList
