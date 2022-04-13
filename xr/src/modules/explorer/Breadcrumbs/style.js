import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(theme => ({
    container: {
        padding: 10,
        background: '#0a131a',
        borderRadius: 10,
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    content: {
        flex: 1,
        color: 'white',
    },
    link: {
        cursor: 'pointer',
    },
    last: {
        color: 'rgb(25,118,210)',
    },
    reload: {
        color: 'white',
        cursor: 'pointer',
    },
    back: {
        color: 'white',
        cursor: 'pointer',
        marginRight: 10,
        background: '#333',
        borderRadius: 20,
        // '&:hover': {
        //     background: '#63717c',
        // },
    },
}))

export default Styles
