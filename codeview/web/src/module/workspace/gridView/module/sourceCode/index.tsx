import { FC } from 'react'
import GridPaper from 'src/module/workspace/gridView/component/gridPaper'

import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from 'src/reducer/type'
import Box from '@mui/system/Box'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const InfoList = ({ title, val }: { title: string; val: string }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Box sx={{ marginRight: 1 }}>{title}:</Box>
            <Box>{val}</Box>
        </Box>
    )
}

const SourceCode: FC = ({ children, ...prpos }) => {
    const {
        focusSource: { data },
    } = useSelector((state: RootState) => state.source)

    return (
        <GridPaper {...prpos} sx={{ padding: 1 }}>
            <InfoList title={'路径'} val={data?.pathNoSuffix || '-'} />
            <InfoList title={'行数'} val={data?.parse.loc.end.line || '-'} />

            <Box
                sx={{
                    display: 'flex',
                    width: '98%',
                    height: '90%',
                    overflowY: 'auto',
                }}
            >
                {data && (
                    <SyntaxHighlighter
                        language="javascript"
                        style={a11yDark}
                        showLineNumbers={true}
                        lineNumberStyle={{ color: 'grey' }}
                        PreTag={({ children }: { children: any }) => (
                            <pre>{children}</pre>
                        )}
                    >
                        {data?.source || ''}
                    </SyntaxHighlighter>
                )}
            </Box>
        </GridPaper>
    )
}

export default SourceCode
