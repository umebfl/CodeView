const R = require('ramda')
const fs = require('fs')

const getSource = (path: string, rootPath: string) => {
    const fileList = fs.readdirSync(path)

    return fileList.map((item: string) => {
        const filePath = `${path}/${item}`
        const stat = fs.statSync(filePath)

        const repath = filePath.replace(rootPath, '')
        const repathNoSuffix = R.compose(
            (item: string) => {
                if (item === 'src/index') {
                    return item
                }

                if (R.endsWith('/index')(item)) {
                    const index = item.lastIndexOf('/index')
                    if (index > 0) {
                        return item.substring(0, item.lastIndexOf('/index'))
                    }
                }

                return item
            },
            (item: string) => {
                const suffIndex = item.indexOf('.')

                if (suffIndex > 0) {
                    return item.substring(0, suffIndex)
                }

                return item
            }
        )(repath)

        const shortName = R.compose(
            (num: number) => R.drop(num + 1)(repathNoSuffix),
            R.lastIndexOf('/')
        )(repathNoSuffix)

        if (stat.isFile()) {
            const source = fs.readFileSync(filePath).toString()
            return {
                name: item,
                path: repath,
                stat,
                source,
                pathNoSuffix: repathNoSuffix,
                filePath,
                shortName,
                type: 'file',
            }
        }

        return {
            name: item,
            path: repath,
            stat,
            list: getSource(filePath, rootPath),
            pathNoSuffix: repathNoSuffix,
            filePath,
            shortName,
            type: 'dir',
        }
    })
}

const source = (req: any, res: any) => {
    console.log('/source', req.body)
    const path = req.body.path
    const rootPath = R.replace('src', '')(path)
    console.log(rootPath)

    try {
        const list = getSource(path, rootPath)

        res.json({
            code: 'ok',
            data: {
                name: 'root',
                path: '/',
                type: 'dir',
                list,
            },
        })
    } catch (error) {
        res.json({
            code: 'error',
            msg: '读取文件失败!',
        })
    }
}

export default (app: any) => {
    app.post('/source', source)
}
