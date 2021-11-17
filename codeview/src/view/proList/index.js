import * as R from 'ramda'
import { useEffect, useState, useContext } from 'react'
import * as babylon from '@babel/parser'

import { info } from 'src/util/loger'
import { Context } from 'src/reducer'

const defaultOptions = {
    sourceType: "module",
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    startLine: 1,
    tokens: true,
    plugins: [
        "estree",
        ["decorators", { decoratorsBeforeExport: true }],
        "asyncGenerators",
        "bigInt",
        "classProperties",
        "classPrivateProperties",
        "classPrivateMethods",
        "legacy-decorators",
        "doExpressions",
        "dynamicImport",
        "exportDefaultFrom",
        "exportNamespaceFrom",
        "functionBind",
        "functionSent",
        "importMeta",
        "logicalAssignment",
        "nullishCoalescingOperator",
        "numericSeparator",
        "objectRestSpread",
        "optionalCatchBinding",
        "optionalChaining",
        ["pipelineOperator", { proposal: "minimal" }],
        "throwExpressions",
        "typescript",
        "jsx"
    ]
}

// 项目列表
const ProList = () => {
    info('ProList | render');

    const { dispatch } = useContext(Context)

    const [dir, setDir] = useState([])

    useEffect(() => {
        info('ProList | useEffect');

        // 读取本地项目
        fetch('/pro')
            .then(function(response) {
                return response.json();
            })
            .then(function(rv) {
                setDir(rv.data)
            });
    }, [])

    const handleClick = (item) => {
        fetch(`/source/${item}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(rv) {
                if(rv.code === 'ok') {

                    const build = (item) => {
                        if(item.list) {
                            return {
                                ...item,
                                list: R.map(build)(item.list),
                            }
                        }

                        if(R.anyPass([
                            R.endsWith('.js'), 
                            R.endsWith('.jsx'),
                            R.endsWith('.ts'), 
                            R.endsWith('.tsx'),
                        ])(item.name)) {
                            return {
                                ...item,
                                parse: babylon.parse(item.source, defaultOptions),
                            }
                        }

                        return null
                    }

                    const parse = build(rv.data)
                    dispatch({type: 'source/setFileMap', payload: parse})
                }
            });
    }

    return (
        <div>
            {
                R.map(
                    item => <div key={item} onClick={() => handleClick(item)}>{item}</div>
                )(dir)
            }
        </div>
    )
}

export default ProList;