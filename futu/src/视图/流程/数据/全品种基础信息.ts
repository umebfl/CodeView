export type type_品种基础信息 = Record<
    string,
    {
        一手手数: number
        名称: string
        行业: string
        上市日期: number
        手动过滤: boolean
        持仓合约?: string
        持仓手数?: number
        持仓方向?: '多' | '空'
        持仓均价?: number
    }
>

const data: type_品种基础信息 = {
    A: {
        一手手数: 10,
        名称: '豆一',
        行业: '农产品',
        上市日期: 2003,
        手动过滤: true,
        持仓合约: '2301',
    },
    AG: {
        一手手数: 15,
        名称: '白银',
        行业: '贵金属',
        上市日期: 2012,
        手动过滤: true,
        持仓合约: '2212',
    },
    AL: {
        一手手数: 5,
        名称: '铝',
        行业: '有色金属',
        上市日期: 1995,
        手动过滤: false,
    },
    AP: {
        一手手数: 10,
        名称: '苹果',
        行业: '农产品',
        上市日期: 2017,
        手动过滤: false,
        持仓合约: '2301',
        持仓手数: 2,
        持仓方向: '多',
        持仓均价: 9485,
    },
    AU: {
        一手手数: 1000,
        名称: '黄金',
        行业: '贵金属',
        上市日期: 2015,
        手动过滤: false,
    },
    B: {
        一手手数: 10,
        名称: '豆二',
        行业: '谷物油脂',
        上市日期: 2017,
        手动过滤: false,
    },
    BC: {
        一手手数: 5,
        名称: '国际铜',
        行业: '有色金属',
        上市日期: 2020,
        手动过滤: false,
    },
    BU: {
        一手手数: 10,
        名称: '石油沥青',
        行业: '石化',
        上市日期: 2013,
        手动过滤: false,
        持仓合约: '2301',
        持仓手数: 2,
        持仓方向: '多',
        持仓均价: 4204,
    },
    C: {
        一手手数: 10,
        名称: '玉米',
        行业: '谷物',
        上市日期: 2004,
        手动过滤: false,
    },
    CF: {
        一手手数: 5,
        名称: '棉花',
        行业: '软商品',
        上市日期: 2004,
        手动过滤: true,
    },
    CJ: {
        一手手数: 5,
        名称: '红枣',
        行业: '农副',
        上市日期: 2019,
        手动过滤: false,
    },
    CS: {
        一手手数: 10,
        名称: '玉米淀粉',
        行业: '谷物',
        上市日期: 2014,
        手动过滤: false,
    },
    CU: {
        一手手数: 5,
        名称: '铜',
        行业: '有色金属',
        上市日期: 1995,
        手动过滤: false,
    },
    CY: {
        一手手数: 5,
        名称: '棉纱',
        行业: '软商品',
        上市日期: 2017,
        手动过滤: false,
    },
    EB: {
        一手手数: 5,
        名称: '苯乙烯',
        行业: '石化',
        上市日期: 2019,
        手动过滤: false,
    },
    EG: {
        一手手数: 10,
        名称: '乙二醇',
        行业: '石化',
        上市日期: 2018,
        手动过滤: true,
    },
    FB: {
        一手手数: 10,
        名称: '纤维板',
        行业: '轻工',
        上市日期: 2020,
        手动过滤: false,
    },
    FG: {
        一手手数: 20,
        名称: '玻璃',
        行业: '轻工',
        上市日期: 2012,
        手动过滤: true,
    },
    FU: {
        一手手数: 10,
        名称: '燃料油',
        行业: '石化',
        上市日期: 2018,
        手动过滤: false,
        持仓合约: '2301',
        持仓手数: 2,
        持仓方向: '多',
        持仓均价: 3980,
    },
    HC: {
        一手手数: 10,
        名称: '热轧卷板',
        行业: '黑色金属',
        上市日期: 2014,
        手动过滤: true,
    },
    I: {
        一手手数: 100,
        名称: '铁矿石',
        行业: '黑色金属',
        上市日期: 2013,
        手动过滤: false,
    },
    IC: {
        一手手数: 200,
        名称: '中证500',
        行业: '股指期货',
        上市日期: 2015,
        手动过滤: false,
    },
    IF: {
        一手手数: 300,
        名称: '股指沪深300',
        行业: '股指期货',
        上市日期: 2010,
        手动过滤: false,
    },
    IH: {
        一手手数: 300,
        名称: '上证50',
        行业: '股指期货',
        上市日期: 2015,
        手动过滤: false,
    },
    J: {
        一手手数: 100,
        名称: '焦炭',
        行业: '煤炭',
        上市日期: 2011,
        手动过滤: false,
    },
    JM: {
        一手手数: 60,
        名称: '焦煤',
        行业: '煤炭',
        上市日期: 2013,
        手动过滤: false,
    },
    JR: {
        一手手数: 20,
        名称: '粳稻',
        行业: '谷物',
        上市日期: 2014,
        手动过滤: false,
    },
    L: {
        一手手数: 5,
        名称: '聚乙烯',
        行业: '石化',
        上市日期: 2007,
        手动过滤: false,
    },
    LH: {
        一手手数: 16,
        名称: '生猪',
        行业: '农副',
        上市日期: 2021,
        手动过滤: false,
    },
    LR: {
        一手手数: 20,
        名称: '晚籼稻',
        行业: '谷物',
        上市日期: 2016,
        手动过滤: false,
    },
    LU: {
        一手手数: 10,
        名称: '低硫燃料油',
        行业: '石化',
        上市日期: 2020,
        手动过滤: false,
    },
    M: {
        一手手数: 10,
        名称: '豆粕',
        行业: '油脂',
        上市日期: 2000,
        手动过滤: false,
    },
    MA: {
        一手手数: 10,
        名称: '甲醇',
        行业: '石化',
        上市日期: 2011,
        手动过滤: true,
    },
    NI: {
        一手手数: 1,
        名称: '镍',
        行业: '有色金属',
        上市日期: 2015,
        手动过滤: false,
    },
    NR: {
        一手手数: 10,
        名称: '20号胶',
        行业: '石化',
        上市日期: 2019,
        手动过滤: false,
    },
    OI: {
        一手手数: 10,
        名称: '菜籽油',
        行业: '油脂',
        上市日期: 2007,
        手动过滤: false,
    },
    P: {
        一手手数: 10,
        名称: '棕榈油',
        行业: '油脂',
        上市日期: 2007,
        手动过滤: false,
    },
    PB: {
        一手手数: 5,
        名称: '铅',
        行业: '有色金属',
        上市日期: 2011,
        手动过滤: false,
    },
    PF: {
        一手手数: 5,
        名称: '短纤',
        行业: '石化',
        上市日期: 2020,
        手动过滤: false,
    },
    PG: {
        一手手数: 20,
        名称: '液化石油气',
        行业: '石化',
        上市日期: 2020,
        手动过滤: false,
    },
    PK: {
        一手手数: 5,
        名称: '花生',
        行业: '油脂',
        上市日期: 2021,
        手动过滤: false,
    },
    PM: {
        一手手数: 10,
        名称: '普麦',
        行业: '谷物',
        上市日期: 2020,
        手动过滤: false,
    },
    PP: {
        一手手数: 5,
        名称: '聚丙烯',
        行业: '石化',
        上市日期: 2014,
        手动过滤: false,
    },
    RB: {
        一手手数: 10,
        名称: '螺纹钢',
        行业: '黑色金属',
        上市日期: 2009,
        手动过滤: false,
        持仓合约: '2301',
        持仓手数: 5,
        持仓方向: '多',
        持仓均价: 5003.2,
    },
    RI: {
        一手手数: 20,
        名称: '早籼稻',
        行业: '谷物',
        上市日期: 2009,
        手动过滤: false,
    },
    RM: {
        一手手数: 10,
        名称: '菜籽粕',
        行业: '油脂',
        上市日期: 2012,
        手动过滤: false,
    },
    RR: {
        一手手数: 10,
        名称: '粳米',
        行业: '谷物',
        上市日期: 2019,
        手动过滤: false,
    },
    RS: {
        一手手数: 10,
        名称: '油菜籽',
        行业: '油脂',
        上市日期: 2012,
        手动过滤: false,
    },
    RU: {
        一手手数: 10,
        名称: '天胶',
        行业: '石化',
        上市日期: 1995,
        手动过滤: false,
    },
    SA: {
        一手手数: 20,
        名称: '纯碱',
        行业: '石化',
        上市日期: 2019,
        手动过滤: false,
    },
    SC: {
        一手手数: 1000,
        名称: '原油',
        行业: '石化',
        上市日期: 2018,
        手动过滤: false,
    },
    SF: {
        一手手数: 5,
        名称: '硅铁',
        行业: '黑色金属',
        上市日期: 2014,
        手动过滤: false,
        持仓合约: '2301',
        持仓手数: 3,
        持仓方向: '多',
        持仓均价: 8923,
    },
    SM: {
        一手手数: 5,
        名称: '锰硅',
        行业: '黑色金属',
        上市日期: 2014,
        手动过滤: true,
        持仓合约: '2301',
    },
    SN: {
        一手手数: 1,
        名称: '锡',
        行业: '有色金属',
        上市日期: 2015,
        手动过滤: false,
    },
    SP: {
        一手手数: 10,
        名称: '漂针浆',
        行业: '轻工',
        上市日期: 2018,
        手动过滤: false,
    },
    SR: {
        一手手数: 10,
        名称: '白糖',
        行业: '软商品',
        上市日期: 2006,
        手动过滤: false,
    },
    SS: {
        一手手数: 5,
        名称: '不锈钢',
        行业: '黑色金属',
        上市日期: 2019,
        手动过滤: false,
    },
    TA: {
        一手手数: 5,
        名称: '精对苯二甲酸',
        行业: '石化',
        上市日期: 2007,
        手动过滤: false,
        持仓合约: '2301',
        持仓手数: 4,
        持仓方向: '多',
        持仓均价: 6252,
    },
    UR: {
        一手手数: 20,
        名称: '尿素',
        行业: '石化',
        上市日期: 2019,
        手动过滤: false,
    },
    V: {
        一手手数: 5,
        名称: '聚氯乙烯',
        行业: '石化',
        上市日期: 2009,
        手动过滤: true,
    },
    WH: {
        一手手数: 20,
        名称: '强麦',
        行业: '谷物',
        上市日期: 2003,
        手动过滤: false,
    },
    WR: {
        一手手数: 10,
        名称: '线材',
        行业: '黑色金属',
        上市日期: 2019,
        手动过滤: false,
    },
    Y: {
        一手手数: 10,
        名称: '豆油',
        行业: '农产品',
        上市日期: 2006,
        手动过滤: false,
        持仓合约: '2301',
        持仓手数: 2,
        持仓方向: '多',
        持仓均价: 11052,
    },
    ZC: {
        一手手数: 100,
        名称: '动力煤',
        行业: '煤炭',
        上市日期: 2013,
        手动过滤: false,
    },
    ZN: {
        一手手数: 5,
        名称: '锌',
        行业: '有色金属',
        上市日期: 2007,
        手动过滤: false,
    },
}

export default data
