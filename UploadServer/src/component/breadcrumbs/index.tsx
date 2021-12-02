import { FC } from "react";
import { Box } from "@mui/system";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface payloadType {
    children?: React.ReactNode;
    allowBack?: boolean;
}

const Breadcurmbs = ({ children, allowBack = true }: payloadType) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: 1,
                borderBottom: `1px solid ${theme.color.grey5}`,
            }}
        >
            <ArrowCircleLeftOutlinedIcon
                onClick={() => allowBack && navigate(-1)}
                sx={
                    allowBack
                        ? {
                              color: theme.color.grey20,
                              cursor: "pointer",
                              ": hover": {
                                  color: "white",
                              },
                          }
                        : {
                              color: theme.color.grey5,
                              cursor: "not-allowed",
                          }
                }
            />
            <Breadcrumbs sx={{ padding: 1.5, fontSize: 14 }}>
                {children}
            </Breadcrumbs>
        </Box>
    );
};

export default Breadcurmbs;
