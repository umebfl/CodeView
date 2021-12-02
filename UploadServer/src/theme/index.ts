import Default from "src/theme/default";

declare module "@mui/material/styles" {
    interface Theme {
        borderLine: {
            light: string;
            lightSolid: string;
        };
        color: {
            grey2: string;
            grey5: string;
            grey8: string;
            grey15: string;
            grey20: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        borderLine?: {
            light?: string;
            lightSolid?: string;
        };
        color?: {
            grey2?: string;
            grey5?: string;
            grey8?: string;
            grey15?: string;
            grey20?: string;
        };
    }
}

export default Default;
