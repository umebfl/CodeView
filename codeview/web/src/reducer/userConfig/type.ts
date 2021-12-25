export const enum optionDataType {
    select,
    checkbox,
    singleCheckbox,
    radio,
    switch,
    input,
    rating,
}

export interface userConfigType {
    grid: {
        layout: ReactGridLayout.Layout[]
        lock: boolean
    }
    option: optionType
}

export const enum optionKeyType {
    'root',
    'root/gird',
    'root/gird/lock',
    'root/code',
    'root/code/path',
    'root/code/matchSuffix',
    'root/code/unitTest',
    'root/code/unitTest/show',
    'root/code/unitTest/mapping',
}

export type optionType = {
    root: optionNodeType
    'root/gird': optionNodeType
    'root/gird/lock': optionSubNodeType
    'root/code': optionNodeType
    'root/code/path': optionSubNodeType
    'root/code/matchSuffix': optionSubNodeType
    'root/code/unitTest': optionNodeType
    'root/code/unitTest/show': optionSubNodeType
    'root/code/unitTest/mapping': optionSubNodeType
}

export type optionValType = optionNodeType | optionSubNodeType

export interface optionNodeType {
    label: string
    type: 'parent' | 'children'
}

export interface optionSubNodeType extends optionNodeType {
    dataType: optionDataType
    defaultValue: boolean | string | number
    value: boolean | string | number
}
