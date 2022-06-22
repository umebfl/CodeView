import { FC, useState } from 'react'
import Box from '@mui/system/Box'
import CachedIcon from '@mui/icons-material/Cached'
import Snackbar from '@mui/material/Snackbar'

import { type_品种 } from 'src/视图/流程'
import { map } from 'ramda'
import { 转换为万元单位 } from 'src/视图/流程/2辅助决策'

const 实盘交易: FC<{
    交易品种: type_品种[]
    全品种初始持仓总额度: number
    全品种一补持仓总额度: number
    全品种二补持仓总额度: number
    handle加载持仓品种详情数据: (list: type_品种[]) => void
    持仓盈亏合计: number
}> = ({
    交易品种,
    全品种初始持仓总额度,
    全品种一补持仓总额度,
    全品种二补持仓总额度,
    handle加载持仓品种详情数据,
    持仓盈亏合计,
}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 1200,
                height: '100%',
                borderRight: '1px solid rgb(52, 52, 52)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
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
                <CachedIcon
                    sx={{
                        cursor: 'pointer',
                        color: 'rgb(99, 99, 99)',
                        '&:hover': {
                            color: 'white',
                        },
                    }}
                    onClick={async () => {
                        await handle加载持仓品种详情数据(交易品种)
                        setOpenSnackbar(true)
                    }}
                />
            </Box>

            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        borderBottom: '1px solid rgb(52, 52, 52)',
                        padding: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ width: 50 }}>Code</Box>
                    <Box sx={{ width: 70 }}>行业</Box>
                    <Box sx={{ width: 50 }}>杠杆</Box>
                    <Box sx={{ width: 70 }}>连续价</Box>
                    <Box sx={{ width: 70 }}>持约价</Box>
                    <Box sx={{ width: 70 }}>保证金</Box>
                    <Box sx={{ width: 120 }}>
                        初可持数(
                        {Math.round(
                            parseFloat(转换为万元单位(全品种初始持仓总额度))
                        )}
                        )
                    </Box>
                    <Box sx={{ width: 120 }}>
                        一补可持数(
                        {Math.round(
                            parseFloat(转换为万元单位(全品种一补持仓总额度))
                        )}
                        )
                    </Box>
                    <Box sx={{ width: 120 }}>
                        二补可持数(
                        {Math.round(
                            parseFloat(转换为万元单位(全品种二补持仓总额度))
                        )}
                        )
                    </Box>
                    <Box sx={{ width: 150 }}>一补亏/价</Box>
                    <Box sx={{ width: 150 }}>二补亏/价</Box>
                    <Box sx={{ width: 70 }}>持仓合约</Box>
                    <Box sx={{ width: 70 }}>方向</Box>
                    <Box sx={{ width: 70 }}>持仓手数</Box>
                    <Box sx={{ width: 70 }}>持仓均价</Box>
                    <Box sx={{ width: 70 }}>
                        盈亏({转换为万元单位(持仓盈亏合计)})
                    </Box>
                </Box>
                {map((品种: type_品种) => {
                    return (
                        <Box
                            key={品种.代码}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderBottom: '1px solid rgb(52, 52, 52)',
                                padding: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    background: 'rgb(52, 52, 52)',
                                },
                            }}
                        >
                            <Box sx={{ width: 50 }}>{品种.代码}</Box>
                            <Box sx={{ width: 70 }}>{品种.行业}</Box>
                            <Box sx={{ width: 50 }}>{品种.杠杆}</Box>
                            <Box sx={{ width: 70 }}>
                                {parseInt(品种.一日数据.c as unknown as string)}
                            </Box>
                            <Box sx={{ width: 70 }}>
                                {parseInt(
                                    品种.持仓合约一日数据
                                        ?.c as unknown as string
                                )}
                            </Box>
                            <Box sx={{ width: 70 }}>
                                {品种.持仓合约一手保证金?.toFixed(0)}
                            </Box>
                            <Box sx={{ width: 120 }}>
                                {`${品种.初始持仓手数} / ${转换为万元单位(
                                    品种.初始可持仓额度
                                )}w`}
                                ({转换为万元单位(品种.初始持仓真实额度)})
                            </Box>
                            <Box sx={{ width: 120 }}>
                                {`${品种.一补持仓手数} / ${转换为万元单位(
                                    品种.一补可持仓真实额度
                                )}w`}
                            </Box>
                            <Box sx={{ width: 120 }}>
                                {`${品种.二补持仓手数} / ${转换为万元单位(
                                    品种.二补可持仓真实额度
                                )}w`}
                            </Box>
                            <Box
                                sx={{ width: 150 }}
                            >{`${品种.一亏补价格?.toFixed(0)}/${
                                品种.一亏补当前亏损
                                    ? (品种.一亏补当前亏损 / 10000)?.toFixed(1)
                                    : '-'
                            }w/${品种.一亏补后均价?.toFixed(0)}`}</Box>
                            <Box
                                sx={{ width: 150 }}
                            >{`${品种.二亏补价格?.toFixed(0)}/${
                                品种.二亏补当前亏损
                                    ? (品种.二亏补当前亏损 / 10000)?.toFixed(1)
                                    : '-'
                            }w/${品种.二亏补后均价?.toFixed(0)}`}</Box>
                            <Box sx={{ width: 70 }}>{品种.持仓合约}</Box>
                            <Box sx={{ width: 70 }}>{品种.持仓方向}</Box>
                            <Box
                                sx={{
                                    width: 70,
                                    color:
                                        (品种.持仓手数 || 0) >=
                                        品种.二补持仓手数
                                            ? '#a91717'
                                            : (品种.持仓手数 || 0) >=
                                              品种.一补持仓手数
                                            ? 'yellow'
                                            : (品种.持仓手数 || 0) >=
                                              品种.初始持仓手数
                                            ? '#7b7bad'
                                            : 'green',
                                }}
                            >
                                {品种.持仓手数}
                            </Box>
                            <Box sx={{ width: 70 }}>{品种.持仓均价}</Box>
                            <Box sx={{ width: 70 }}>
                                {品种.持仓盈利
                                    ? 转换为万元单位(品种.持仓盈利)
                                    : ''}
                            </Box>
                        </Box>
                    )
                })(交易品种)}
            </Box>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message="加载持仓品种详情数据成功!"
            />
        </Box>
    )
}

export default 实盘交易
