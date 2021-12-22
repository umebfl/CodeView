import { useSelector } from 'react-redux'
import { RootState } from 'src/reducer/type'

import { sprintf } from 'sprintf-js'

import en from 'src/reducer/language/package/en'
import zh from 'src/reducer/language/package/zh-cn'
import { langSet } from 'src/reducer/language/type'
import { langType } from 'src/reducer/language/package/type'

export const useT = () => {
    const { lang } = useSelector((state: RootState) => state.language)

    const data = {
        [langSet.en]: en,
        [langSet.zh]: zh,
    }

    return (text: keyof langType, ...props: any[]) =>
        sprintf(data[lang][text], props) || text
}
