import { AlertColor } from '@mui/material/Alert'

export interface sourcePropsType {
    timeStamp: number
    severity: AlertColor
    msg: string
}

export interface sourceType {
    data: Record<number, sourcePropsType>
}
