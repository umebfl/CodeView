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
    sourcePath: string[]
    grid: {
        layout: ReactGridLayout.Layout[]
        lock: boolean
    }
    option: optionType
}

export type optionType = Record<string, {}>

export interface optionNodeType {
    name: string
    defalut: boolean
    currentValue: boolean
}

// export interface optionParentNodeType extends optionNodeType {
//     children?: optionType
// }

// export interface optionSubNodeType extends optionNodeType {
//     type: optionDataType
// }
