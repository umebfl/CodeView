const source = (req: any, res: any) => {
    res.json({
        code: 'ok',
        data: {
            name: 'root',
            path: '/',
        },
    })
}

export default (app: any) => {
    app.get('/source/:path', source)
}
