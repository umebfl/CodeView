import { InputProps } from '@mui/material'

export interface payloadType {
    inputProps?: InputProps
    right?: React.ReactNode
    handleChange: (text: string) => void
}
