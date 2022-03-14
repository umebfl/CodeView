const { createProxyMiddleware } = require('http-proxy-middleware')

// create react app proxy doc: https://create-react-app.dev/docs/proxying-api-requests-in-development/
module.exports = function (app) {
    app.use(
        '/quan_ping_zhong_shu_ju',
        createProxyMiddleware({
            target: 'http://localhost:9000/quan_ping_zhong_shu_ju',
            changeOrigin: true,
            secure: false,
            pathRewrite: { '/quan_ping_zhong_shu_ju': '' },
            onProxyReq: (proxyReq, req, res) => {
                console.log(proxyReq)
            },
        })
    )
    app.use(
        '/quan_ping_zhong_lie_biao',
        createProxyMiddleware({
            target: 'http://localhost:9000/quan_ping_zhong_lie_biao',
            changeOrigin: true,
            secure: false,
            pathRewrite: { '/quan_ping_zhong_lie_biao': '' },
            onProxyReq: (proxyReq, req, res) => {
                console.log(proxyReq)
            },
        })
    )
    app.use(
        '/gen_xin_lian_xu_ri_shu_ju',
        createProxyMiddleware({
            target: 'http://localhost:9000/gen_xin_lian_xu_ri_shu_ju',
            changeOrigin: true,
            secure: false,
            pathRewrite: { '/gen_xin_lian_xu_ri_shu_ju': '' },
            onProxyReq: (proxyReq, req, res) => {
                console.log(proxyReq)
            },
        })
    )

    // app.use(
    //     '/api',
    //     createProxyMiddleware({
    //         target: 'https://www.gfqh.com.cn/article/detail?menuname=%E4%BA%A4%E6%98%93%E6%8F%90%E7%A4%BA&menuid=139&articleid=3098',
    //         changeOrigin: true,
    //         secure: false,
    //     })
    // )

    // app.use(
    //     '/dangrifengshi',
    //     createProxyMiddleware({
    //         target: 'https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getFewMinLine',
    //         changeOrigin: true,
    //         secure: false,
    //         pathRewrite: { '/dangrifengshi': '' },
    //         // onProxyReq: (proxyReq, req, res) => {
    //         //     console.log(proxyReq)
    //         // },
    //     })
    // )

    // app.use(
    //     '/ri',
    //     createProxyMiddleware({
    //         target: 'https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getDailyKLine',
    //         changeOrigin: true,
    //         secure: false,
    //         pathRewrite: { '/ri': '' },
    //         // onProxyReq: (proxyReq, req, res) => {
    //         //     console.log(proxyReq)
    //         // },
    //     })
    // )
}
