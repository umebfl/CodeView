import { makeStyles } from '@material-ui/core/styles'

const ExplorerStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#1d2226',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 10,
    },
    filter: {
        display: 'flex',
        height: 100,
        backgroundColor: '#333',
        padding: 20,
    },
    content: {
        color: 'white',
        // '& .MuiTableCell-root.MuiTableCell-head': {
        //     fontWeight: 'bold',
        //     fontSize: 18,
        // },
        // '& .MuiTableRow-root.MuiTableRow-head': {
        //     '&:hover': {
        //         backgroundColor: 'inherit',
        //         cursor: 'default',
        //     },
        // },
        // '& .MuiTableCell-root': {
        //     color: 'white',
        //     fontSize: 14,
        //     padding: 12,
        //     borderBottom: '.1rem solid #58585898',
        //     fontFamily: 'Lucida Grande, Helvetica, Arial, sans-serif',
        // },
        // '& .MuiTableRow-root': {
        //     cursor: 'pointer',
        //     '&:hover': {
        //         backgroundColor: '#585858',
        //     },
        // },
        '& .rt-tr-group': {
            cursor: 'pointer',
            '& .rt-tr:hover': {
                backgroundColor: '#585858',
            },

            '& .-padRow:hover': {
                backgroundColor: 'inherit',
                userSelect: 'none',
            },
        },
        '& .rt-thead': {
            '& .rt-th input': {
                backgroundColor: '#31363a',
                color: 'white',
            },
        },
        '& .-pagination .-btn': {
            color: 'white',
        },
    },

    colFile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    colFileName: {
        marginRight: 10,
        maxWidth: 260,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        '&:hover': {
            textDecoration: 'underline',
        },
    },

    colFileicon: {
        marginRight: 10,
    },

    head: {},
}))

export default ExplorerStyles
