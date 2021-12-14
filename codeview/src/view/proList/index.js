import * as R from 'ramda'
import { useEffect, useState } from 'react'
import * as babylon from '@babel/parser'

import { viewInterceptor } from 'src/util/interceptor'

const defaultOptions = {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    startLine: 1,
    tokens: true,
    plugins: [
        'estree',
        ['decorators', { decoratorsBeforeExport: true }],
        'asyncGenerators',
        'bigInt',
        'classProperties',
        'classPrivateProperties',
        'classPrivateMethods',
        'legacy-decorators',
        'doExpressions',
        'dynamicImport',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'functionBind',
        'functionSent',
        'importMeta',
        'logicalAssignment',
        'nullishCoalescingOperator',
        'numericSeparator',
        'objectRestSpread',
        'optionalCatchBinding',
        'optionalChaining',
        ['pipelineOperator', { proposal: 'minimal' }],
        'throwExpressions',
        'typescript',
        'jsx',
    ],
}

// 项目列表
const ProList = ({ dispatch }) => {
    const [dir, setDir] = useState([])

    useEffect(() => {
        // 读取本地项目
        fetch('/pro')
            .then(function (response) {
                return response.json()
            })
            .then(function (rv) {
                setDir(rv.data)
            })
    }, [])

    const handleClick = item => {
        fetch(`/source/${item}`)
            .then(function (response) {
                return response.json()
            })
            .then(function (rv) {
                if (rv.code === 'ok') {
                    const isTest = R.test(/.spec.tsx?/)
                    const isUtil = R.test(/^src\/util\//)

                    const checkNoNeedUnitTest = parse => {
                        if (parse.comments) {
                            const flag = R.find(
                                item => item.value === '* No need unit test '
                            )(parse.comments)

                            if (flag) {
                                return true
                            }
                        }

                        return false
                    }

                    const build = item => {
                        // 过滤测试文件
                        if (isTest(item.name)) {
                            return null
                        }

                        if (item.list) {
                            // 单元测试检测
                            const testMap = R.reduce((rv, item) => {
                                if (isTest(item.name)) {
                                    return {
                                        ...rv,
                                        [R.replace(
                                            '.spec.',
                                            '.'
                                        )(item.name)]: true,
                                    }
                                }
                                return rv
                            }, {})(item.list)

                            const fixList = R.map(item => ({
                                ...item,
                                unitTest: testMap[item.name] || false,
                            }))(item.list)

                            return {
                                ...item,
                                list: R.compose(R.map(build))(fixList),
                            }
                        }

                        if (
                            R.anyPass([
                                R.endsWith('.js'),
                                R.endsWith('.jsx'),
                                R.endsWith('.ts'),
                                R.endsWith('.tsx'),
                            ])(item.name)
                        ) {
                            const parse = babylon.parse(
                                item.source,
                                defaultOptions
                            )

                            return {
                                ...item,
                                parse,
                                noNeedUnitTest: checkNoNeedUnitTest(parse),
                                fileType: isUtil(item.path) ? 'util' : 'normal',
                            }
                        }

                        return null
                    }

                    const parse = build(rv.data)
                    dispatch({ type: 'source/setFileMap', payload: parse })
                }
            })
    }

    return (
        <div>
            {R.map(item => (
                <div key={item} onClick={() => handleClick(item)}>
                    {item}
                </div>
            ))(dir)}
        </div>
    )
}

export default viewInterceptor(ProList)
