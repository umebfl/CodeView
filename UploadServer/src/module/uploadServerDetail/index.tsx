import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

import { useParams } from "react-router-dom";

import { info } from "src/util/loger/index";
import Breadcrumbs from "src/component/breadcrumbs";

const UploadServerDetail = () => {
    info("UploadServerDetail render");
    const { id } = useParams();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}
        >
            <Breadcrumbs>
                <Box>Upload Server</Box>
                <Typography color="text.primary" fontSize={14}>
                    {id}
                </Typography>
            </Breadcrumbs>
            <Box sx={{ display: "flex", flex: 1 }}></Box>
        </Box>
    );
};

export default UploadServerDetail;
