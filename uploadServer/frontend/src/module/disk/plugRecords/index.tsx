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
            minWidth: 100,
            type: 'string',
            sortable: true,
        },
        {
            field: 'diskID',
            headerName: `${t('disk')} ID`,
            minWidth: 200,
            type: 'string',
            sortable: true,
        },
        {
            field: 'targetType',
            headerName: t('targetType'),
            flex: 1,
            minWidth: 100,
            type: 'string',
            sortable: true,
        },
        {
            field: 'targetID',
            headerName: `${t('target')} ID`,
            flex: 1,
            minWidth: 200,
            type: 'string',
            sortable: true,
        },
        {
            field: 'plugTime',
            headerName: t('diskPlugTime'),
            flex: 1,
            type: 'string',
            sortable: true,
        },
        {
            field: 'unplugTime',
            headerName: t('diskUnPlugTime'),
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
                        name: t('plugAndUnplugDiskRecords'),
                        link: '/disk/records',
                    },
                ]}
                desc={t('list')}
            ></Breadcrumbs>

            <Grid rows={data} columns={columns} quickFilter={true} />
        </Box>
    )
}

export default PlugAndUnplugDiskRecords
