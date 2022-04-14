import React, { useEffect, useState } from 'react'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import FolderIcon from '@material-ui/icons/Folder'
import _ from 'lodash'
import moment from 'moment'
import { Button } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

import ExplorerStyles from './style'
import Breadcrumbs from './breadcrumbs'

const getModifiedTime = timestamp =>
    moment(timestamp).format('YYYY-MM-DD HH:mm:ss')

const Explorer = props => {
    const classes = ExplorerStyles()
    const { handleFileClick, handleFileInfoBtnClick, loadData } = props

    const [data, setData] = useState({})
    const [currentPath, setCurrentPath] = useState('')
    const [loading, setLoading] = useState(false)

    const currentData = data[currentPath]
    const dirRows = currentData?.children || []
    const fileRows = currentData?.file || []
    const rows = [...dirRows, ...fileRows]

    let filterStartTime = null
    let filterEndTime = null

    const breadcrumbsVal = _.split(currentPath, '/').reduce(
        ({ path, val }, item) => {
            const itemPath = path === '' ? item : `${path}/${item}`
            return {
                path: itemPath,
                val: [
                    ...val,
                    {
                        name: item,
                        path: itemPath,
                    },
                ],
            }
        },
        { path: '', val: [] }
    ).val

    const handleFolderClick = async index => {
        try {
            setLoading(true)
            let node = currentData.children[index]
            const path = `${currentPath}/${node.name}`
            let fullData = node

            if (node.load === false) {
                fullData = await loadData(path)
            }

            setData({
                ...data,
                [path]: fullData,
            })
            setCurrentPath(path)

            setTimeout(() => {
                setLoading(false)
            }, 500)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const handleBreadcumbsClick = path => {
        setCurrentPath(path)
    }

    const columns = [
        {
            Header: 'File',
            accessor: 'name',
            width: 400,
            Cell: props => (
                <div className={classes.colFile}>
                    {props.original.type === 'folder' ? (
                        <FolderIcon className={classes.colFileicon} />
                    ) : (
                        <InsertDriveFileOutlinedIcon
                            className={classes.colFileicon}
                        />
                    )}

                    <Tooltip title={props.original.name}>
                        <div
                            className={classes.colFileName}
                            onClick={e => {
                                props.original.type === 'folder'
                                    ? handleFolderClick(props.index)
                                    : handleFileClick(props.original.name)
                                e.stopPropagation()
                            }}
                        >
                            {props.original.name}
                        </div>
                    </Tooltip>

                    {props.original.type === 'file' && (
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            href="#outlined-buttons"
                            onClick={e => {
                                handleFileInfoBtnClick(props.original.name)
                                e.stopPropagation()
                            }}
                        >
                            Info
                        </Button>
                    )}
                </div>
            ),
        },
        {
            Header: 'Child count',
            accessor: 'childCount',
            filterMethod: (filter, row, column) => {
                return row.childCount == filter.value
            },
            Cell: props => (
                <span>
                    {props.original.type === 'folder'
                        ? props.original.childCount
                        : '-'}
                </span>
            ),
        },
        {
            Header: 'State',
            accessor: 'state',
            filterMethod: (filter, row, column) => {
                return _.includes(row.state, filter.value)
            },
            Cell: props => (
                <span>
                    {props.original.type === 'file'
                        ? props.original.state
                        : '-'}
                </span>
            ),
        },
        {
            Header: 'Type',
            accessor: 'type',
        },
        {
            Header: 'Last Modified',
            accessor: 'lastModifiedTimestamp',
            width: 430,
            Cell: props => (
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    {getModifiedTime(props.original.lastModifiedTimestamp)}
                </div>
            ),
            filterMethod: (filter, row, column) => {
                const { lastModifiedTimestamp } = row
                const startTimestamp = filterStartTime?.getTime()
                const endTimestamp = filterEndTime?.getTime()

                if (filterStartTime) {
                    if (filterEndTime) {
                        return (
                            lastModifiedTimestamp > startTimestamp &&
                            lastModifiedTimestamp < endTimestamp
                        )
                    }
                    return lastModifiedTimestamp > startTimestamp
                }

                if (filterEndTime) {
                    return lastModifiedTimestamp < endTimestamp
                }

                return true
            },
            Filter: props => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => {
                                if (e.target.value) {
                                    filterStartTime = new Date(e.target.value)
                                } else {
                                    filterStartTime = null
                                }
                                props.onChange()
                            }}
                        />
                        －
                        <TextField
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => {
                                if (e.target.value) {
                                    filterEndTime = new Date(e.target.value)
                                } else {
                                    filterEndTime = null
                                }
                                props.onChange()
                            }}
                        />
                    </div>
                )
            },
        },
        {
            // TODO: 过滤大小区间？
            Header: 'Size',
            accessor: 'sizeByte',
            Cell: props => (
                <span>
                    {props.original.type === 'file'
                        ? props.original.sizeByte
                        : '-'}
                </span>
            ),
        },
        {
            id: 'isArchived',
            Header: 'Archived',
            accessor: row => row.isArchived,
            filterMethod: (filter, row, column) => {
                if (filter.value === 'T' && row[filter.id] === true) {
                    return true
                }

                if (filter.value === 'F' && row[filter.id] === false) {
                    return true
                }

                return false
            },
            Cell: props => (
                <span>
                    {props.original.type === 'file'
                        ? props.original.isArchived
                            ? 'T'
                            : 'F'
                        : '-'}
                </span>
            ),
        },
    ]

    const handleLoadData = async () => {
        try {
            setLoading(true)
            const rv = await loadData(currentPath)
            const rootName = rv.fullName

            setData({
                ...data,
                [rootName]: rv,
            })

            setCurrentPath(rootName)

            setTimeout(() => {
                setLoading(false)
            }, 500)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const initData = async () => {
        if (_.isEmpty(data[currentPath])) {
            handleLoadData()
        }
    }

    useEffect(() => {
        initData()
    }, [])

    return (
        <div className={classes.container}>
            <Breadcrumbs
                loading={loading}
                data={breadcrumbsVal}
                handleClick={handleBreadcumbsClick}
                handleReload={handleLoadData}
            />
            {/* <div className={classes.filter}>Filter</div> */}

            <ReactTable
                sortable
                multiSort
                resizable
                filterable
                className={classes.content}
                data={rows}
                columns={columns}
                // FilterComponent={(a, b, c, d) => {
                //     console.log(a)
                //     if (a.column.id === 'lastModifiedTimestamp') {
                //         return <div>456</div>
                //     }

                //     return null
                // }}
                getTrProps={(state, rowInfo, column) => {
                    return {
                        onClick: () => {
                            if (rowInfo.row.type === 'folder') {
                                handleFolderClick(rowInfo.index)
                            }
                        },
                    }
                }}
            />
        </div>
    )
}

export default Explorer
