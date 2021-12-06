import { createTheme, ThemeOptions } from '@mui/material/styles'

import { Grey } from 'src/theme/color'

const DefaultTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        // primary: {
        //     main: '#378bcf',
        // },
        background: {
            default: Grey.R2,
            paper: Grey.R2,
        },
    },
    borderLine: {
        light: Grey.R5,
        lightSolid: `1px solid ${Grey.R5}`,
    },
    color: {
        grey2: Grey.R2,
        grey5: Grey.R5,
        grey15: Grey.R15,
        grey8: Grey.R8,
        grey20: Grey.R20,
    },
})

export default DefaultTheme
