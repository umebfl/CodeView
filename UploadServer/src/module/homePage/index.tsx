import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Header from "./header";
import Content from "./content";
import Menu from "./menu";
import StatusBar from "./statusBar";

import { info } from "src/util/loger/index";

const HomePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    info("HomePage render");

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/up");
        }
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                background: theme.color.grey2,
            }}
        >
            <Header></Header>
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    overflow: "hidden",
                }}
            >
                <Menu></Menu>

                <Content>
                    <Outlet />
                </Content>
            </Box>
            <StatusBar></StatusBar>
        </Box>
    );
};

export default HomePage;
