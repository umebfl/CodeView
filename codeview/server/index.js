const R = require('ramda')
const express = require('express')
const fs = require('fs')
const app = express()

const proPath = '../../'
// const proPath = '../../proSrc'

app.get('/pro', function (req, res) {
    const readDir = fs.readdirSync(proPath);
    res.json({
        code: 'ok',
        data: readDir,
    })
})

const getSource = (path, proName) => {
    const fileList = fs.readdirSync(path);

    return fileList.map(item => {
        const filePath = `${path}/${item}`
        const stat = fs.statSync(filePath)

        const repath = filePath.substring(`${proPath}/${proName}/`.length)
        const repathNoSuffix = R.compose(
            item => {
                if(item === 'src/index') {
                    return item
                }

                const index = item.lastIndexOf('/index')
                if(index > 0) {
                    return item.substring(0, item.lastIndexOf('/index'))
                }

                return item
            },
            // test
            // item => {

            //     if(R.startsWith('src/')) {
            //         return item.substr('src/'.length)
            //     }

            //     return item
            // },
            item => {
                const suffIndex = item.indexOf('.')

                if(suffIndex > 0) {
                    return item.substring(0, suffIndex)
                }

                return item
            },
        )(repath)

        if(stat.isFile()) {
            const source = fs.readFileSync(filePath).toString()
            return {
                name: item,
                path: repath,
                stat,
                source,
                pathNoSuffix: repathNoSuffix,
            }
        }

        return {
            name: item,
            path: repath,
            stat,
            list: getSource(filePath, proName),
            pathNoSuffix: repathNoSuffix,
        }
    })
}

app.get('/source/:name', function (req, res) {

    const root = `${proPath}/${req.params.name}/src`
    const list = getSource(root, req.params.name)

    res.json({
        code: 'ok',
        data: {
            name: 'root',
            path: '/',
            list,
        },
    })
})
  
app.listen(9000)
