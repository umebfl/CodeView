import React from 'react'

import { Box, LinearProgress, Tooltip, Typography } from '@mui/material'
import { isNil, map, path } from 'ramda'
import useTheme from '@mui/system/useTheme'
import { Link } from 'react-router-dom'
import { Theme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity'
import { GridValueGetterParams } from '@mui/x-data-grid'

import { RootState, Dispatch } from 'src/reducer/type'
import { ViewPayloadType } from 'src/module/uploadServer/detail/type'
import {
    diskInfoType,
    UploadStatusConfig,
    uploadStatusEnum,
    slotInfoType,
} from 'src/reducer/uploadServer/type'
import { TProps, useT } from 'src/hooks/language'
import { langType } from 'src/hooks/language/package/type'
import UploadRecordsList from 'src/module/uploadServer/detail/listView/uploadRecordsList'
import Grid from 'src/component/grid'
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

                return data && !isNil(data.isMounted) ? (
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

        uploadStatus: {
            field: 'uploadStatus',
            headerName: t('uploadStatus'),
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

                if (diskInfo && diskInfo.uploadStatus) {
                    const uploadStatus = diskInfo.uploadStatus
                    return t(
                        UploadStatusConfig[
                            uploadStatus || uploadStatusEnum.NULL
                        ].name as keyof langType
                    )
                }
                return '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const diskInfo = path(paramsPath)(params) as diskInfoType

                if (diskInfo && diskInfo.uploadStatus) {
                    const uploadStatus = diskInfo.uploadStatus
                    const colorPath = UploadStatusConfig[uploadStatus].color

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
                                        UploadStatusConfig[
                                            uploadStatus ||
                                                uploadStatusEnum.NULL
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
            flex: 1,
            minWidth: 180,
            type: 'number',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType
                return data?.allRecords?.length
                    ? data?.uploadFinishedRate || 0
                    : 0
            },
            renderCell: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType
                return data?.allRecords?.length ? (
                    <UploadRecordsList
                        waitingRecords={data.waitingRecords || []}
                        uploadingRecords={data.uploadingRecords || []}
                        finishedRecords={data.finishedRecords || []}
                        failedRecords={data.failedRecords || []}
                    >
                        <Box
                            sx={{
                                width: 220,
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
            flex: 1,
            minWidth: 260,
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

                if (tips?.length) {
                    return (
                        <TooltipField
                            title={tips}
                            sx={{
                                color: theme.palette.primary.dark,
                            }}
                        >
                            {tips}
                        </TooltipField>
                    )
                }

                return '-'
            },
        },

        timeConsuming: {
            field: 'timeConsuming',
            headerName: `${t('timeConsuming')}(h)`,
            flex: 1,
            minWidth: 100,
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

        vehicleIds: {
            field: 'vehicleIds',
            headerName: t('vehicle'),
            flex: 1,
            minWidth: 150,
            description: '',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType
                return data?.vehicleIds?.length
                    ? data.vehicleIds.join(', ')
                    : '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const data = path(paramsPath)(params) as diskInfoType
                const vehicleIds = data?.vehicleIds?.join(', ')

                if (vehicleIds) {
                    return (
                        <TooltipField title={vehicleIds}>
                            {vehicleIds}
                        </TooltipField>
                    )
                }

                return '-'
            },
        },
    }
}

const ListView = ({ data }: ViewPayloadType) => {
    const theme = useTheme()
    const t = useT()
    const userConfig = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()

    const commonColumnsConfig = getCommonColumnsConfig(theme, t, [
        'row',
        'diskInfo',
    ])

    const columns = [
        {
            field: 'seq',
            headerName: t('S/N'),
            width: 100,
            type: 'string',
            sortable: true,
        },
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
            width: 150,
            type: 'string',
            sortable: true,
        },
        {
            field: 'diskId',
            headerName: `${t('disk')} ID`,
            flex: 1,
            minWidth: 260,
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
                            width: '100%',
                            color: theme.palette.primary.dark,
                        }}
                    >
                        <TooltipField title={params.row.diskInfo?.diskId}>
                            {params.row.diskInfo?.diskId}
                        </TooltipField>
                    </Link>
                ) : (
                    '-'
                ),
        },
        {
            field: 'diskName',
            headerName: t('diskName'),
            flex: 1,
            minWidth: 150,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo?.diskName || '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const name = params.row.diskInfo?.diskName || '-'
                return <TooltipField title={name}>{name}</TooltipField>
            },
        },
        {
            field: 'diskPlugTime',
            headerName: t('diskPlugTime'),
            width: 170,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskInfo?.diskPlugTime || '-'
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.diskInfo?.diskPlugTime || '-',
        },

        commonColumnsConfig.mountStatus,
        commonColumnsConfig.uploadStatus,
        commonColumnsConfig.uploadProgress,

        {
            field: 'mountPoint',
            headerName: t('mountPoint'),
            flex: 1,
            minWidth: 200,
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
        commonColumnsConfig.vehicleIds,

        commonColumnsConfig.operationTips,
    ]

    const transData = map((row: slotInfoType) => {
        return {
            id: row.slotId,
            ...row,
        }
    })

    const saveGridConfig = (config: GridInitialStateCommunity) => {
        dispatch.userConfig.set({
            uploadServer_detailListConfig: {
                ...userConfig.uploadServer_detailListConfig,
                ...config,
            },
        })
    }

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
                saveGridConfig={saveGridConfig}
                initialState={userConfig.uploadServer_detailListConfig}
            />
        </Box>
    )
}

export default ListView
