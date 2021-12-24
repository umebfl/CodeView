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
    option: Record<string, optionType>
}

export type optionType = optionNodeType | optionSubNodeType

export interface optionNodeType {
    label: string
    type: 'parent' | 'children'
}

export interface optionSubNodeType extends optionNodeType {
    defaultValue: boolean
    value: boolean
    dataType: optionDataType
}
