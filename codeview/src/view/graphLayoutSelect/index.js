import * as R from 'ramda'

import './index.css'

const GraphLayoutSelect = ({ data, type, dispatch }) => {
    const handleSelect = key => {
        dispatch({
            type: 'graphLayout/setData',
            payload: key,
        })
    }

    return (
        <div className="graphLayoutSelect-container">
            <div>Layout:</div>
            <div className="graphLayoutSelect-content">
                {R.map(item => (
                    <div
                        key={item.key}
                        className={`
                            graphLayoutSelect-item
                           ${
                               data === item.key
                                   ? 'graphLayoutSelect-selected'
                                   : ''
                           }
                        `}
                        onClick={() => handleSelect(item.key)}
                    >
                        {item.key}
                    </div>
                ))(type)}
            </div>
        </div>
    )
}

export default GraphLayoutSelect
