import { AlertColor } from '@mui/material/Alert'

export interface snackbarPropsType {
    timeStamp: number
    severity: AlertColor
    msg: string
}

export interface snackbarType {
    data: Record<number, snackbarPropsType>
}
