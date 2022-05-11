import Box from '@mui/system/Box'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import 广发交易提示 from 'src/视图/流程/1品种筛选/数据/广发交易提示'
import { match, map, dropLast } from 'ramda'

interface type_品种 {
    代码: string
    名称: string
    保证金比例: number
    杠杆: number
}

const 获取全部品种 = () => {
    const 数据字符串 = match(/.*[a-zA-Z]{1,2} ?[:：] ?\d\d%/g)(广发交易提示)

    const 数据: type_品种[] = map((item: string) => {
        const rateStr = match(/\d{1,2}%/)(item)
        const 保证金比例 = parseInt(dropLast(1)(rateStr[0]))

        const code = match(/[a-zA-Z]{1,2}/)(item)[0]
        const upCode = code.toUpperCase()
        const 名称 = item.substr(0, item.indexOf(code)).trim()

        return {
            代码: upCode,
            名称,
            保证金比例,
            杠杆: parseFloat((1 / (保证金比例 / 100)).toFixed(2)),
        }
    })(数据字符串)

    return 数据
}

const 品种筛选 = () => {
    const [expanded1, setExpanded1] = useState(false)
    const [expanded2, setExpanded2] = useState(false)
    const [expanded3, setExpanded3] = useState(false)

    const 全部品种: type_品种[] = 获取全部品种()

    return (
        <Box
            sx={{
                paddingLeft: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    height: 35,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontWeight: 'bold',
                }}
            >
                品种筛选
            </Box>
            <Accordion
                disableGutters
                expanded={expanded1}
                onChange={() => setExpanded1(!expanded1)}
                sx={{
                    '&.MuiPaper-elevation': {
                        background: 'none',
                        borderRadius: 0,
                        color: 'white',
                        borderBottom: '1px solid rgb(52, 52, 52)',
                    },
                    '& .MuiAccordionSummary-root': {
                        fontSize: 13,
                        minHeight: 35,
                        '&:hover': {
                            background: 'rgb(52, 52, 52)',
                        },
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color={'info'} />}
                >
                    全部品种 - {全部品种.length}
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: 0,
                        height: 400,
                        overflow: 'auto',
                    }}
                >
                    {map((品种: type_品种) => {
                        return (
                            <Box
                                key={品种.代码}
                                sx={{
                                    padding: 1,
                                    border: '1px solid rgb(52, 52, 52)',
                                    margin: 1,
                                }}
                            >
                                {品种.代码}
                                {品种.名称}
                            </Box>
                        )
                    })(全部品种)}
                </AccordionDetails>
            </Accordion>

            <Accordion
                disableGutters
                expanded={expanded2}
                onChange={() => setExpanded2(!expanded2)}
                sx={{
                    '&.MuiPaper-elevation': {
                        background: 'none',
                        borderRadius: 0,
                        color: 'white',
                        borderBottom: '1px solid rgb(52, 52, 52)',
                    },
                    '& .MuiAccordionSummary-root': {
                        fontSize: 13,
                        minHeight: 35,
                        '&:hover': {
                            background: 'rgb(52, 52, 52)',
                        },
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color={'info'} />}
                >
                    主体方向判定
                </AccordionSummary>
                <AccordionDetails>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                </AccordionDetails>
            </Accordion>

            <Accordion
                disableGutters
                expanded={expanded3}
                onChange={() => setExpanded3(!expanded3)}
                sx={{
                    '&.MuiPaper-elevation': {
                        background: 'none',
                        borderRadius: 0,
                        color: 'white',
                        borderBottom: '1px solid rgb(52, 52, 52)',
                    },
                    '& .MuiAccordionSummary-root': {
                        fontSize: 13,
                        minHeight: 35,
                        '&:hover': {
                            background: 'rgb(52, 52, 52)',
                        },
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color={'info'} />}
                >
                    交易开平仓
                </AccordionSummary>
                <AccordionDetails>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default 品种筛选
