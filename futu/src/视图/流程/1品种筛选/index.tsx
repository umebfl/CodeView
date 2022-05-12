import { FC, useState } from 'react'
import Box from '@mui/system/Box'
import { map, take } from 'ramda'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CachedIcon from '@mui/icons-material/Cached'
import Snackbar from '@mui/material/Snackbar'

import { type_品种 } from 'src/视图/流程'

const 品种方块: FC<{ 品种: type_品种; 可交易: boolean }> = ({
    品种,
    可交易,
    children,
}) => {
    return (
        <Box
            key={品种.代码}
            sx={{
                display: 'flex',
                width: '100%',
                padding: 1,
                border: '1px solid rgb(52, 52, 52)',
                margin: 0.5,
                justifyContent: 'space-between',
                background: 可交易 ? 'inherit' : 'rgba(63, 28, 28, 0.7)',
                '&:hover': {
                    background: 'rgb(52, 52, 52)',
                },
            }}
        >
            <Box sx={{ width: 30 }}>{品种.代码}</Box>
            <Box sx={{ width: 60, overflow: 'hidden' }}>
                {take(4)(品种.名称)}
            </Box>
            {children}
        </Box>
    )
}

const CustomAccordion: FC<{
    expanded: boolean
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>
    title: string
}> = payload => {
    const { expanded, setExpanded, title, children } = payload

    return (
        <Accordion
            disableGutters
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{
                marginLeft: 2,
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
            <AccordionSummary expandIcon={<ExpandMoreIcon color={'info'} />}>
                {title}
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 0,
                    maxHeight: 600,
                    overflow: 'auto',
                }}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

const 品种筛选: FC<{
    全部品种: type_品种[]
    可交易品种: type_品种[]
    不可交易品种: type_品种[]
    未手动过滤品种: type_品种[]
    手动过滤品种: type_品种[]
    杠杆正常品种: type_品种[]
    杠杆过低品种: type_品种[]
    沉淀资金正常品种: type_品种[]
    沉淀资金过低品种: type_品种[]
    保证金正常品种: type_品种[]
    保证金过高品种: type_品种[]
    老品种列表: type_品种[]
    新品种列表: type_品种[]
    全历史波幅正常列表: type_品种[]
    全历史波幅过低列表: type_品种[]
    年限5历史波幅正常列表: type_品种[]
    年限5历史波幅过低列表: type_品种[]
    group行业列表: type_品种[]
    handle加载品种详情数据: () => void
}> = ({
    全部品种,
    可交易品种,
    不可交易品种,
    未手动过滤品种,
    手动过滤品种,
    杠杆正常品种,
    杠杆过低品种,
    沉淀资金正常品种,
    沉淀资金过低品种,
    保证金正常品种,
    保证金过高品种,
    老品种列表,
    新品种列表,
    全历史波幅正常列表,
    全历史波幅过低列表,
    年限5历史波幅正常列表,
    年限5历史波幅过低列表,
    group行业列表,
    handle加载品种详情数据,
}) => {
    const [expanded1, setExpanded1] = useState(false)
    const [expanded2, setExpanded2] = useState(false)
    const [expanded3, setExpanded3] = useState(false)
    const [expanded4, setExpanded4] = useState(false)
    const [expanded5, setExpanded5] = useState(false)
    const [expanded6, setExpanded6] = useState(false)
    const [expanded7, setExpanded7] = useState(false)
    const [expanded8, setExpanded8] = useState(false)
    const [expanded9, setExpanded9] = useState(true)
    const [expanded10, setExpanded10] = useState(false)

    const [openSnackbar, setOpenSnackbar] = useState(false)

    return (
        <Box
            sx={{
                width: 300,
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
                品种筛选
                <CachedIcon
                    sx={{
                        cursor: 'pointer',
                        color: 'rgb(99, 99, 99)',
                        '&:hover': {
                            color: 'white',
                        },
                    }}
                    onClick={async () => {
                        await handle加载品种详情数据()
                        setOpenSnackbar(true)
                    }}
                />
            </Box>

            <CustomAccordion
                expanded={expanded1}
                setExpanded={setExpanded1}
                title={`全部品种 - ${全部品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true} />
                ))(全部品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded2}
                setExpanded={setExpanded2}
                title={`可交易品种 - ${可交易品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true} />
                ))(可交易品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false} />
                ))(不可交易品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded10}
                setExpanded={setExpanded10}
                title={`未手动过滤品种 - ${未手动过滤品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true} />
                ))(未手动过滤品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false} />
                ))(手动过滤品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded3}
                setExpanded={setExpanded3}
                title={`杠杆正常品种 - ${杠杆正常品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 50 }}>{品种.杠杆}</Box>
                    </品种方块>
                ))(杠杆正常品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 50 }}>{品种.杠杆}</Box>
                    </品种方块>
                ))(杠杆过低品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded4}
                setExpanded={setExpanded4}
                title={`沉淀资金正常品种 - ${沉淀资金正常品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 50 }}>
                            {品种.沉淀资金.toFixed(0)}亿
                        </Box>
                    </品种方块>
                ))(沉淀资金正常品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 50 }}>
                            {品种.沉淀资金.toFixed(0)}亿
                        </Box>
                    </品种方块>
                ))(沉淀资金过低品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded5}
                setExpanded={setExpanded5}
                title={`保证金正常品种 - ${保证金正常品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>
                            {(品种.一手保证金 / 10000).toFixed(2)}
                        </Box>
                    </品种方块>
                ))(保证金正常品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 60 }}>
                            {(品种.一手保证金 / 10000).toFixed(2)}
                        </Box>
                    </品种方块>
                ))(保证金过高品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded6}
                setExpanded={setExpanded6}
                title={`老品种 - ${老品种列表.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                    </品种方块>
                ))(老品种列表)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                    </品种方块>
                ))(新品种列表)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded7}
                setExpanded={setExpanded7}
                title={`全历史波幅正常列表 - ${全历史波幅正常列表.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {品种.全历史波幅.toFixed(2)}
                        </Box>
                    </品种方块>
                ))(全历史波幅正常列表)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {品种.全历史波幅.toFixed(2)}
                        </Box>
                    </品种方块>
                ))(全历史波幅过低列表)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded8}
                setExpanded={setExpanded8}
                title={`年限5历史波幅正常列表 - ${年限5历史波幅正常列表.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {品种.年限5历史波幅.toFixed(2)}
                        </Box>
                    </品种方块>
                ))(年限5历史波幅正常列表)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {品种.年限5历史波幅.toFixed(2)}
                        </Box>
                    </品种方块>
                ))(年限5历史波幅过低列表)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded9}
                setExpanded={setExpanded9}
                title={`行业 - ${group行业列表.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {(品种.一手保证金 / 10000).toFixed(2)}
                        </Box>
                        <Box sx={{ width: 40 }}>
                            {品种.沉淀资金.toFixed(0)}亿
                        </Box>
                        {/* <Box sx={{ width: 50 }}>{品种.杠杆}</Box> */}
                    </品种方块>
                ))(group行业列表)}
            </CustomAccordion>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message="加载品种详情数据成功!"
            />
        </Box>
    )
}

export default 品种筛选
