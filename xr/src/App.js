import _ from 'lodash'
import Explorer from './modules/explorer'

function App() {
    const fetchData = async path => {
        // {
        //     name: 'playback',
        //     fullName: 'playback',
        //     type: 'folder',
        //     lastModifiedTimestamp: 1648020504,
        //     childCount: 1,
        //     children: [
        //         {
        //             name: '12',
        //             fullName: 'playback/12',
        //             childCount: 7,
        //             lastModifiedTimestamp: 1648020504,
        //             type: 'folder',
        //             children: [
        //                 {
        //                     name: 'www',
        //                     fullName: 'playback/12/ww',
        //                     type: 'folder',
        //                     lastModifiedTimestamp: 2648020504,
        //                     childCount: 1,
        //                     children: [
        //                         {
        //                             name: 't3',
        //                             fullName: 'playback/12/ww/t3',
        //                             childCount: 0,
        //                             lastModifiedTimestamp: 1648020504,
        //                             type: 'folder',
        //                             children: [],
        //                             file: [
        //                                 {
        //                                     id: '3',
        //                                     isArchived: true,
        //                                     lastModifiedTimestamp: 1648020504,
        //                                     location: 'LOCAL',
        //                                     name: 'xxx',
        //                                     path: '/applo/xx',
        //                                     sizeByte: 1,
        //                                     state: 'AVAILABEL',
        //                                     type: 'file',
        //                                 },
        //                             ],
        //                         },
        //                     ],
        //                     file: [
        //                         {
        //                             id: '2',
        //                             isArchived: true,
        //                             lastModifiedTimestamp: 1648020504,
        //                             location: 'LOCAL',
        //                             name: 'xxx',
        //                             path: '/applo/xx',
        //                             sizeByte: 1,
        //                             state: 'AVAILABEL',
        //                             type: 'file',
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //     ],
        //     file: [
        //         {
        //             id: '1',
        //             isArchived: true,
        //             lastModifiedTimestamp: 1948020504,
        //             location: 'LOCAL',
        //             name: 'xxx',
        //             path: '/applo/xx',
        //             sizeByte: 1,
        //             state: 'AVAILABEL',
        //             type: 'file',
        //         },
        //         {
        //             id: '12',
        //             isArchived: true,
        //             lastModifiedTimestamp: 1948020504,
        //             location: 'LOCAL',
        //             name: 'xxx',
        //             path: '/applo/xx',
        //             sizeByte: 1,
        //             state: 'AVAILABEL',
        //             type: 'file',
        //         },
        //         {
        //             id: '13',
        //             isArchived: true,
        //             lastModifiedTimestamp: 1948020504,
        //             location: 'LOCAL',
        //             name: 'xxx',
        //             path: '/applo/xx',
        //             sizeByte: 1,
        //             state: 'AVAILABEL',
        //             type: 'file',
        //         },
        //         {
        //             id: '14',
        //             isArchived: true,
        //             lastModifiedTimestamp: 1948020504,
        //             location: 'LOCAL',
        //             name: 'xxx',
        //             path: '/applo/xx',
        //             sizeByte: 1,
        //             state: 'AVAILABEL',
        //             type: 'file',
        //         },
        //         {
        //             id: '15',
        //             isArchived: true,
        //             lastModifiedTimestamp: 1948020504,
        //             location: 'LOCAL',
        //             name: 'xxx',
        //             path: '/applo/xx',
        //             sizeByte: 1,
        //             state: 'AVAILABEL',
        //             type: 'file',
        //         },
        //         {
        //             id: '16',
        //             isArchived: true,
        //             lastModifiedTimestamp: 1948020504,
        //             location: 'LOCAL',
        //             name: 'xxx',
        //             path: '/applo/xx',
        //             sizeByte: 1,
        //             state: 'AVAILABEL',
        //             type: 'file',
        //         },
        //         {
        //             id: '17',
        //             isArchived: true,
        //             lastModifiedTimestamp: 1948020504,
        //             location: 'LOCAL',
        //             name: 'xxx',
        //             path: '/applo/xx',
        //             sizeByte: 1,
        //             state: 'AVAILABEL',
        //             type: 'file',
        //         },
        //     ],
        // }

        console.log('fetch', path)
        const oriData = {
            root: {
                dir: [
                    {
                        childCount: 2,
                        lastModifiedTimestamp: 1649909284894,
                        name: 'root/1',
                    },
                    {
                        childCount: 1,
                        lastModifiedTimestamp: 1749909284894,
                        name: 'root/2',
                    },
                ],
                failedReason: '',
                file: [
                    {
                        id: 'playback/byd-cn-1_2022-03-10-11-03_all_1646881422-1646881452.xray',
                        isArchived: false,
                        lastModifiedTimestamp: 1648020504,
                        location: 'LOCAL',
                        name: 'byd-cn-1_2022-03-10-11-03_all_1646881422-1646881452.xray.play',
                        path: '/apollo/playback/byd-cn-1_2022-03-10-11-03_all_1646881422-1646881452.xray',
                        sizeByte: '6969331',
                        state: 'AVAILABLE',
                    },
                ],
                ok: true,
                prefix: 'root',
            },
            '': {
                dir: [
                    {
                        childCount: 2,
                        lastModifiedTimestamp: 1649909284894,
                        name: 'root/1',
                    },
                    {
                        childCount: 1,
                        lastModifiedTimestamp: 1749909284894,
                        name: 'root/2',
                    },
                ],
                failedReason: '',
                file: [
                    {
                        id: 'playback/byd-cn-1_2022-03-10-11-03_all_1646881422-1646881452.xray',
                        isArchived: false,
                        lastModifiedTimestamp: 1649509284894,
                        location: 'LOCAL',
                        name: 'byd-cn-1_2022-03-10-11-03_all_1646881422-1646881452.xray.play',
                        path: '/apollo/playback/byd-cn-1_2022-03-10-11-03_all_1646881422-1646881452.xray',
                        sizeByte: '6969331',
                        state: 'AVAILABLE',
                    },
                ],
                ok: true,
                prefix: 'root',
            },
            'root/1': {
                dir: [
                    {
                        childCount: 1,
                        lastModifiedTimestamp: 1647650345,
                        name: 'root/1/a',
                    },
                    {
                        childCount: 1,
                        lastModifiedTimestamp: 1647650345,
                        name: 'root/1/b',
                    },
                ],
                failedReason: '',
                file: [
                    {
                        id: 'playback/byd-cn-1_2022-03-10-11-03_all_1646881422-164688141121152.xray',
                        isArchived: false,
                        lastModifiedTimestamp: 1648020504,
                        location: 'LOCAL',
                        name: 'byd-cn-1_2022-03-10-11-03_all_1646881422-164688145112.xray.play',
                        path: '/apollo/playback/byd-cn-1_2022-03-10-11-03_all_1646881422-16468814512.xray',
                        sizeByte: '6969331',
                        state: 'AVAILABLE',
                    },
                ],
                ok: true,
                prefix: 'root/1',
            },
            'root/2': {
                dir: [],
                failedReason: '',
                file: [
                    {
                        id: 'playback/byd-cn-1_2022-03-10-11-03_all_1646881422-164688141152.xray',
                        isArchived: false,
                        lastModifiedTimestamp: 1648020504,
                        location: 'LOCAL',
                        name: 'byd-cn-1_2022-03-10-11-03_all_1646881422-164688145112.xray.play',
                        path: '/apollo/playback/byd-cn-1_2022-03-10-11-03_all_1646881422-16468814512.xray',
                        sizeByte: '6969331',
                        state: 'AVAILABLE',
                    },
                ],
                ok: true,
                prefix: 'root/2',
            },
            'root/1/a': {
                dir: [],
                failedReason: '',
                file: [
                    {
                        id: 'playback/byd-cn-1_2022-03-10-11-03_all_1646881422-164688141152.xray',
                        isArchived: false,
                        lastModifiedTimestamp:
                            1648020504 + Math.random() * 1000 * 1000,
                        location: 'LOCAL',
                        name: 'byd-cn-1_2022-03-10-11-03_all_1646881422-164688145112.xray.play',
                        path: '/apollo/playback/byd-cn-1_2022-03-10-11-03_all_1646881422-16468814512.xray',
                        sizeByte: '6969331',
                        state: 'AVAILABLE',
                    },
                ],
                ok: true,
                prefix: 'root/1/a',
            },
            'root/1/b': {
                dir: [],
                failedReason: '',
                file: [
                    {
                        id: 'playback/byd-cn-1_2022-03-10-11-03_all_1646881422-164688141152.xray',
                        isArchived: false,
                        lastModifiedTimestamp: 1648020504,
                        location: 'LOCAL',
                        name: 'byd-cn-1_2022-03-10-11-03_all_1646881422-164688145112.xray.play',
                        path: '/apollo/playback/byd-cn-1_2022-03-10-11-03_all_1646881422-16468814512.xray',
                        sizeByte: '6969331',
                        state: 'AVAILABLE',
                    },
                ],
                ok: true,
                prefix: 'root/1/b',
            },
        }

        const rv = oriData[path]

        if (rv.ok) {
            const transData = data => {
                return {
                    name: _.last(_.split(data.prefix, '/')),
                    fullName: data.prefix,
                    type: 'folder',
                    childCount: data.dir.length,
                    load: true,
                    children: _.map(data.dir, item => ({
                        name: _.last(_.split(item.name, '/')),
                        fullName: item.name,
                        childCount: item.childCount,
                        lastModifiedTimestamp: item.lastModifiedTimestamp,
                        type: 'folder',
                        children: [],
                        load: false,
                    })),
                    file: _.map(data.file, item => ({
                        id: item.name,
                        isArchived: item.isArchived,
                        lastModifiedTimestamp: item.lastModifiedTimestamp,
                        location: item.location,
                        name: item.name,
                        path: item.path,
                        sizeByte: item.sizeByte,
                        state: item.state,
                        type: 'file',
                    })),
                }
            }

            console.log(transData(rv))
            return transData(rv)
        } else {
            alert(rv.failedReason)
            return null
        }
    }

    return (
        <div
            style={{
                width: '100VW',
                height: '100VH',
                background: '#333',
                overflow: 'hidden',
            }}
        >
            <Explorer
                handleFileClick={path => {
                    alert(path)
                }}
                handleFileInfoBtnClick={path => {
                    alert(path)
                }}
                loadData={async (path = '') => {
                    const data = await fetchData(path)
                    return data
                }}
            />
        </div>
    )
}

export default App
