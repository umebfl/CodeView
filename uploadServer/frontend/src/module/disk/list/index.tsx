/** No need unit test */
import React from 'react'
import { filter, find, map, reduce } from 'ramda'

import Box from '@mui/material/Box'
import {
    getGridSingleSelectOperators,
    GridCellParams,
    GridCellValue,
    GridColDef,
    GridColumnHeaderParams,
    GridPreProcessEditCellProps,
    GridRenderEditCellParams,
    GridValueGetterParams,
    useGridApiContext,
} from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import useTheme from '@mui/system/useTheme'
import { useDispatch, useSelector } from 'react-redux'
import EditOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Select from '@mui/material/Select'

import { RootState, Dispatch } from 'src/reducer/type'
import Breadcrumbs from 'src/component/breadcrumbs'
import { TProps, useT } from 'src/hooks/language'
import Grid from 'src/component/grid'
import TooltipField from 'src/component/grid/tooltipField'
import {
    slotInfoType,
    uploadServerType,
    diskInfoType,
} from 'src/reducer/uploadServer/type'
import { getCommonColumnsConfig } from 'src/module/uploadServer/detail/listView'
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity'
import {
    DiskInventoryStatusType,
    DiskOwnerType,
    DiskType,
} from 'src/reducer/disk/type'
import { langType } from 'src/hooks/language/package/type'

const getMergeData = (allDisk: any, onServerDisk: any) => {
    let idx = 0

    return map((diskInfo: any) => {
        const matchDisk = find((disk: any) => {
            return disk.diskId === diskInfo.diskId
        }, onServerDisk)

        idx++

        if (matchDisk) {
            return {
                ...matchDisk,
                ...diskInfo,
            }
        }
        return {
            ...diskInfo,
            seq: idx,
        }
    })(allDisk)
}

const transformDiskData = (data: uploadServerType[], t: TProps) => {
    let idx = 1

    return reduce((list: any[], item: uploadServerType) => {
        const diskList = map((slot: slotInfoType) => {
            return slot.diskInfo
        })(item.slotInfos)

        const filterData = filter((disk: diskInfoType | undefined) => {
            return !!disk
        })(diskList) as diskInfoType[]

        const idList = map((disk: diskInfoType) => {
            return {
                ...disk,
                seq: idx++,
                id: idx,
                diskId: disk.diskId,
                serverID: item.uploadServerId,
                inventoryStatus: 'normal',
            }
        })(filterData)

        return [...list, ...idList]
    }, [])(data)
}

const SelectEditInputCell = (props: any) => {
    const { id, value, field, options } = props
    const apiRef = useGridApiContext()

    const handleChange = async (event: any) => {
        await apiRef.current.setEditCellValue({
            id,
            field,
            value: parseInt(event.target.value),
        })
        apiRef.current.stopCellEditMode({ id, field })
    }

    return (
        <Select
            key={id}
            value={value}
            onChange={handleChange}
            size="small"
            sx={{ height: 1, width: '100%' }}
            native
            autoFocus
        >
            {map(option => {
                return (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                )
            }, options)}
        </Select>
    )
}

const SelecterFilter = (props: any) => {
    const t = useT()
    const { item, applyValue, options, focusElementRef } = props

    const ratingRef = React.useRef(null)

    const handleFilterChange = (e: any) => {
        applyValue({ ...item, value: parseInt(e.target.value) })
    }

    return (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                pl: '20px',
            }}
        >
            <Select
                ref={ratingRef}
                name="custom-select-filter-operator"
                value={item.value}
                onChange={e => handleFilterChange(e)}
                size="small"
                sx={{ height: 1, width: '100%' }}
                native
                autoFocus
            >
                {map((option: { value: number; label: string }) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    )
                }, options)}
            </Select>
        </Box>
    )
}

const DiskList = () => {
    const theme = useTheme()
    const t = useT()
    const commonColumnsConfig = getCommonColumnsConfig(theme, t, ['row'])

    const diskData = useSelector((state: RootState) => state.disk)
    const uploadServerData = useSelector(
        (state: RootState) => state.uploadServer
    )
    const userConfig = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()
    const navigate = useNavigate()

    const transData = transformDiskData(uploadServerData.data, t)
    const mergeData = getMergeData(diskData.data, transData)

    const handleRefresh = () => {}

    const OwnerSelectOptions = [
        { label: t('nanShan'), value: DiskOwnerType.NANSHAN },
        { label: t('pinShan'), value: DiskOwnerType.PINGSHAN },
        { label: t('unknown'), value: DiskOwnerType.UNKNOWN },
    ]

    const InventoryStatusSelectOptions = [
        { label: t('normal'), value: DiskInventoryStatusType.NORMAL },
        { label: t('lost'), value: DiskInventoryStatusType.LOST },
        { label: t('damaged'), value: DiskInventoryStatusType.DAMAGED },
    ]

    const OwnerSelecterFilter = (props: any) => (
        <SelecterFilter {...props} options={OwnerSelectOptions} />
    )
    const InventoryStatusSelecterFilter = (props: any) => (
        <SelecterFilter {...props} options={InventoryStatusSelectOptions} />
    )

    const handleUploadLogClick = async (diskId: string) => {
        // 获取数据
        // 执行跳转
        await dispatch.disk.getUploadRecords(diskId)

        navigate('/disk/uploadLog')
    }

    const columns: GridColDef[] = [
        {
            field: 'seq',
            headerName: t('S/N'),
            width: 100,
            type: 'number',
            sortable: true,
        },

        {
            field: 'serverID',
            headerName: `${t('server')}ID`,
            width: 180,
            description: '',
            sortable: true,
            sortComparator: (v1: GridCellValue, v2: GridCellValue) =>
                (v1 as string)?.length - (v2 as string)?.length,
            renderCell: (params: GridValueGetterParams) => {
                if (params.row.serverID) {
                    return (
                        <Link
                            to={`/up/detail/${params.row.serverID}`}
                            style={{
                                color: theme.palette.primary.dark,
                            }}
                        >
                            {params.row.serverID}
                        </Link>
                    )
                }
                return '-'
            },
            // valueGetter: (params: GridValueGetterParams) =>
            //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'disk_id',
            headerName: `${t('disk')}ID`,
            flex: 1,
            minWidth: 260,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskId || '-'
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.diskId ? (
                    <TooltipField title={params.row.diskId}>
                        {params.row.diskId}
                    </TooltipField>
                ) : (
                    '-'
                ),
        },
        {
            field: 'diskName',
            headerName: t('diskName'),
            width: 150,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskName || '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                return params.row.diskName || '-'
            },
        },
        {
            field: 'identified',
            headerName: t('identified'),
            width: 110,
            type: 'singleSelect',
            valueOptions: ['T', 'F'],
            valueGetter: (params: GridValueGetterParams) => {
                const val = params.row.identified
                const text = val === true ? 'T' : val === false ? 'F' : '-'
                return text
            },
            renderCell: (params: GridValueGetterParams) => {
                const val = params.row.identified
                const text = val === true ? 'T' : val === false ? 'F' : '-'

                return (
                    <div
                        style={{
                            color:
                                val === true
                                    ? theme.palette.success.dark
                                    : val === false
                                    ? theme.palette.error.dark
                                    : 'inherit',
                        }}
                    >
                        {text}
                    </div>
                )
            },
        },

        {
            field: 'inventoryStatus',
            headerName: t('inventoryStatus'),
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box>
                    {t('inventoryStatus')}
                    <EditOutlinedIcon
                        sx={{
                            // display: 'none',
                            marginLeft: 1,
                            fontSize: 12,
                            color: theme.palette.grey[600],
                        }}
                    />
                </Box>
            ),
            width: 130,
            description: t('doubleClickToEdit'),
            sortable: true,
            editable: true,
            // type: 'singleSelect',
            // valueOptions: [t('normal'), t('lost'), t('damaged')],
            // valueGetter: (params: GridValueGetterParams) => {
            //     const val = params.row.inventoryStatus

            //     const text =
            //         val === DiskInventoryStatusType.NORMAL
            //             ? t('normal')
            //             : val === DiskInventoryStatusType.LOST
            //             ? t('lost')
            //             : t('damaged')

            //     return text
            // },
            // preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            //     const text = params.props.value
            //     const inventoryStatus: DiskInventoryStatusType =
            //         text === t('normal')
            //             ? DiskInventoryStatusType.NORMAL
            //             : text === t('lost')
            //             ? DiskInventoryStatusType.LOST
            //             : DiskInventoryStatusType.DAMAGED

            //     console.log(
            //         'preProcessEditCellProps',
            //         params.row,
            //         inventoryStatus,
            //         text
            //     )

            //     return {
            //         value: inventoryStatus,
            //     }
            // },
            // valueParser: (
            //     value: GridCellValue,
            //     params: GridCellParams<any, any, any> | undefined
            // ) => {
            //     const inventoryStatus: DiskInventoryStatusType =
            //         value === t('normal')
            //             ? DiskInventoryStatusType.NORMAL
            //             : value === t('lost')
            //             ? DiskInventoryStatusType.LOST
            //             : DiskInventoryStatusType.DAMAGED

            //     return inventoryStatus
            // },
            filterOperators: getGridSingleSelectOperators().map(
                (operator: any) => ({
                    ...operator,
                    InputComponent: InventoryStatusSelecterFilter,
                })
            ),
            renderEditCell: props => (
                <SelectEditInputCell
                    {...props}
                    options={InventoryStatusSelectOptions}
                />
            ),
            renderCell: (params: GridValueGetterParams) => {
                const val = params.row.inventoryStatus

                const text =
                    val === DiskInventoryStatusType.NORMAL
                        ? t('normal')
                        : val === DiskInventoryStatusType.LOST
                        ? t('lost')
                        : t('damaged')

                return (
                    <Box
                        sx={{
                            color:
                                params.row.inventoryStatus ===
                                DiskInventoryStatusType.NORMAL
                                    ? theme.palette.primary.dark
                                    : theme.palette.error.dark,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            flex: 1,
                            cursor: 'text',
                            alignItems: 'center',
                            '& :hover': {
                                '&.MuiSvgIcon-root': {
                                    display: 'inline-block',
                                },
                            },
                        }}
                    >
                        {t(text as keyof langType)}
                    </Box>
                )
            },
        },

        {
            field: 'owner',
            headerName: t('owner'),
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    sx={{
                        width: 120,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {t('owner')}
                    <EditOutlinedIcon
                        sx={{
                            marginLeft: 1,
                            fontSize: 12,
                            color: theme.palette.grey[600],
                        }}
                    />
                </Box>
            ),
            width: 120,
            description: '',
            editable: true,
            sortable: true,
            // type: 'singleSelect',
            // valueOptions: [t('nanShan'), t('pinShan'), t('unknown')],

            filterOperators: getGridSingleSelectOperators().map(
                (operator: any) => ({
                    ...operator,
                    InputComponent: OwnerSelecterFilter,
                })
            ),
            renderEditCell: props => (
                <SelectEditInputCell {...props} options={OwnerSelectOptions} />
            ),
            // valueGetter: (params: GridValueGetterParams) => {
            //     const owner = params.row.owner

            //     const text =
            //         owner === DiskOwnerType.NANSHAN
            //             ? t('nanShan')
            //             : owner === DiskOwnerType.PINGSHAN
            //             ? t('pinShan')
            //             : t('unknown')

            //     return text
            // },
            // valueParser: (
            //     value: GridCellValue,
            //     params: GridCellParams<any, any, any> | undefined
            // ) => {
            //     const ownerVal =
            //         value === t('nanShan')
            //             ? DiskOwnerType.NANSHAN
            //             : value === t('pinShan')
            //             ? DiskOwnerType.PINGSHAN
            //             : DiskOwnerType.UNKNOWN

            //     return ownerVal
            // },
            renderCell: (params: GridValueGetterParams) => {
                const owner = params.row.owner

                const text =
                    owner === DiskOwnerType.NANSHAN
                        ? t('nanShan')
                        : owner === DiskOwnerType.PINGSHAN
                        ? t('pinShan')
                        : t('unknown')

                return text || '-'
            },
        },

        commonColumnsConfig.mountStatus,

        {
            field: 'updateTimeStr',
            headerName: t('lastUpdatedTime'),
            width: 180,
            description: '',
            sortable: true,
            type: 'date',
            renderCell: (params: GridValueGetterParams) => {
                return params.row.updateTimeStr || '-'
            },
        },
        {
            field: 'slotId',
            headerName: `${t('slot')}ID`,
            width: 90,
            description: '',
            sortable: true,
            renderCell: (params: GridValueGetterParams) => {
                return params.row.slotId || '-'
            },
        },

        commonColumnsConfig.diskStatus,
        commonColumnsConfig.uploadProgress,

        {
            field: 'mountPoint',
            headerName: t('mountPoint'),
            flex: 1,
            minWidth: 160,
            description: '',
            sortable: true,
            renderCell: (params: GridValueGetterParams) => {
                const mountPoint = params.row.mountPoint
                if (mountPoint) {
                    return (
                        <TooltipField title={params.row.mountPoint}>
                            {mountPoint}
                        </TooltipField>
                    )
                }

                return '-'
            },
        },

        commonColumnsConfig.timeConsuming,
        commonColumnsConfig.vehicleIds,

        {
            field: 'comment',
            headerName: t('comment'),
            width: 220,
            description: '',
            editable: true,
            sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    sx={{
                        width: 220,
                        display: 'flex',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {t('comment')}
                    <EditOutlinedIcon
                        sx={{
                            // display: 'none',
                            // width: 50,
                            marginLeft: 1,
                            fontSize: 12,
                            color: theme.palette.grey[600],
                        }}
                    />
                </Box>
            ),
            renderCell: (params: GridValueGetterParams) => {
                const comment = params.row.comment
                if (comment) {
                    return (
                        <TooltipField title={comment}>{comment}</TooltipField>
                    )
                }

                return '-'
            },
        },

        commonColumnsConfig.operationTips,

        {
            field: 'operation',
            headerName: 'operation',
            width: 140,
            renderCell: (params: GridValueGetterParams) => {
                return (
                    // <Link
                    //     to={'/disk/uploadLog'}
                    //     style={{ textDecoration: 'none' }}
                    // >
                    <Button
                        color="primary"
                        size="small"
                        onClick={() => handleUploadLogClick(params.row.diskId)}
                    >
                        上传日志
                    </Button>
                    // </Link>
                )
            },
        },
    ]

    const saveGridConfig = (config: GridInitialStateCommunity) => {
        dispatch.userConfig.set({
            disk_listConfig: {
                ...userConfig.disk_listConfig,
                ...config,
            },
        })
    }

    const processRowUpdate = React.useCallback(
        async (newRow: DiskType) => {
            const { owner, inventoryStatus, comment } = newRow
            console.log(owner, inventoryStatus, comment)

            await dispatch.disk.changeDiskInfo({
                newRow,
                params: {
                    disk_sn: newRow.diskId,
                    owner,
                    on_server: newRow.onServer,
                    status: inventoryStatus,
                    comment,
                },
            })

            dispatch.snackbar.push({
                timeStamp: new Date().getTime(),
                severity: 'success',
                msg: t('savedSuccessfully'),
            })

            return newRow
        },
        [mergeData]
    )

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
                handleRefresh={handleRefresh}
                data={[
                    {
                        name: 'Disk',
                        link: '/disk',
                    },
                ]}
                desc={t('list')}
            ></Breadcrumbs>

            <Grid
                rows={mergeData}
                columns={columns}
                quickFilter={true}
                // toolbarRight={() => (
                //     <Link to={'/disk/plugRecords'}>
                //         <Button
                //             sx={{
                //                 color: 'white',
                //                 background: 'rgb(52, 52, 52)',
                //                 paddingLeft: 2,
                //                 paddingRight: 2,
                //             }}
                //             color="primary"
                //         >
                //             {t('plugAndUnplugDiskRecords')}
                //         </Button>
                //     </Link>
                // )}
                saveGridConfig={saveGridConfig}
                initialState={userConfig.disk_listConfig}
                dataGridProps={{
                    processRowUpdate: processRowUpdate,
                    onProcessRowUpdateError: () => {
                        console.log(456)
                    },
                    experimentalFeatures: { newEditingApi: true },
                }}
            />
        </Box>
    )
}

export default DiskList
