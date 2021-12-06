import { TableCellProps } from '@mui/material'

export interface NoMoreDataType extends TableCellProps {
    cellColSpan: number
}

export interface DefaultTableCellProps extends TableCellProps {
    cellname?: string
    handlesortclick?: (cellname: string) => void
}
