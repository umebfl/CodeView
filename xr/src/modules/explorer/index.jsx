import React, { useEffect, useState } from 'react'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import FolderIcon from '@material-ui/icons/Folder'
import _ from 'lodash'
import moment from 'moment'
import { Button } from '@material-ui/core'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import ExplorerStyles from './style'
import Breadcrumbs from './Breadcrumbs'

const getModifiedTime = timestamp =>
    moment(timestamp).format('YYYY-MM-DD HH:mm:ss')

const Explorer = props => {
    const classes = ExplorerStyles()
    const { loadData } = props

    const [data, setData] = useState({})
    const [currentPath, setCurrentPath] = useState('')
    const [loading, setLoading] = useState(false)

    const currentData = data[currentPath]
    const dirRows = currentData?.children || []
    const fileRows = currentData?.file || []
    const rows = [...dirRows, ...fileRows]

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

    console.log('data', data, currentPath, rows)
    const handleFileClick = path => {
        alert(path)
    }

    const handleFileInfoBtnClick = path => {
        alert(path)
    }

    const handleFolderClick = async index => {
        setLoading(true)
        let node = currentData.children[index]
        const path = `${currentPath}/${node.name}`
        let fullData = node

        console.log('node', node)
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
    }

    const handleBreadcumbsClick = path => {
        setCurrentPath(path)
    }

    const handleBreadcumbsReload = async () => {
        setLoading(true)
        const rv = await loadData(currentPath)

        setData({
            ...data,
            [currentPath]: rv,
        })

        setTimeout(() => {
            setLoading(false)
        }, 500)
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
            Cell: props => (
                <span>
                    {getModifiedTime(props.original.lastModifiedTimestamp)}
                </span>
            ),
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

    const initData = async () => {
        if (_.isEmpty(data[currentPath])) {
            const rv = await loadData(currentPath)
            const rootName = rv.name

            setData({
                [rootName]: rv,
            })
            setCurrentPath(rootName)
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
                handleReload={handleBreadcumbsReload}
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
