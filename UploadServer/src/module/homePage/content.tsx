import React, { FC } from "react";

import Box from "@mui/material/Box";

const Content: FC = ({ children }) => (
    <Box
        sx={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
        }}
    >
        {children}
    </Box>
);

export default Content;
