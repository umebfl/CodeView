import { replace } from 'ramda'

const JS文件格式 = `const 数据 = ''

export default 数据
`

const 下载零级数据 = (文件名: string, 数据: object) => {
    const A标签 = document.createElement('a')
    A标签.download = `${文件名}.js`

    const 字节码 = new Blob(
        [replace(`''`, JSON.stringify(数据, null, 2))(JS文件格式)],
        { type: '' }
    )

    A标签.href = window.URL.createObjectURL(字节码)
    A标签.target = '_blank'
    A标签.click()
}

export default 下载零级数据
