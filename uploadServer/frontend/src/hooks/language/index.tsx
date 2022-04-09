import { useSelector } from 'react-redux'
import { RootState } from 'src/reducer/type'

import { sprintf } from 'sprintf-js'

import langPackage from 'src/hooks/language/package'

import { langSet } from 'src/reducer/language/type'
import { langType } from 'src/hooks/language/package/type'

export type TProps = (text: keyof langType, ...props: any[]) => string

export const tranText = (lang: langSet) => {
    const langData = {
        [langSet.en]: langPackage.en,
        [langSet.zh]: langPackage.zh,
    }

    return (text: keyof langType, ...props: any[]) =>
        sprintf(langData[lang][text], props) || text
}

export const useT = (): TProps => {
    const { lang } = useSelector((state: RootState) => state.language)
    return tranText(lang)
}
