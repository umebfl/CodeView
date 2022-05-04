import { InputProps } from '@mui/material/Input/Input'

export interface payloadType {
    value?: string
    inputProps?: InputProps
    right?: React.ReactNode
    handleChange: (text: string) => void
}
