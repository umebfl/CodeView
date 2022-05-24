import { useEffect } from 'react'

import Box from '@mui/material/Box'
import { GridColDef } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'

import Grid from 'src/component/grid'
import Breadcrumbs from 'src/component/breadcrumbs'
import { useT } from 'src/hooks/language'
import { RootState, Dispatch } from 'src/reducer/type'

const PlugAndUnplugDiskRecords = () => {
    const t = useT()

    const dispatch = useDispatch<Dispatch>()
    const { data } = useSelector((state: RootState) => state.diskPAURecords)
    const handleRefresh = () => {}

    const columns: GridColDef[] = [
        {
            field: 'seq',
            headerName: t('S/N'),
            width: 100,
            type: 'string',
            sortable: true,
        },
        {
            field: '车辆',
            headerName: '车辆',
            flex: 1,
            type: 'string',
            sortable: true,
        },
        {
            field: '上传状态',
            headerName: '上传状态',
            flex: 1,
            type: 'string',
            sortable: true,
        },
        {
            field: '开始时间',
            headerName: '开始时间',
            flex: 1,
            type: 'string',
            sortable: true,
        },
        {
            field: '结束时间',
            headerName: '结束时间',
            flex: 1,
            type: 'string',
            sortable: true,
        },
        {
            field: 'Records',
            headerName: 'Records',
            flex: 1,
            type: 'string',
            sortable: true,
        },
        {
            field: '耗时',
            headerName: '耗时',
            flex: 1,
            type: 'string',
            sortable: true,
        },
    ]

    useEffect(() => {
        dispatch.diskPAURecords.initData({})
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
                        name: '磁盘ID',
                        link: '/disk/records',
                    },
                ]}
                desc={'上传日志'}
            ></Breadcrumbs>

            <Grid rows={data} columns={columns} quickFilter={true} />
        </Box>
    )
}

export default PlugAndUnplugDiskRecords
