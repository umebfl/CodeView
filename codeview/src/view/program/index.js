import * as R from "ramda";

import "./index.css";

const Program = ({ data }) => {
    const node = R.compose(
        R.addIndex(R.map)((item, index) => (
            <div key={index}>[变量]{item.declarations[0].id.name}</div>
        )),
        R.filter((item) => item.type === "VariableDeclaration")
    )(data);

    return <div className="program-container">{node}</div>;
};

export default Program;
