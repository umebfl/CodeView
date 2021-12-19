/** No need unit test */
import React from 'react'

import {
    TableCell,
    TableCellProps,
    TableRowProps,
    TableFooter,
    TableRow,
    TableBody,
    useTheme,
    Box,
} from '@mui/material'

import { type } from 'ramda'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SearchOffIcon from '@mui/icons-material/SearchOff'

import NoMoreData from 'src/component/noMoreData'
import {
    NoMoreDataType,
    DefaultTableCellProps,
    DefaultTableBodyProps,
} from 'src/component/table/type'

export const DefaultTableCellCell = ({
    children,
    ...props
}: TableCellProps) => {
    const theme = useTheme()

    return (
        <TableCell
            {...props}
            sx={{
                color: theme.color.grey20,
                paddingTop: 1.6,
                paddingBottom: 1.6,
                paddingLeft: 0.5,
                paddingRight: 0.5,
                border: 0,
                ...props.sx,
            }}
        >
            {children}
        </TableCell>
    )
}

export const DefaultTableCellHeaderCell = ({
    children,
    ...props
}: DefaultTableCellProps) => {
    const theme = useTheme()
    return (
        <DefaultTableCellCell
            {...props}
            sx={{
                borderBottom: theme.borderLine.lightSolid,
                fontSize: 13,
                color: theme.color.grey20,
                fontWeight: 'bold',
                ': hover': {
                    '.cellSortDesc': {
                        visibility: 'visible',
                    },
                },
                ...props.sx,
            }}
        >
            {children}
            {props.sortDirection && (
                <Box
                    className="cellSortDesc"
                    onClick={() =>
                        props.handlesortclick &&
                        props.handlesortclick(props.cellname || '')
                    }
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        visibility: 'hidden',
                        cursor: 'pointer',
                    }}
                >
                    {props.sortDirection === 'desc' ? (
                        <ArrowDownwardIcon fontSize="small" />
                    ) : (
                        <ArrowUpwardIcon fontSize="small" />
                    )}
                </Box>
            )}
        </DefaultTableCellCell>
    )
}

export const DefaultTableBody = ({
    children,
    ...props
}: DefaultTableBodyProps) => {
    if (type(children) === 'Array') {
        return (
            <TableBody {...props}>
                {(children as [])?.length > 0 ? children : <EmptyDataRow />}
            </TableBody>
        )
    }

    return <TableBody>{children}</TableBody>
}

export const EmptyDataRow = () => (
    <DefaultTableRow>
        <DefaultTableCellCell align="center" colSpan={9}>
            <EmptyDataMsg />
        </DefaultTableCellCell>
    </DefaultTableRow>
)

export const EmptyDataMsg = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                color: theme.color.grey20,
            }}
        >
            <SearchOffIcon />
            列表数据为空。
        </Box>
    )
}

export const DefaultTableRow = ({ children, ...props }: TableRowProps) => {
    const theme = useTheme()

    return (
        <TableRow
            {...props}
            sx={{
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.color.grey2,
                },
                '&:last-child td, &:last-child th': {
                    border: 0,
                },
                ': hover': {
                    background: theme.color.grey8,
                },
                ...props.sx,
            }}
        >
            {children}
        </TableRow>
    )
}

export const NoMoreDataCell = ({ children, ...props }: NoMoreDataType) => {
    const theme = useTheme()
    return (
        <TableFooter
            sx={{
                backgroundColor: theme.color.grey2,
            }}
        >
            <TableRow>
                <DefaultTableCellHeaderCell
                    colSpan={props.cellColSpan}
                    align="center"
                    sx={{
                        borderTop: theme.borderLine.lightSolid,
                        borderBottom: 0,
                        padding: 0,
                    }}
                >
                    <NoMoreData />
                </DefaultTableCellHeaderCell>
            </TableRow>
        </TableFooter>
    )
}
