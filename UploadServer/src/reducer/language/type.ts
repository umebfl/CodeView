import { langType } from './package/type'

export enum langSet {
    en = 'EN',
    zh = 'ZH',
}

export interface languagePropsType {
    lang: langSet
}
