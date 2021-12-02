export interface serverType {
    emptySlotsNum: number;
    formattedDisksNum: number;
    isRunning: boolean;
    totalSlotsNum: number;
    uploadServerId: string;
    uploadServerLocation: string;
}

export interface stateType {
    uploadServer: {
        data: Array<serverType>;
    };
}

export const initState: stateType = {
    uploadServer: {
        data: [],
    },
};

const reducer = {
    "uploadServer/setData": (
        state: { uploadServer: stateType },
        payload: typeof initState.uploadServer.data
    ) => {
        return {
            ...state,
            uploadServer: {
                ...state.uploadServer,
                data: payload,
            },
        };
    },
};

const UploadServer = {
    initState,
    reducer,
};

export default UploadServer;
