import { useEffect } from 'react'

import Box from '@mui/material/Box'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

import Grid from 'src/component/grid'
import Breadcrumbs from 'src/component/breadcrumbs'
import { useT } from 'src/hooks/language'
import { RootState, Dispatch } from 'src/reducer/type'
import { map } from 'ramda'
import { DiskUploadStatus } from 'src/reducer/disk/type'
import Tooltip from '@mui/material/Tooltip'

const DiskRecordsLog = () => {
    const t = useT()

    const dispatch = useDispatch<Dispatch>()
    const navigate = useNavigate()
    const theme = useTheme()

    const { uploadRecords } = useSelector((state: RootState) => state.disk)
    const { id } = useParams()

    const handleRefresh = () => {
        if (id) {
            dispatch.disk.getUploadRecords(id)
        }
    }

    const list = id ? uploadRecords[id] : []

    const columns: GridColDef[] = [
        {
            field: 'seq',
            headerName: t('S/N'),
            width: 100,
            type: 'string',
            sortable: true,
        },
        {
            field: 'uploadServerId',
            headerName: `${t('server')} ID`,
            flex: 1,
            minWidth: 180,
            type: 'string',
            sortable: true,
        },
        {
            field: 'vehicleId',
            headerName: t('vehicle'),
            flex: 1,
            minWidth: 180,
            type: 'string',
            sortable: true,
        },
        {
            field: 'uploadStatus',
            headerName: t('uploadStatus'),
            flex: 1,
            minWidth: 120,
            sortable: true,
            type: 'singleSelect',
            valueOptions: [
                t('succed'),
                t('failed'),
                t('notUpload'),
                t('uploading'),
            ],
            valueGetter: (params: GridValueGetterParams) => {
                const val = params.row.uploadStatus
                const text =
                    val === DiskUploadStatus.SUCCEED
                        ? t('succed')
                        : val === DiskUploadStatus.FAILED
                        ? t('failed')
                        : val === DiskUploadStatus.NOT_UPLOAD
                        ? t('notUpload')
                        : val === DiskUploadStatus.UPLOADING
                        ? t('uploading')
                        : '-'

                return text
            },
            renderCell: (params: GridValueGetterParams) => {
                const val = params.row.uploadStatus

                const text =
                    val === DiskUploadStatus.SUCCEED
                        ? t('succed')
                        : val === DiskUploadStatus.FAILED
                        ? t('failed')
                        : val === DiskUploadStatus.NOT_UPLOAD
                        ? t('notUpload')
                        : val === DiskUploadStatus.UPLOADING
                        ? t('uploading')
                        : '-'

                return (
                    <Box
                        sx={{
                            color:
                                val === DiskUploadStatus.SUCCEED
                                    ? theme.palette.success.dark
                                    : val === DiskUploadStatus.FAILED
                                    ? theme.palette.error.dark
                                    : val === DiskUploadStatus.UPLOADING
                                    ? theme.palette.primary.dark
                                    : theme.palette.warning.dark,
                        }}
                    >
                        {text}
                    </Box>
                )
            },
        },
        {
            field: 'uploadStartTime',
            headerName: t('startTime'),
            flex: 1,
            minWidth: 200,
            sortable: true,
            type: 'date',
            renderCell: (params: GridValueGetterParams) => {
                const val = params.row.uploadStartTime
                return (
                    <Tooltip arrow title={<Box>{val}</Box>}>
                        <Box
                            sx={{
                                overflow: 'hidden',
                                wordSpacing: 'normal',
                                textOverflow: 'ellipsis',
                                width: '90%',
                            }}
                        >
                            {val.length ? val : '-'}
                        </Box>
                    </Tooltip>
                )
            },
        },
        {
            field: 'uploadEndTime',
            headerName: t('endTime'),
            flex: 1,
            minWidth: 200,
            sortable: true,
            type: 'date',
            renderCell: (params: GridValueGetterParams) => {
                const val = params.row.uploadEndTime
                return (
                    <Tooltip arrow title={<Box>{val}</Box>}>
                        <Box
                            sx={{
                                overflow: 'hidden',
                                wordSpacing: 'normal',
                                textOverflow: 'ellipsis',
                                width: '90%',
                            }}
                        >
                            {val.length ? val : '-'}
                        </Box>
                    </Tooltip>
                )
            },
        },
        {
            field: 'xrayUris',
            headerName: t('records'),
            flex: 1,
            minWidth: 300,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.xrayUris?.join(',') || '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const records = params.row.xrayUris
                return (
                    <Tooltip
                        arrow
                        title={
                            <Box>
                                {map((record: string) => {
                                    return (
                                        <Box
                                            key={record}
                                            sx={{
                                                padding: 0.5,
                                            }}
                                        >
                                            {record}
                                        </Box>
                                    )
                                }, records)}
                            </Box>
                        }
                    >
                        <Box
                            sx={{
                                overflow: 'hidden',
                                wordSpacing: 'normal',
                                textOverflow: 'ellipsis',
                                width: '90%',
                            }}
                        >
                            {records}
                        </Box>
                    </Tooltip>
                )
            },
        },
        // {
        //     field: '耗时',
        //     headerName: '耗时',
        //     flex: 1,
        //     type: 'string',
        //     sortable: true,
        // },
    ]

    useEffect(() => {
        if (id) {
            dispatch.disk.getUploadRecords(id)
        }
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Breadcrumbs
                allowBack={true}
                handleRefresh={handleRefresh}
                data={[
                    {
                        name: 'Disk',
                        link: '/disk',
                    },
                    {
                        name: id || '-',
                        link: '/disk/records',
                    },
                ]}
                desc={t('recordsLog')}
            ></Breadcrumbs>

            <Grid rows={list || []} columns={columns} quickFilter={true} />
        </Box>
    )
}

export default DiskRecordsLog
