export type type_无法交易品种 = Record<
    string,
    {
        Code: string
        name: string
    }
>

const data: type_无法交易品种 = {
    BC: {
        Code: 'BC',
        name: '国际铜',
    },
    IC: {
        Code: 'IC',
        name: '中证500',
    },
    IH: {
        Code: 'IH',
        name: '上证50',
    },
    IF: {
        Code: 'IF',
        name: '股指沪深300',
    },
    SC: {
        Code: 'SC',
        name: '原油',
    },
    I: {
        Code: 'I',
        name: '铁矿石',
    },
}

export default data
