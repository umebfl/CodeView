import React from 'react'

import { Box, LinearProgress, Tooltip, Typography } from '@mui/material'
import { map, path } from 'ramda'
import useTheme from '@mui/system/useTheme'
import { Link } from 'react-router-dom'

import { ViewPayloadType } from 'src/module/uploadServer/detail/type'
import {
    diskInfoType,
    DiskStatusConfig,
    diskStatusEnum,
    slotInfoType,
} from 'src/reducer/uploadServer/type'
import { useT } from 'src/hooks/language'
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

const ListView = ({ data }: ViewPayloadType) => {
    const theme = useTheme()
    const t = useT()

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
        {
            field: 'mountStatus',
            headerName: t('mountStatus'),
            width: 140,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo
                    ? params.row.diskInfo?.isMounted
                        ? t('mounted')
                        : t('unmount')
                    : '-'
            },
            renderCell: (params: GridValueGetterParams) => (
                <Box
                    sx={{
                        color: params.row.diskInfo
                            ? params.row.diskInfo?.isMounted
                                ? theme.palette.success.dark
                                : theme.palette.error.dark
                            : 'inherit',
                    }}
                >
                    {params.row.diskInfo
                        ? params.row.diskInfo?.isMounted
                            ? t('mounted')
                            : t('unmount')
                        : '-'}
                </Box>
            ),
        },
        {
            field: 'diskStatus',
            headerName: t('diskStatus'),
            width: 140,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                const diskInfo = params.row.diskInfo as diskInfoType

                if (diskInfo && diskInfo.diskStatus) {
                    const diskStatus = diskInfo.diskStatus
                    const colorPath = DiskStatusConfig[diskStatus].color
                    return t(
                        DiskStatusConfig[diskStatus || diskStatusEnum.NULL]
                            .name as keyof langType
                    )
                }
                return '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const diskInfo = params.row.diskInfo as diskInfoType

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
        {
            field: 'uploadProgress',
            headerName: t('uploadProgress'),
            width: 180,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo?.uploadFinishedRate || '-'
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.diskInfo?.allRecords?.length ? (
                    <UploadRecordsList
                        waitingRecords={params.row.diskInfo?.waitingRecords}
                        uploadingRecords={params.row.diskInfo?.uploadingRecords}
                        finishedRecords={params.row.diskInfo?.finishedRecords}
                        failedRecords={params.row.diskInfo?.failedRecords}
                    >
                        <Box
                            sx={{
                                width: 150,
                            }}
                        >
                            <LinearProgressWithLabel
                                value={params.row.diskInfo?.uploadFinishedRate}
                            />
                        </Box>
                    </UploadRecordsList>
                ) : (
                    '-'
                ),
        },
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
        {
            field: 'timeConsuming',
            headerName: t('timeConsuming'),
            width: 180,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo?.timeConsuming?.length
                    ? `${params.row.diskInfo?.timeConsuming}h`
                    : '-'
            },
            renderCell: (params: GridValueGetterParams) => (
                <Box sx={{ width: 100 }}>
                    <Tooltip
                        arrow
                        placement="right"
                        title={
                            <Box>
                                <Box>
                                    {t('startUploadTime')}：
                                    {params.row.diskInfo?.startUploadTime ||
                                        '-'}
                                </Box>
                                <Box>
                                    {t('endUploadTime')}：
                                    {params.row.diskInfo?.endUploadTime || '-'}
                                </Box>
                            </Box>
                        }
                    >
                        <Box sx={{ display: 'inline-block' }}>
                            {params.row.diskInfo?.timeConsuming?.length
                                ? `${params.row.diskInfo?.timeConsuming}h`
                                : '-'}
                        </Box>
                    </Tooltip>
                </Box>
            ),
        },
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
        {
            field: 'operationTips',
            headerName: t('operationTips'),
            width: 260,
            type: 'string',
            sortable: true,
            description: t('noteMountStatus'),
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo?.tips || '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const tips = params.row.diskInfo?.tips

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
