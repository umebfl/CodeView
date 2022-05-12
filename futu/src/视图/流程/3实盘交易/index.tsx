import Box from '@mui/system/Box'

const 实盘交易 = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                flex: 1,
                height: '100%',
                borderRight: '1px solid rgb(52, 52, 52)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: 35,
                    paddingLeft: 1,
                    paddingRight: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgb(52, 52, 52)',
                }}
            >
                {/* 实盘交易 */}
                Firm offer
            </Box>
        </Box>
    )
}

export default 实盘交易
