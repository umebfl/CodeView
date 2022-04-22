import React, { FC } from 'react'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { map } from 'ramda'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GridCellValue, GridValueGetterParams } from '@mui/x-data-grid'
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity'

import { RootState, Dispatch } from 'src/reducer/type'
import Breadcrumbs from 'src/component/breadcrumbs'
import { uploadServerType } from 'src/reducer/uploadServer/type'
import { useT } from 'src/hooks/language'
import { langType } from 'src/hooks/language/package/type'
import Grid from 'src/component/grid'

const UploadServerList: FC = () => {
    const theme = useTheme()
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const userConfig = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()
    const t = useT()

    const columns = [
        {
            field: 'seq',
            headerName: t('S/N'),
            width: 100,
            type: 'string',
            sortable: true,
        },
        {
            field: 'uploadServerId',
            headerName: 'ID',
            width: 240,
            type: 'string',
            sortable: true,
            sortComparator: (v1: GridCellValue, v2: GridCellValue) =>
                (v1 as string)?.length - (v2 as string)?.length,
            renderCell: (params: GridValueGetterParams) => (
                <Box
                    sx={{
                        overflow: 'hidden',
                    }}
                >
                    <Link
                        to={
                            params.row.isRunning
                                ? `detail/${params.row.uploadServerId}`
                                : ''
                        }
                        style={{
                            textDecoration: 'none',
                            color: params.row.isRunning
                                ? theme.palette.primary.dark
                                : theme.color.grey15,
                        }}
                    >
                        {params.row.uploadServerId}
                    </Link>
                </Box>
            ),
        },
        {
            field: 'isRunningStr',
            headerName: t('runStatus'),
            flex: 1,
            minWidth: 100,
            type: 'singleSelect',
            valueOptions: [t('running'), t('close')],
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return t(params.row.isRunningStr as keyof langType)
            },
            renderCell: (params: GridValueGetterParams) => (
                <Box
                    sx={{
                        color: params.row.isRunning
                            ? theme.palette.success.dark
                            : theme.palette.error.dark,
                    }}
                >
                    {t(params.row.isRunningStr as keyof langType)}
                </Box>
            ),
        },

        {
            field: 'removable_slots_sequence_nums',
            headerName: t('slotsSequenceOfRemovable'),
            flex: 1,
            minWidth: 100,
            type: 'string',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.removable_slots_sequence_nums?.join(', ')
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.removable_slots_sequence_nums?.join(', ') || '-',
        },

        {
            field: 'completed',
            headerName: t('completed'),
            flex: 1,
            minWidth: 100,
            type: 'number',
            sortable: true,
            description: `${t('completed')} / ${t('totalDisk')}`,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.formattedDisksNum
            },
            renderCell: (params: GridValueGetterParams) => {
                const runNum =
                    params.row.totalSlotsNum - params.row.emptySlotsNum

                return (
                    <Box
                        sx={{
                            color:
                                params.row.isRunning &&
                                params.row.formattedDisksNum > 0 &&
                                params.row.formattedDisksNum === runNum
                                    ? theme.palette.success.dark
                                    : 'inherit',
                        }}
                    >
                        {params.row.isRunning
                            ? `${params.row.formattedDisksNum} / ${runNum}`
                            : '-'}
                    </Box>
                )
            },
        },
        // {
        //     field: 'used',
        //     headerName: t('runningSlots'),
        //     flex: 1,
        //     minWidth: 100,
        //     type: 'number',
        //     sortable: true,
        //     valueGetter: (params: GridValueGetterParams) => {
        //         return `${params.row.totalSlotsNum - params.row.emptySlotsNum}`
        //     },
        //     renderCell: (params: GridValueGetterParams) =>
        //         params.row.isRunning
        //             ? `${params.row.totalSlotsNum - params.row.emptySlotsNum}`
        //             : '-',
        // },
        {
            field: 'emptySlotsNum',
            headerName: t('emptySlots'),
            flex: 1,
            minWidth: 100,
            type: 'number',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.emptySlotsNum}`
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.isRunning ? params.row.emptySlotsNum : '-',
        },
        {
            field: 'totalOfSlots',
            headerName: t('totalOfSlots'),
            flex: 1,
            minWidth: 100,
            type: 'number',
            sortable: true,
            description: '',
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.totalSlotsNum}`
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.isRunning ? params.row.totalSlotsNum : '-',
        },
        {
            field: 'uploadServerLocation',
            headerName: t('position'),
            flex: 1,
            minWidth: 100,
            type: 'string',
            sortable: true,
        },
        // {
        //     field: 'operationTips',
        //     headerName: t('operationTips'),
        //     width: 180,
        //     type: 'string',
        //     sortable: true,
        // },
    ]

    const transData = map((row: uploadServerType) => {
        return {
            id: row.uploadServerId,
            ...row,
        }
    })

    const saveGridConfig = (config: GridInitialStateCommunity) => {
        console.log(config)
        dispatch.userConfig.set({
            uploadServer_listConfig: {
                ...userConfig.uploadServer_listConfig,
                ...config,
            },
        })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Breadcrumbs
                allowBack={false}
                handleRefresh={dispatch.uploadServer.initData}
                data={[
                    {
                        name: 'Upload Server',
                        link: '/up',
                    },
                ]}
                desc={t('list')}
            ></Breadcrumbs>

            <Grid
                rows={transData(data)}
                saveGridConfig={saveGridConfig}
                columns={columns}
                quickFilter={true}
                initialState={userConfig.uploadServer_listConfig}
            />
        </Box>
    )
}

export default UploadServerList
