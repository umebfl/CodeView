import { useSelector } from 'react-redux'
import { RootState } from 'src/reducer/type'

import { sprintf } from 'sprintf-js'

import langPackage from 'src/hooks/language/package'

import { langSet } from 'src/reducer/language/type'
import { langType } from 'src/hooks/language/package/type'

export const useT = () => {
    const { lang } = useSelector((state: RootState) => state.language)

    const data = {
        [langSet.en]: langPackage.en,
        [langSet.zh]: langPackage.zh,
    }

    return (text: keyof langType, ...props: any[]) =>
        sprintf(data[lang][text], props) || text
}
