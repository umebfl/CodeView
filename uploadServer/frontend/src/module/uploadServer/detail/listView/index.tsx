import React from 'react'

import { Box, LinearProgress, Tooltip, Typography } from '@mui/material'
import { map, path } from 'ramda'
import useTheme from '@mui/system/useTheme'
import { Link } from 'react-router-dom'
import { Theme } from '@mui/system'

import { ViewPayloadType } from 'src/module/uploadServer/detail/type'
import {
    diskInfoType,
    DiskStatusConfig,
    diskStatusEnum,
    slotInfoType,
} from 'src/reducer/uploadServer/type'
import { TProps, useT } from 'src/hooks/language'
import { langType } from 'src/hooks/language/package/type'
import UploadRecordsList from 'src/module/uploadServer/detail/listView/uploadRecordsList'
import Grid from 'src/component/grid'
import { GridValueGetterParams } from '@mui/x-data-grid'
import TooltipField from 'src/component/grid/tooltipField'

function LinearProgressWithLabel(props: any) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    )
}

export const getCommonColumnsConfig = (
    theme: Theme,
    t: TProps,
    paramsPath: string[]
) => {
    return {
        mountStatus: {
            field: 'mountStatus',
            headerName: t('mountStatus'),
            width: 110,
            description: '',
            sortable: true,
            type: 'singleSelect',
            valueOptions: [t('mounted'), t('unmount')],
            valueGetter: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType

                return data
                    ? data.isMounted
                        ? t('mounted')
                        : t('unmount')
                    : '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType
                return data ? (
                    <Box
                        sx={{
                            color: data.isMounted
                                ? theme.palette.success.dark
                                : theme.palette.error.dark,
                        }}
                    >
                        {data.isMounted ? t('mounted') : t('unmount')}
                    </Box>
                ) : (
                    '-'
                )
            },
        },

        diskStatus: {
            field: 'diskStatus',
            headerName: t('diskStatus'),
            width: 140,
            type: 'singleSelect',
            valueOptions: [
                t('invalid'),
                t('waitingToUpload'),
                t('uploading'),
                t('uploadFailed'),
                t('uploaded'),
                t('finish'),
                t('abnormalPairing'),
            ],
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                const diskInfo = path(paramsPath)(params) as diskInfoType

                if (diskInfo && diskInfo.diskStatus) {
                    const diskStatus = diskInfo.diskStatus
                    return t(
                        DiskStatusConfig[diskStatus || diskStatusEnum.NULL]
                            .name as keyof langType
                    )
                }
                return '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const diskInfo = path(paramsPath)(params) as diskInfoType

                if (diskInfo && diskInfo.diskStatus) {
                    const diskStatus = diskInfo.diskStatus
                    const colorPath = DiskStatusConfig[diskStatus].color

                    return (
                        <Box
                            sx={{
                                color: diskInfo
                                    ? `${path(colorPath)(theme)}`
                                    : 'inherit',
                            }}
                        >
                            <Tooltip
                                title={`${t('statusUpdateTime')}: ${
                                    diskInfo?.updateTimeStr || '-'
                                }`}
                            >
                                <Box>
                                    {t(
                                        DiskStatusConfig[
                                            diskStatus || diskStatusEnum.NULL
                                        ].name as keyof langType
                                    )}
                                </Box>
                            </Tooltip>
                        </Box>
                    )
                } else {
                    return '-'
                }
            },
        },

        uploadProgress: {
            field: 'uploadProgress',
            headerName: t('uploadProgress'),
            width: 180,
            type: 'number',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType
                console.log(data?.uploadFinishedRate)

                return data?.uploadFinishedRate || '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType
                return data?.allRecords?.length ? (
                    <UploadRecordsList
                        waitingRecords={data.waitingRecords}
                        uploadingRecords={data.uploadingRecords}
                        finishedRecords={data.finishedRecords}
                        failedRecords={data.failedRecords}
                    >
                        <Box
                            sx={{
                                width: 150,
                            }}
                        >
                            <LinearProgressWithLabel
                                value={data.uploadFinishedRate}
                            />
                        </Box>
                    </UploadRecordsList>
                ) : (
                    '-'
                )
            },
        },

        operationTips: {
            field: 'operationTips',
            headerName: t('operationTips'),
            width: 260,
            type: 'string',
            sortable: true,
            description: t('noteMountStatus'),
            valueGetter: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType
                return data?.tips || '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType
                const tips = data?.tips
                debugger
                if (tips?.length) {
                    return (
                        <TooltipField title={tips}>
                            <Box
                                sx={{
                                    color: theme.palette.primary.dark,
                                }}
                            >
                                {tips}
                            </Box>
                        </TooltipField>
                    )
                }

                return '-'
            },
        },

        timeConsuming: {
            field: 'timeConsuming',
            headerName: `${t('timeConsuming')}(h)`,
            width: 180,
            type: 'number',
            sortable: true,
            renderCell: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType

                return (
                    <Box sx={{ width: 100 }}>
                        {data && data.timeConsuming?.length ? (
                            <Tooltip
                                arrow
                                placement="right"
                                title={
                                    <Box>
                                        <Box>
                                            {t('startUploadTime')}：
                                            {data.startUploadTime || '-'}
                                        </Box>
                                        <Box>
                                            {t('endUploadTime')}：
                                            {data.endUploadTime || '-'}
                                        </Box>
                                    </Box>
                                }
                            >
                                <Box sx={{ display: 'inline-block' }}>
                                    {`${data.timeConsuming}h`}
                                </Box>
                            </Tooltip>
                        ) : (
                            '-'
                        )}
                    </Box>
                )
            },
        },
    }
}

const ListView = ({ data }: ViewPayloadType) => {
    const theme = useTheme()
    const t = useT()

    const commonColumnsConfig = getCommonColumnsConfig(theme, t, [
        'row',
        'diskInfo',
    ])

    const columns = [
        {
            field: 'slotId',
            headerName: 'ID',
            width: 100,
            type: 'string',
            sortable: true,
        },
        {
            field: 'slotBusId',
            headerName: t('slotName'),
            width: 180,
            type: 'string',
            sortable: true,
        },
        {
            field: 'diskId',
            headerName: `${t('disk')} ID`,
            width: 220,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo?.diskId || '-'
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.diskInfo?.diskId ? (
                    <Link
                        to={'/disk'}
                        style={{
                            color: theme.palette.primary.dark,
                        }}
                    >
                        {params.row.diskInfo?.diskId}
                    </Link>
                ) : (
                    '-'
                ),
        },
        {
            field: 'diskName',
            headerName: t('diskName'),
            width: 180,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo?.diskName || '-'
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.diskInfo?.diskName || '-',
        },
        {
            field: 'diskPlugTime',
            headerName: t('diskPlugTime'),
            width: 180,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo?.diskPlugTime || '-'
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.diskInfo?.diskPlugTime || '-',
        },

        commonColumnsConfig.mountStatus,
        commonColumnsConfig.diskStatus,
        commonColumnsConfig.uploadProgress,

        {
            field: 'mountPoint',
            headerName: t('mountPoint'),
            width: 260,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo?.mountPoint || '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const point = params.row.diskInfo?.mountPoint || '-'

                return <TooltipField title={point}>{point}</TooltipField>
            },
        },

        commonColumnsConfig.timeConsuming,

        {
            field: 'vehicleInfo',
            headerName: t('vehicleInfo'),
            width: 260,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                const info = params.row.diskInfo?.vehicleIds.length
                    ? params.row.diskInfo?.vehicleIds.join(', ')
                    : '-'
                return info
            },
            renderCell: (params: GridValueGetterParams) => {
                const info = params.row.diskInfo?.vehicleIds.length
                    ? params.row.diskInfo?.vehicleIds.join(', ')
                    : '-'

                return <TooltipField title={info}>{info}</TooltipField>
            },
        },

        commonColumnsConfig.operationTips,
    ]

    const transData = map((row: slotInfoType) => {
        return {
            id: row.slotId,
            ...row,
        }
    })

    return (
        <Box
            style={{
                width: '100%',
            }}
        >
            <Grid
                rows={transData(data)}
                columns={columns}
                quickFilter={true}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'slotId', sort: 'asc' }],
                    },
                }}
            />
        </Box>
    )
}

export default ListView
