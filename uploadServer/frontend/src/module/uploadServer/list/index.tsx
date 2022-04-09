import React, { FC } from 'react'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { map } from 'ramda'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrumbs from 'src/component/breadcrumbs'
import { RootState, Dispatch } from 'src/reducer/type'
import { uploadServerType } from 'src/reducer/uploadServer/type'
import { useT } from 'src/hooks/language'
import { langType } from 'src/hooks/language/package/type'
import Grid from 'src/component/grid'
import { GridValueGetterParams } from '@mui/x-data-grid'

const UploadServerList: FC = () => {
    const theme = useTheme()
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const dispatch = useDispatch<Dispatch>()
    const t = useT()

    const columns = [
        {
            field: 'uploadServerId',
            headerName: 'ID',
            width: 180,
            type: 'string',
            sortable: true,
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
                            color: theme.palette.primary.dark,
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
            width: 180,
            type: 'string',
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
            field: 'uploadServerLocation',
            headerName: t('position'),
            width: 180,
            type: 'string',
            sortable: true,
        },
        {
            field: 'totalOfSlots',
            headerName: t('totalOfSlots'),
            width: 180,
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
            field: 'completed',
            headerName: t('completed'),
            width: 180,
            type: 'number',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.formattedDisksNum
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.isRunning ? params.row.formattedDisksNum : '-',
        },
        {
            field: 'used',
            headerName: '使用中插槽数',
            width: 180,
            type: 'number',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.totalSlotsNum - params.row.emptySlotsNum}`
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.isRunning
                    ? `${params.row.totalSlotsNum - params.row.emptySlotsNum}`
                    : '-',
        },
        {
            field: 'emptySlotsNum',
            headerName: t('emptySlots'),
            width: 180,
            type: 'number',
            sortable: true,
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.emptySlotsNum}`
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.isRunning ? params.row.emptySlotsNum : '-',
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
                columns={columns}
                quickFilter={true}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'uploadServerId', sort: 'asc' }],
                    },
                }}
            />
        </Box>
    )
}

export default UploadServerList
