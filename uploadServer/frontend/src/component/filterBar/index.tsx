import React, { useState, useRef } from 'react'
import { trim } from 'ramda'
import { Box } from '@mui/system'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useTheme } from '@mui/material/styles'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import { useDebounceFn } from 'ahooks'

import { payloadType } from 'src/component/filterBar/type'

const FilterBar = ({ value, right, handleChange, inputProps }: payloadType) => {
    const theme = useTheme()
    const [searchText, setSearchText] = useState(value || '')
    const inputRef = useRef(null)

    const { run } = useDebounceFn(
        (text: string) => {
            handleChange(text)
        },
        {
            wait: 500,
        }
    )

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1.5,
                borderBottom: theme.borderLine.lightSolid,
            }}
        >
            <Input
                autoComplete={'true'}
                size={'small'}
                // ref={inputRef}
                inputProps={{
                    maxLength: 25,
                    style: { paddingBottom: 0 },
                    ref: inputRef,
                }}
                value={searchText}
                onChange={(e: any) => {
                    const text = trim(e.target.value)
                    setSearchText(text)
                    run(text)
                }}
                // onFocus={() => {
                //     // inputRef?.current?.select()
                // }}
                sx={{
                    width: 300,
                    background: theme.color.grey5,
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 0.5,
                    paddingBottom: 0.5,
                    fontSize: 14,
                    ':before': { borderBottom: 0 },
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchOutlinedIcon fontSize={'small'} />
                    </InputAdornment>
                }
                {...inputProps}
            />

            {right}
        </Box>
    )
}

export default FilterBar
