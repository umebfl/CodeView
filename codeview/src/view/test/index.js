
import { useMemo } from 'react'

import { info } from 'src/util/loger'

import Test2 from 'src/view/test/index2'

const Test = () => {
    info('Test | render');

    const TestCmp = useMemo(() => <Test2/>, [])

    return <div>Test {TestCmp}</div>
}

export default Test