import { TableCellProps, TableBodyProps } from '@mui/material'

export interface NoMoreDataType extends TableCellProps {
    cellColSpan: number
}

export interface DefaultTableCellProps extends TableCellProps {
    cellname?: string
    handlesortclick?: (cellname: string) => void
}

export interface DefaultTableBodyProps extends TableBodyProps {
    children: React.ReactNode | React.ReactNode[]
}
