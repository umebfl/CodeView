import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";

const Header = () => {
    const theme = useTheme();

    return (
        <AppBar
            position="static"
            sx={{
                justifyContent: "center",
                borderBottom: theme.borderLine.lightSolid,
                background: theme.color.grey2,
                height: 48,
            }}
        >
            <Box
                sx={{
                    width: 100,
                    marginLeft: 2,
                    height: "auto",
                    userSelect: "none",
                }}
                component="img"
                src="/asset/logo.png"
            ></Box>
        </AppBar>
    );
};

export default Header;
