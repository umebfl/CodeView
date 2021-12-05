import {
    TableCell,
    TableCellProps,
    TableFooter,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material'

import { NoMoreData } from 'src/component/noMoreData'
import { NoMoreDataType } from './type'

export const DefaultTableCellCell = ({
    children,
    ...props
}: TableCellProps) => {
    const theme = useTheme()

    return (
        <TableCell
            sx={{ color: theme.color.grey20, padding: 1.6, border: 0 }}
            {...props}
        >
            {children}
        </TableCell>
    )
}

export const DefaultTableCellHeaderCell = ({
    children,
    ...props
}: TableCellProps) => {
    const theme = useTheme()
    return (
        <TableCell
            sx={{
                borderBottom: theme.borderLine.lightSolid,
                fontSize: 13,
                color: theme.color.grey20,
                fontWeight: 'bold',
                padding: 1.6,
            }}
            {...props}
        >
            {children}
        </TableCell>
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
                    }}
                >
                    <NoMoreData />
                </DefaultTableCellHeaderCell>
            </TableRow>
        </TableFooter>
    )
}
